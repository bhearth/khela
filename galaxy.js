/**
 * 🌌 KNOWLEDGE GALAXY: THE SINGULARITY ENGINE
 * A single-file, zero-dependency Node.js script.
 * Extracts wiki content via Qwen AI, builds a semantic graph with visual weights,
 * and publishes it directly to the wiki.
 * 
 * HOW TO RUN:
 * 1. Install Node.js (v18 or higher) from nodejs.org.
 * 2. Save this file as `galaxy.js`.
 * 3. Open your terminal and run:
 *    QWEN_API_KEY="your-qwen-api-key" node galaxy.js
 */

const CONFIG = {
    wikiUrl: 'https://kids.miraheze.org/w/api.php',
    username: 'Krishnaheda@JS',
    password: 'f6c7br84vnpafsvuep4m7b2d4q6op6qp',
    dataPage: 'Kids:KnowledgeGraphData',
    qwenApiKey: process.env.QWEN_API_KEY || 'sk-ws-H.LMPDLM.b4tI.MEUCIDvHspyy0_aP_DmBExNqd5E3kAx--PpgIZZokc93Hbq-AiEAt9AqGmFfh4XnFlR2kGpg9-ecpPmyZuss2y0DFQqqhlI',
    qwenModel: 'qwen-turbo', // Fast, cheap, and highly accurate
    batchSize: 50 // MediaWiki max titles per request
};

let cookies = '';
let csrfToken = '';

// ═══════════════════════════════════════════════════════════════════════════
// 1. MEDIAWIKI API (Native Fetch, Zero Dependencies)
// ═══════════════════════════════════════════════════════════════════════════
async function wikiRequest(params, method = 'GET') {
    const url = `${CONFIG.wikiUrl}?${new URLSearchParams(params)}&format=json`;
    const options = { method, headers: { 'Cookie': cookies } };
    
    if (method === 'POST') {
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        options.body = new URLSearchParams(params).toString();
    }

    const res = await fetch(url, options);
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) cookies += setCookie.split(',').map(c => c.split(';')[0]).join('; ') + '; ';
    return res.json();
}

async function loginToWiki() {
    console.log('🔐 Logging into MediaWiki...');
    const tokenRes = await wikiRequest({ action: 'query', meta: 'tokens', type: 'login' });
    await wikiRequest({
        action: 'login', lgname: CONFIG.username, lgpassword: CONFIG.password, lgtoken: tokenRes.query.tokens.logintoken
    }, 'POST');
    
    const csrfRes = await wikiRequest({ action: 'query', meta: 'tokens', type: 'csrf' });
    csrfToken = csrfRes.query.tokens.csrftoken;
    console.log('✅ Logged in successfully.');
}

async function getAllPages() {
    console.log('📥 Fetching all wiki pages...');
    let titles = [];
    let apcontinue = '';
    while (true) {
        const params = { action: 'query', list: 'allpages', aplimit: 'max', apfilterredir: 'nonredirects' };
        if (apcontinue) params.apcontinue = apcontinue;
        const res = await wikiRequest(params);
        titles.push(...res.query.allpages.map(p => p.title));
        if (!res.continue) break;
        apcontinue = res.continue.apcontinue;
    }
    return titles;
}

async function fetchPagesInBatches(titles) {
    const batches = [];
    for (let i = 0; i < titles.length; i += CONFIG.batchSize) batches.push(titles.slice(i, i + CONFIG.batchSize));
    
    const allPages = [];
    for (let i = 0; i < batches.length; i++) {
        console.log(`📄 Fetching batch ${i + 1}/${batches.length}...`);
        const res = await wikiRequest({
            action: 'query', titles: batches[i].join('|'),
            prop: 'revisions|categories|links', rvprop: 'content', rvslots: 'main',
            rvlimit: 1, cllimit: 'max', pllimit: 'max'
        });
        
        if (res.query?.pages) {
            for (const page of Object.values(res.query.pages)) {
                if (!page.missing) {
                    allPages.push({
                        title: page.title,
                        content: page.revisions?.[0]?.slots?.main?.['*'] || '',
                        categories: (page.categories || []).map(c => c.title.replace('Category:', '')),
                        links: (page.links || []).map(l => l.title)
                    });
                }
            }
        }
    }
    return allPages;
}

