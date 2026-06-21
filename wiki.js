/**
 * Khela Wiki Extractor v3.0 - High-Efficiency Link & Content Harvester
 * Optimized for 300+ links, external resources (Amazon/Books), and key messages.
 * Uses O(1) Map lookups for instant deduplication and massive processing speed.
 */
function extractKhelaWikiUltimate(doc) {
    const result = {
        title: "",
        url: doc.URL || "",
        categories: [],
        sections: [],
        link_registry: {
            internal: [], // Wiki-to-Wiki connections (The Graph)
            external: [], // General web links (The Context)
            resources: [] // Amazon, Books, Shopping, Tools (The Commerce/Library)
        },
        quotes: [], // Key messages, blockquotes, simple lines
        stats: {
            total_links: 0,
            word_count: 0,
            internal_count: 0,
            external_count: 0,
            resource_count: 0
        }
    };

    // O(1) Deduplication Maps for massive link processing
    const linkMaps = {
        internal: new Map(),
        external: new Map(),
        resources: new Map()
    };

    // Regex for Resource/Shopping Links (Amazon global, Books, etc.)
    const resourceRegex = /amazon\.(com|in|co\.uk|de|jp|fr|it|es|ca|com\.au|com\.br|com\.mx|ae|sg|sa|pl|nl|se|com\.tr|eg)|amzn\.to|amzn\.com|flipkart|goodreads|bookdepository|barnesandnoble/i;

    const processLink = (a) => {
        const href = a.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) return;

        const url = a.href; // Absolute URL
        const text = a.innerText.trim() || a.getAttribute('title') || url;
        const title = a.getAttribute('title') || "";

        // Categorization & Instant Deduplication
        if (href.includes('/wiki/') && !href.includes(':')) {
            if (!linkMaps.internal.has(url)) {
                linkMaps.internal.set(url, { text, url, title });
                result.stats.internal_count++;
            }
        } else if (resourceRegex.test(href)) {
            if (!linkMaps.resources.has(url)) {
                linkMaps.resources.set(url, { text, url, title, type: 'product/book' });
                result.stats.resource_count++;
            }
        } else if (href.startsWith('http')) {
            if (!linkMaps.external.has(url)) {
                linkMaps.external.set(url, { text, url, title });
                result.stats.external_count++;
            }
        }
        result.stats.total_links++;
    };

    // 1. Get Page Title
    const titleEl = doc.querySelector('#firstHeading') || doc.querySelector('.mw-page-title-main');
    if (titleEl) result.title = titleEl.innerText.replace('[edit]', '').trim();

    // 2. Get Categories
    doc.querySelectorAll('#catlinks a').forEach(a => result.categories.push(a.innerText.trim()));

    // 3. Parse Main Content
    const content = doc.querySelector('#mw-content-text') || doc.querySelector('#bodyContent');
    if (!content) return result;

    // Remove noise to save processing power
    content.querySelectorAll('.mw-editsection, .metadata, .reference, .navbox, .toc, .mw-indicators, .noprint').forEach(el => el.remove());

    // Extract global quotes/key messages first (e.g., Simple Lines, Blockquotes)
    content.querySelectorAll('blockquote, .quotebox, .wikiquotes, .quoteframe, .cquote, q').forEach(q => {
        const text = q.innerText.trim();
        if (text && text.length > 5) {
            result.quotes.push(text);
        }
    });

    let currentSection = { heading: "Introduction", level: 1, paragraphs: [], lists: [], tables: [] };

    // Iterate through direct children for structural integrity
    Array.from(content.children).forEach(el => {
        const tag = el.tagName.toLowerCase();

        if (tag === 'h2' || tag === 'h3') {
            if (currentSection.paragraphs.length > 0 || currentSection.tables.length > 0) {
                result.sections.push(currentSection);
            }
            const headline = el.querySelector('.mw-headline');
            currentSection = {
                heading: headline ? headline.innerText.trim() : el.innerText.trim(),
                level: tag === 'h2' ? 2 : 3,
                paragraphs: [],
                lists: [],
                tables: []
            };
        } 
        else if (tag === 'p') {
            const text = el.innerText.trim();
            if (text) {
                currentSection.paragraphs.push(text);
                result.stats.word_count += text.split(/\s+/).length;
            }
            // Process all links in this paragraph
            el.querySelectorAll('a').forEach(processLink);
        }
        else if (tag === 'ul' || tag === 'ol') {
            const items = [];
            el.querySelectorAll('li').forEach(li => {
                items.push(li.innerText.trim());
                li.querySelectorAll('a').forEach(processLink);
            });
            if (items.length > 0) currentSection.lists.push({ type: tag, items: items });
        }
        else if (tag === 'table' && el.classList.contains('wikitable')) {
            const rows = [];
            el.querySelectorAll('tr').forEach(tr => {
                const cells = [];
                tr.querySelectorAll('th, td').forEach(cell => {
                    cells.push(cell.innerText.trim());
                    cell.querySelectorAll('a').forEach(processLink);
                });
                if (cells.length > 0) rows.push(cells);
            });
            if (rows.length > 0) currentSection.tables.push(rows);
        }
        else if (tag === 'div' || tag === 'section') {
            // Catch-all for nested wiki modules, link lists, or custom templates
            el.querySelectorAll('a').forEach(processLink);
            
            // Check if this div is a quote or key message container
            if (el.classList.contains('quote') || el.classList.contains('simple-lines') || el.getAttribute('typeof') === 'mw:Transclusion/Quote') {
                const text = el.innerText.trim();
                if (text && text.length > 5 && !result.quotes.includes(text)) {
                    result.quotes.push(text);
                }
            }
        }
    });

    // Push final section
    if (currentSection.paragraphs.length > 0 || currentSection.tables.length > 0) {
        result.sections.push(currentSection);
    }

    // Convert Maps to Arrays for final JSON output
    result.link_registry.internal = Array.from(linkMaps.internal.values());
    result.link_registry.external = Array.from(linkMaps.external.values());
    result.link_registry.resources = Array.from(linkMaps.resources.values());

    return result;
}

// --- EXECUTION & DOWNLOAD ---
const data = extractKhelaWikiUltimate(document);
console.log(`✅ Extracted: ${data.stats.total_links} Links (${data.stats.internal_count} Wiki | ${data.stats.resource_count} Resources | ${data.stats.external_count} External)`);
console.log(`✅ Extracted: ${data.quotes.length} Key Quotes/Messages`);

// Download as JSON
const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
const a = document.createElement('a');
a.href = URL.createObjectURL(blob);
a.download = `${data.title.replace(/[^a-z0-9]/gi, '_')}_mesh.json`;
a.click();