async function publishGraph(graphData) {
    console.log('🚀 Publishing graph to wiki...');
    const res = await wikiRequest({
        action: 'edit', title: CONFIG.dataPage,
        text: JSON.stringify(graphData, null, 2),
        summary: 'Automated Knowledge Galaxy Update (Singularity Engine)',
        token: csrfToken
    }, 'POST');
    if (res.edit?.result === 'Success') console.log('✅ Graph published successfully!');
    else console.error('❌ Publish failed:', res);
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. QWEN AI EXTRACTION (Strict Prompt for Gauge R&R)
// ═══════════════════════════════════════════════════════════════════════════
async function extractWithQwen(title, content) {
    const cleanText = content.replace(/\[\[[^\]]+\]\]/g, '').replace(/={2,}[^=]+={2,}/g, '').replace(/<[^>]+>/g, '').substring(0, 6000);
    
    const prompt = `Analyze the wiki page "${title}". Extract entities and relationships.
Output ONLY valid JSON matching this schema:
{
  "summary": "1-sentence summary",
  "entities": [{ "name": "Entity Name", "type": "Person|Concept|Location|Object|Event" }],
  "relationships": [{ "source": "Entity A", "target": "Entity B", "relation": "INSTANCE_OF|PART_OF|RELATED_TO|CAUSES|LOCATED_IN" }]
}
Content:\n${cleanText}`;

    try {
        const res = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${CONFIG.qwenApiKey}` },
            body: JSON.stringify({
                model: CONFIG.qwenModel,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.1, // Low temperature ensures Repeatability (Gauge R&R)
                response_format: { type: 'json_object' }
            })
        });
        const data = await res.json();
        return JSON.parse(data.choices[0].message.content);
    } catch (e) {
        console.warn(`⚠️ Qwen extraction failed for ${title}:`, e.message);
        return { summary: '', entities: [], relationships: [] };
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. DETERMINISTIC VISUAL MAPPING (Guarantees Reproducibility)
// ═══════════════════════════════════════════════════════════════════════════
function applyVisuals(entity) {
    const typeVisuals = {
        'Person': { icon: '👤', color: '#f59e0b', animation: 'pulse' },
        'Concept': { icon: '💡', color: '#8b5cf6', animation: 'glow' },
        'Location': { icon: '📍', color: '#10b981', animation: 'bounce' },
        'Object': { icon: '📦', color: '#3b82f6', animation: 'spin' },
        'Event': { icon: '🎉', color: '#ef4444', animation: 'flash' },
        'Page': { icon: '📄', color: '#64748b', animation: 'fade' }
    };
    
    const v = typeVisuals[entity.type] || typeVisuals['Concept'];
    
    // Deterministic 5-digit weight based on string hash (Guarantees Reproducibility)
    let hash = 0;
    for (let i = 0; i < entity.name.length; i++) hash = ((hash << 5) - hash) + entity.name.charCodeAt(i);
    hash = Math.abs(hash);
    
    const w1 = hash % 10; const w2 = Math.floor(hash / 10) % 10; 
    const w3 = Math.floor(hash / 100) % 10; const w4 = Math.floor(hash / 1000) % 10; 
    const w5 = Math.floor(hash / 10000) % 10;
    const weight = parseFloat(`0.${w1}${w2}${w3}${w4}${w5}`);
    
    return {
        ...entity,
        icon: v.icon, color: v.color, animation: v.animation,
        weight: weight,
        size: weight > 0.7 ? 'large' : (weight > 0.4 ? 'medium' : 'small')
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════
async function main() {
    console.log('🌌 Starting Knowledge Galaxy Singularity Engine...');
    await loginToWiki();
    
    const titles = await getAllPages();
    console.log(`Found ${titles.length} pages.`);
    
    const pages = await fetchPagesInBatches(titles);
    const nodes = new Map();
    const edges = [];

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        console.log(`🧠 [${i + 1}/${pages.length}] Processing: ${page.title}`);
        
        // 1. AI Extraction
        const aiData = await extractWithQwen(page.title, page.content);
        
        // 2. Add Page Node
        const pageNode = applyVisuals({ name: page.title, type: 'Page', summary: aiData.summary, categories: page.categories });
        nodes.set(page.title, pageNode);
        
        // 3. Add AI Entities
        for (const ent of aiData.entities) {
            const visualEnt = applyVisuals(ent);
            nodes.set(ent.name, visualEnt);
            edges.push({ source: page.title, target: ent.name, type: 'MENTIONS', weight: visualEnt.weight });
        }
        
        // 4. Add AI Relationships
        for (const rel of aiData.relationships) {
            edges.push({ source: rel.source, target: rel.target, type: rel.relation, weight: 0.8 });
        }
        
        // 5. Add Wiki Links
        for (const link of page.links) {
            edges.push({ source: page.title, target: link, type: 'LINKS_TO', weight: 0.5 });
        }
    }

    // 6. Build Final Graph
    const finalGraph = {
        version: '13.0-Singularity',
        generated: new Date().toISOString(),
        nodes: Array.from(nodes.values()),
        edges: edges,
        metadata: { totalPages: pages.length, totalNodes: nodes.size, totalEdges: edges.length }
    };

    await publishGraph(finalGraph);
    console.log('🎉 Singularity Engine complete. The Knowledge Galaxy is updated.');
}

main().catch(err => { console.error('💥 Fatal Error:', err); process.exit(1); });
