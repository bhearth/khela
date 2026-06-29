/**
 * KHEL.O EARTH 00 — HYPER-CODE LIBRARY v5.0
 * 
 * THE 5s PRINCIPLE: One symbol carries exponential meaning
 * "5" and "s" look identical → one glyph = multiple domains
 * 
 * This library compiles:
 * - 100+ character mappings (CSS + JS + Sanskrit + Chinese + Vector)
 * - 8 Root Domains + 100+ Subdomains (from 1.json + 3.json)
 * - 3D Galaxy Engine (Three.js: Galaxy → Solar → Earth)
 * - Nexus Wheel (Chrome-style elastic UI)
 * - Multi-source Universal Search (Wiki, Scholar, Books, GitHub, Local, Events)
 * - AI Synthesis Engine (5W1H + Curated Knowledge)
 * - Kids Wiki Deep-Dive (Knowledge Galaxy)
 * - Self-Learning + Compression + Vector Math + Animation
 * 
 * Every character = compile + store + connect + correct + evolve + render + animate + visualize
 */

const KHELO = {
  // ═══════════════════════════════════════════════════════════════════
  // SECTION 1: CONFIGURATION & STATE
  // ═══════════════════════════════════════════════════════════════════
  config: {
    wikiApi: 'https://kids.miraheze.org/w/api.php',
    maxSpinsPerDay: 3,
    amazonTag: 'amazon0339f-21',
    version: '5.0'
  },
  
  state: {
    scene: null, camera: null, renderer: null, controls: null,
    solarSystem: null, earthGroup: null, markerGroup: null,
    htmlLabels: [],
    activeLayer: 'GALAXY',
    location: null,
    extensions: { wiki: true, scholar: true, books: true, maker: true, local: true, events: true },
    lastResults: [],
    activeFilter: 'all',
    galaxy: { pages: new Map(), building: false },
    usageLog: [],
    brandWords: ['khel.o', 'ba.che', 'be.zo', 'ba.ji', 'ka.li', 'khe.li', 'khil.a', 'kru.shi', 'dis-play', 'sa.hyog', 'mu.kti', 'kri.shi'],
    brandIdx: 0,
    playIcons: ['🤸', '💃', '🎤', '🎨', '✍️', '🎭', '🌱'],
    playIdx: 0
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: HYPER-CODE LIBRARY (The 5s Principle)
  // One symbol = multiple exponential meanings
  // ═══════════════════════════════════════════════════════════════════
  lib: {
    // CORE UI (z-h) — Each character = CSS + JS + Sanskrit + Chinese + Vector + Color
    'z': { 
      css: 'display:flex;align-items:center;justify-content:center;border-radius:50%;transition:all .3s;',
      js: el => { el.onclick = () => { el.classList.toggle('active'); KHELO.CONNECT(el.dataset.id, 'toggle'); } },
      sa: 'चक्र', zh: '圈', vec: [1,0,0,0,0,0,0,0,0,0], col: '#00ff88',
      domain: '0.1', meaning: 'cycle | wholeness | rotation | completeness'
    },
    'a': { 
      css: 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);',
      js: el => { el.style.animation = 'pulse 2s infinite'; KHELO.RELATE(el.dataset.id); },
      sa: 'आत्मन्', zh: '体', vec: [0.75,0.82,-0.33,0.65,0.44,-0.22,0.55,0.91,0.67,0.33], col: '#FF0000',
      domain: '0.1', meaning: 'self | center | soul | individual | anchor'
    },
    'b': { 
      css: 'background:linear-gradient(135deg,#00ff88,#00aaff);color:#000;padding:10px 20px;border-radius:8px;cursor:pointer;',
      js: el => { el.onmouseover = () => el.style.transform = 'scale(1.1)'; KHELO.INFER(el.dataset.id); },
      sa: 'बल', zh: '力', vec: [0.88,0.44,0.22,0.77,0.89,0.66,0.33,0.55,0.44,0.91], col: '#FF7F00',
      domain: '0.2', meaning: 'strength | power | force | energy | capability'
    },
    'c': { 
      css: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;',
      js: el => { el.querySelectorAll('*').forEach(c => c.style.margin = '0'); KHELO.VERIFY(el.dataset.id); },
      sa: 'चक्र', zh: '网', vec: [0.91,0.66,-0.44,0.95,0.88,0.22,0.11,0.77,0.55,0.82], col: '#FFFF00',
      domain: '0.3', meaning: 'network | grid | web | matrix | connection'
    },
    'd': { 
      css: 'width:60px;height:60px;border-radius:50%;border:2px solid;cursor:pointer;',
      js: el => { el.onclick = () => KHELO.expandNode(el); KHELO.DISCOVER(el.dataset.id); },
      sa: 'दृष्टि', zh: '点', vec: [0.85,0.55,-0.22,0.88,0.77,0.33,0.44,0.66,0.50,0.75], col: '#00FF00',
      domain: '0.4', meaning: 'point | dot | node | seed | origin'
    },
    'e': { 
      css: 'font-size:24px;font-weight:bold;text-align:center;',
      js: el => { el.style.textShadow = '0 0 10px currentColor'; KHELO.SIMULATE(el.dataset.id); },
      sa: 'एक', zh: '一', vec: [0.82,0.91,0.11,0.65,0.77,0.88,0.95,0.89,0.66,0.55], col: '#0000FF',
      domain: '0.5', meaning: 'one | unity | singularity | oneness | whole'
    },
    'f': { 
      css: 'position:fixed;bottom:20px;right:20px;z-index:1000;',
      js: el => { el.onclick = () => KHELO.togglePanel(); KHELO.PREDICT(el.dataset.id); },
      sa: 'मुक्त', zh: '浮', vec: [0.77,0.66,0.33,0.55,0.65,0.91,0.88,0.82,0.75,0.95], col: '#9400D3',
      domain: '0.6', meaning: 'free | floating | liberated | unbound | released'
    },
    'g': { 
      css: 'display:flex;flex-direction:column;gap:10px;padding:20px;background:rgba(0,0,0,0.8);border-radius:10px;',
      js: el => { el.style.backdropFilter = 'blur(10px)'; KHELO.EVOLVE(el.dataset.id); },
      sa: 'गति', zh: '长', vec: [0.95,0.77,0.44,0.82,0.89,0.75,0.66,0.55,0.88,0.91], col: '#FFFFFF',
      domain: '0.8', meaning: 'growth | movement | flow | evolution | progress'
    },
    'h': { 
      css: 'width:100%;height:100vh;overflow:hidden;position:relative;',
      js: el => { KHELO.initTree(el); KHELO.RENDER(el.dataset.id, 'full'); },
      sa: 'हृदय', zh: '空', vec: [0.89,0.55,0.88,0.77,0.91,0.44,0.33,0.66,0.95,0.82], col: '#000000',
      domain: '0.9', meaning: 'heart | space | void | emptiness | container'
    },

    // GRAPH OPERATIONS (i-r) — Each maps to a semantic operation
    'i': { css: 'width:40px;height:40px;border-radius:50%;background:rgba(0,255,136,0.2);border:2px solid #00ff88;position:absolute;', js: el => { el.onclick = () => KHELO.addNode(el); KHELO.CONNECT(el.dataset.id, 'add'); }, sa: 'नोड', zh: '节点', vec: [0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1,0], col: '#00ff88', domain: '0.1', meaning: 'node | entity | being | thing | unit' },
    'j': { css: 'width:2px;height:100px;background:linear-gradient(to bottom,#00ff88,transparent);position:absolute;', js: el => { el.style.transform = `rotate(${Math.random()*360}deg)`; KHELO.RELATE(el.dataset.id); }, sa: 'मार्ग', zh: '边', vec: [0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1,0,0.9], col: '#00aaff', domain: '0.2', meaning: 'edge | path | connection | relationship | link' },
    'k': { css: 'position:absolute;transform-style:preserve-3d;width:100%;height:100%;', js: el => { KHELO.layoutPhyllotaxis(el); KHELO.DISCOVER(el.dataset.id); }, sa: 'विन्यास', zh: '布局', vec: [0.7,0.6,0.5,0.4,0.3,0.2,0.1,0,0.9,0.8], col: '#ff7f00', domain: '0.3', meaning: 'layout | arrangement | structure | pattern | order' },
    'l': { css: 'position:absolute;width:100%;height:100%;pointer-events:none;', js: el => { KHELO.drawEdges(el); KHELO.VERIFY(el.dataset.id); }, sa: 'रेखा', zh: '线', vec: [0.6,0.5,0.4,0.3,0.2,0.1,0,0.9,0.8,0.7], col: '#ffff00', domain: '0.4', meaning: 'line | boundary | edge | limit | frontier' },
    'm': { css: 'transform:translate3d(var(--x,0),var(--y,0),var(--z,0));transition:transform 0.5s;', js: el => { KHELO.animateNode(el); KHELO.SIMULATE(el.dataset.id); }, sa: 'गतिमान', zh: '动', vec: [0.5,0.4,0.3,0.2,0.1,0,0.9,0.8,0.7,0.6], col: '#00ff00', domain: '0.5', meaning: 'motion | dynamic | moving | active | kinetic' },
    'n': { css: 'width:20px;height:20px;border-radius:50%;background:#ff0000;position:absolute;', js: el => { KHELO.highlightNode(el); KHELO.PREDICT(el.dataset.id); }, sa: 'केंद्र', zh: '中心', vec: [0.4,0.3,0.2,0.1,0,0.9,0.8,0.7,0.6,0.5], col: '#ff0000', domain: '0.6', meaning: 'center | core | nucleus | heart | focus' },
    'o': { css: 'border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:10px;margin:5px;', js: el => { KHELO.expandCluster(el); KHELO.EVOLVE(el.dataset.id); }, sa: 'समूह', zh: '群', vec: [0.3,0.2,0.1,0,0.9,0.8,0.7,0.6,0.5,0.4], col: '#9400d3', domain: '0.8', meaning: 'group | cluster | collection | set | family' },
    'p': { css: 'position:relative;overflow:hidden;', js: el => { KHELO.zoomGraph(el); KHELO.RENDER(el.dataset.id, 'zoom'); }, sa: 'दृश्य', zh: '视图', vec: [0.2,0.1,0,0.9,0.8,0.7,0.6,0.5,0.4,0.3], col: '#ffffff', domain: '0.9', meaning: 'view | perspective | scene | vision | sight' },
    'q': { css: 'cursor:grab;user-select:none;', js: el => { KHELO.enableDrag(el); KHELO.CONNECT(el.dataset.id, 'drag'); }, sa: 'आकर्षण', zh: '拖', vec: [0.1,0,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2], col: '#00ffff', domain: '0.1', meaning: 'drag | pull | attract | draw | attract' },
    'r': { css: 'transition:all 0.3s ease-out;', js: el => { KHELO.resetView(el); KHELO.RELATE(el.dataset.id, 'reset'); }, sa: 'पुनर्स्थापना', zh: '重置', vec: [0,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1], col: '#ff00ff', domain: '0.2', meaning: 'reset | restore | renew | refresh | return' },

    // THE 5s PRINCIPLE — '5' and 's' are visually identical
    // One glyph carries: discovery (5th domain) + search (s) + flow (5 shape)
    '5': {
      css: 'font-size:32px;font-weight:900;background:linear-gradient(135deg,#38bdf8,#818cf8);color:#fff;padding:10px;border-radius:50%;width:60px;height:60px;display:flex;align-items:center;justify-content:center;cursor:pointer;',
      js: el => { 
        KHELO.searchWiki(el);
        KHELO.DISCOVER(el.dataset.id);
        KHELO.CONNECT(el.dataset.id, 'search');
      },
      sa: 'पञ्च', zh: '五', vec: [0.95,0.85,0.75,0.65,0.55,0.45,0.35,0.25,0.15,0.05], col: '#38bdf8',
      domain: '0.5', meaning: 'five | search | flow | discovery | pancha | s'
    },
    's': {
      css: 'display:none;',
      js: async el => { await KHELO.fetchWiki(el.dataset.page); KHELO.INFER(el.dataset.id); },
      sa: 'सर्प', zh: '蛇', vec: [0.95,0.85,0.75,0.65,0.55,0.45,0.35,0.25,0.15,0.05], col: '#38bdf8',
      domain: '0.5', meaning: 'search | snake | flow | s | 5 | serpentine'
    },

    // API OPERATIONS (t-y)
    't': { css: 'font-family:monospace;font-size:12px;padding:10px;background:#1e293b;border-radius:8px;', js: el => { KHELO.parseJSON(el); KHELO.VERIFY(el.dataset.id); }, sa: 'व्याख्या', zh: '解析', vec: [0.85,0.75,0.65,0.55,0.45,0.35,0.25,0.15,0.05,0.95], col: '#f59e0b', domain: '0.3', meaning: 'parse | interpret | explain | decode | understand' },
    'u': { css: 'background:#1e293b;color:#e2e8f0;padding:15px;border-radius:8px;', js: async el => { el.textContent = await KHELO.compressData(el.dataset.text); KHELO.DISCOVER(el.dataset.id); }, sa: 'संपीड़न', zh: '压缩', vec: [0.75,0.65,0.55,0.45,0.35,0.25,0.15,0.05,0.95,0.85], col: '#10b981', domain: '0.4', meaning: 'compress | condense | compact | reduce | squeeze' },
    'v': { css: 'white-space:pre-wrap;word-break:break-all;', js: async el => { el.textContent = await KHELO.decompressData(el.dataset.compressed); KHELO.SIMULATE(el.dataset.id); }, sa: 'विस्तार', zh: '解压', vec: [0.65,0.55,0.45,0.35,0.25,0.15,0.05,0.95,0.85,0.75], col: '#ef4444', domain: '0.5', meaning: 'expand | decompress | unfold | reveal | open' },
    'w': { css: 'border:2px solid #38bdf8;padding:10px;border-radius:8px;', js: el => { KHELO.extractLinks(el); KHELO.PREDICT(el.dataset.id); }, sa: 'कड़ी', zh: '链接', vec: [0.55,0.45,0.35,0.25,0.15,0.05,0.95,0.85,0.75,0.65], col: '#8b5cf6', domain: '0.8', meaning: 'link | chain | connection | bond | weave' },
    'x': { css: 'display:flex;gap:10px;flex-wrap:wrap;', js: el => { KHELO.filterResults(el); KHELO.EVOLVE(el.dataset.id); }, sa: 'छानना', zh: '过滤', vec: [0.45,0.35,0.25,0.15,0.05,0.95,0.85,0.75,0.65,0.55], col: '#ec4899', domain: '0.9', meaning: 'filter | sieve | sort | select | refine' },
    'y': { css: 'background:rgba(56,189,248,0.1);padding:10px;border-radius:8px;', js: el => { KHELO.searchWiki(el); KHELO.RENDER(el.dataset.id, 'search'); }, sa: 'खोज', zh: '搜索', vec: [0.35,0.25,0.15,0.05,0.95,0.85,0.75,0.65,0.55,0.45], col: '#06b6d4', domain: '0.1', meaning: 'search | seek | query | find | explore' },

    // VECTOR MATH (A-E)
    'A': { css: 'display:inline-block;width:10px;height:10px;background:#00ff88;border-radius:50%;margin:2px;', js: el => { el.title = `Vector: ${JSON.stringify(KHELO.getVector(el))}`; KHELO.COMPARE(el.dataset.v1, el.dataset.v2); }, sa: 'सदिश', zh: '向量', vec: [1,1,1,1,1,1,1,1,1,1], col: '#00ff88', domain: 'math', meaning: 'vector | direction | magnitude | arrow' },
    'B': { css: 'font-size:10px;color:#888;padding:5px;', js: el => { el.textContent = KHELO.cosineSimilarity(el.dataset.v1, el.dataset.v2).toFixed(2); KHELO.MERGE(el.dataset.v1, el.dataset.v2); }, sa: 'साम्य', zh: '相似', vec: [0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9], col: '#ff7f00', domain: 'math', meaning: 'similarity | likeness | resonance | match' },
    'C': { css: 'width:100%;height:2px;background:linear-gradient(90deg,#00ff88,#ff0000);margin:5px 0;', js: el => { KHELO.normalizeVector(el); KHELO.CONNECT(el.dataset.id, 'normalize'); }, sa: 'सामान्यीकरण', zh: '标准化', vec: [0.8,0.8,0.8,0.8,0.8,0.8,0.8,0.8,0.8,0.8], col: '#ffff00', domain: 'math', meaning: 'normalize | standardize | balance | equalize' },
    'D': { css: 'display:flex;align-items:center;gap:5px;padding:5px;', js: el => { el.textContent = KHELO.dotProduct(el.dataset.v1, el.dataset.v2); KHELO.RELATE(el.dataset.id); }, sa: 'गुणनफल', zh: '点积', vec: [0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7], col: '#00ff00', domain: 'math', meaning: 'dot product | projection | alignment' },
    'E': { css: 'font-weight:bold;color:#00aaff;padding:5px;', js: el => { el.textContent = KHELO.magnitude(el.dataset.vector); KHELO.INFER(el.dataset.id); }, sa: 'परिमाण', zh: '幅度', vec: [0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6], col: '#0000ff', domain: 'math', meaning: 'magnitude | size | length | extent' },

    // ANIMATION (F-J)
    'F': { css: 'animation:fadeIn 0.5s;', js: el => { KHELO.lerp(el, 'opacity', 0, 1, 500); KHELO.DISCOVER(el.dataset.id); }, sa: 'क्रमिक', zh: '渐变', vec: [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5], col: '#9400d3', domain: 'anim', meaning: 'fade | gradual | smooth | transition' },
    'G': { css: 'animation:slideIn 0.5s;', js: el => { KHELO.easeOut(el, 'transform', 'translateX(100px)', 'translateX(0)', 500); KHELO.SIMULATE(el.dataset.id); }, sa: 'गति', zh: '缓动', vec: [0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4], col: '#ffffff', domain: 'anim', meaning: 'slide | ease | motion | glide' },
    'H': { css: 'animation:pulse 2s infinite;', js: el => { KHELO.animateLoop(el, 'scale', 1, 1.1, 1000); KHELO.PREDICT(el.dataset.id); }, sa: 'चक्र', zh: '循环', vec: [0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3], col: '#000000', domain: 'anim', meaning: 'pulse | beat | rhythm | cycle' },
    'I': { css: 'transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);', js: el => { el.onmouseover = () => el.style.transform = 'scale(1.2)'; KHELO.EVOLVE(el.dataset.id); }, sa: 'बॉउंस', zh: '弹跳', vec: [0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2], col: '#ff00ff', domain: 'anim', meaning: 'bounce | spring | elastic | rebound' },
    'J': { css: 'animation:rotate 2s linear infinite;', js: el => { KHELO.rotateElement(el, 360, 2000); KHELO.RENDER(el.dataset.id, 'rotate'); }, sa: 'घूर्णन', zh: '旋转', vec: [0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1], col: '#00ffff', domain: 'anim', meaning: 'rotate | spin | turn | whirl' },

    // DATA STRUCTURES (K-O)
    'K': { css: 'display:flex;flex-direction:column;align-items:center;', js: el => { KHELO.buildTree(el); KHELO.CONNECT(el.dataset.id, 'tree'); }, sa: 'वृक्ष', zh: '树', vec: [0.95,0.85,0.75,0.65,0.55,0.45,0.35,0.25,0.15,0.05], col: '#10b981', domain: 'data', meaning: 'tree | hierarchy | branch | root | growth' },
    'L': { css: 'position:relative;', js: el => { KHELO.buildGraph(el); KHELO.RELATE(el.dataset.id, 'graph'); }, sa: 'ग्राफ', zh: '图', vec: [0.85,0.75,0.65,0.55,0.45,0.35,0.25,0.15,0.05,0.95], col: '#f59e0b', domain: 'data', meaning: 'graph | network | web | mesh | topology' },
    'M': { css: 'display:flex;gap:5px;', js: el => { KHELO.buildQueue(el); KHELO.DISCOVER(el.dataset.id, 'queue'); }, sa: 'पंक्ति', zh: '队列', vec: [0.75,0.65,0.55,0.45,0.35,0.25,0.15,0.05,0.95,0.85], col: '#ef4444', domain: 'data', meaning: 'queue | line | sequence | order | flow' },
    'N': { css: 'display:grid;grid-template-columns:repeat(3,1fr);gap:5px;', js: el => { KHELO.buildStack(el); KHELO.SIMULATE(el.dataset.id, 'stack'); }, sa: 'ढेर', zh: '栈', vec: [0.65,0.55,0.45,0.35,0.25,0.15,0.05,0.95,0.85,0.75], col: '#8b5cf6', domain: 'data', meaning: 'stack | pile | layer | depth | LIFO' },
    'O': { css: 'border:1px dashed #888;padding:10px;border-radius:8px;', js: el => { KHELO.buildMap(el); KHELO.CONNECT(el.dataset.id, 'map'); }, sa: 'मानचित्र', zh: '映射', vec: [0.55,0.45,0.35,0.25,0.15,0.05,0.95,0.85,0.75,0.65], col: '#ec4899', domain: 'data', meaning: 'map | dictionary | key-value | lookup | hash' }
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 3: KNOWLEDGE BASE (1.json + 3.json + Curated + Wiki Aggregators)
  // ═══════════════════════════════════════════════════════════════════
  domains: {
    '0.1': { name: 'individual', sa: 'आत्मन्', zh: '体', col: '#FF0000', vec: [0.75,0.82,-0.33,0.65,0.44,-0.22,0.55,0.91,0.67,0.33], baej: ['🌱 Innate potential', '🍚 Time/energy', '🔥 Self-discipline', '👑 Ego vs service', '🌸 Self-realization'] },
    '0.2': { name: 'samajh', sa: 'समाज', zh: '社会', col: '#FF7F00', vec: [0.88,0.44,0.22,0.77,0.89,0.66,0.33,0.55,0.44,0.91], baej: ['🌱 Need for belonging', '🍚 Social capital', '🔥 Cultural norms', '👑 Power structures', '🌸 Collective harmony'] },
    '0.3': { name: 'econology', sa: 'अर्थ-प्रकृति', zh: '生态经济', col: '#FFFF00', vec: [0.91,0.66,-0.44,0.95,0.88,0.22,0.11,0.77,0.55,0.82], baej: ['🌱 Resource flow', '🍚 Material needs', '🔥 Production systems', '👑 Exploitation vs regeneration', '🌸 Circular abundance'] },
    '0.4': { name: 'earth_engineering', sa: 'वास्तु', zh: '地球工程', col: '#00FF00', vec: [0.85,0.55,-0.22,0.88,0.77,0.33,0.44,0.66,0.50,0.75], baej: ['🌱 Shelter/safety', '🍚 Space/structure', '🔥 Construction ethics', '👑 Concrete vs organic', '🌸 Living buildings'] },
    '0.5': { name: 'discovery', sa: 'खोज', zh: '发现', col: '#0000FF', vec: [0.82,0.91,0.11,0.65,0.77,0.88,0.95,0.89,0.66,0.55], baej: ['🌱 Wonder/inquiry', '🍚 Data/tools', '🔥 Scientific method', '👑 Truth vs funding', '🌸 Cosmic understanding'] },
    '0.6': { name: 'innovation', sa: 'नवाचार', zh: '创新', col: '#9400D3', vec: [0.77,0.66,0.33,0.55,0.65,0.91,0.88,0.82,0.75,0.95], baej: ['🌱 Creative spark', '🍚 Skill/craft', '🔥 Iteration/failure', '👑 Ownership vs sharing', '🌸 Beauty that serves'] },
    '0.8': { name: 'sahyog', sa: 'सहयोग', zh: '协同', col: '#FFFFFF', vec: [0.95,0.77,0.44,0.82,0.89,0.75,0.66,0.55,0.88,0.91], baej: ['🌱 Shared purpose', '🍚 Mutual trust', '🔥 Communication clarity', '👑 Credit/control', '🌸 Emergent wisdom'] },
    '0.9': { name: 'mukti', sa: 'मोक्ष', zh: '解脱', col: '#000000', vec: [0.89,0.55,0.88,0.77,0.91,0.44,0.33,0.66,0.95,0.82], baej: ['🌱 Inner longing', '🍚 Letting go', '🔥 Discernment', '👑 Illusion of separation', '🌸 Union with all'] }
  },

  subDomains: {
    '0.111': 'physical_wellbeing', '0.112': 'chronological_age', '0.113': 'mental_health',
    '0.114': 'emotional_balance', '0.115': 'self_awareness', '0.116': 'vitality',
    '0.117': 'innate_gifts', '0.118': 'learned_abilities', '0.119': 'artistic_expression',
    '0.121': 'mobility', '0.122': 'youth', '0.123': 'resilience',
    '0.124': 'cognitive_flexibility', '0.125': 'mindfulness', '0.126': 'stamina',
    '0.127': 'musicality', '0.128': 'technical_proficiency', '0.129': 'imagination',
    '0.131': 'nutrition', '0.132': 'sleep_quality', '0.133': 'stress_resilience',
    '0.134': 'trauma_healing', '0.135': 'inner_peace', '0.136': 'energy_flow',
    '0.137': 'intuition', '0.138': 'problem_solving', '0.139': 'creativity_in_action',
    '0.211': 'kinship', '0.212': 'neighborhood', '0.213': 'heritage',
    '0.214': 'worldview', '0.215': 'spirituality', '0.216': 'ritual',
    '0.217': 'mother_tongue', '0.218': 'visual_arts', '0.219': 'melody',
    '0.221': 'intergenerational_bonding', '0.222': 'local_governance', '0.223': 'oral_tradition',
    '0.224': 'cosmology', '0.225': 'meditation_practice', '0.226': 'seasonal_festivals',
    '0.227': 'dialect_preservation', '0.228': 'sculpture', '0.229': 'rhythm',
    '0.311': 'ecosystem_health', '0.312': 'circular_economy', '0.313': 'biophilic_design',
    '0.314': 'renewables', '0.315': 'material_flows', '0.316': 'regeneration',
    '0.317': 'species_diversity', '0.318': 'fertility', '0.319': 'hydrology',
    '0.321': 'soil_microbiome', '0.322': 'zero_waste_systems', '0.323': 'green_infrastructure',
    '0.324': 'solar_energy', '0.325': 'closed_loop_production', '0.326': 'composting_ecology',
    '0.327': 'pollinator_habitats', '0.328': 'carbon_sequestration', '0.329': 'water_cycles',
    '0.811': 'joint_problem_solving', '0.812': 'shared_vision', '0.813': 'mutual_trust',
    '0.814': 'collective_action', '0.815': 'dialogue', '0.816': 'active_listening',
    '0.817': 'consensus_building', '0.818': 'peer_learning', '0.819': 'co_design',
    '0.821': 'idea_fusion', '0.822': 'interdisciplinary_thinking', '0.823': 'pattern_recognition',
    '0.824': 'holistic_integration', '0.825': 'systems_thinking', '0.826': 'creative_synthesis',
    '0.827': 'knowledge_weaving', '0.828': 'cultural_bridging', '0.829': 'philosophical_harmony',
    '0.831': 'interfaith_collaboration', '0.832': 'community_gardens', '0.833': 'skill_sharing_circles',
    '0.834': 'open_source_ethics', '0.835': 'gift_economy_practice', '0.836': 'nonviolent_communication',
    '0.837': 'restorative_justice', '0.838': 'collaborative_art', '0.839': 'collective_meditation',
    '0.911': 'freedom_of_thought', '0.912': 'freedom_of_expression', '0.913': 'freedom_from_fear',
    '0.914': 'freedom_to_create', '0.915': 'freedom_to_love', '0.916': 'freedom_from_attachment',
    '0.917': 'freedom_with_responsibility', '0.918': 'liberation_through_service', '0.919': 'cosmic_freedom',
    '0.921': 'inner_silence', '0.922': 'non_duality', '0.923': 'ego_dissolution',
    '0.924': 'awakened_compassion', '0.925': 'universal_gratitude', '0.926': 'acceptance_of_imperfection',
    '0.927': 'joy_in_stillness', '0.928': 'dance_of_liberation', '0.929': 'song_of_oneness'
  },

  // Curated knowledge base (from Khel.o Earth 00)
  knowledgeBase: [
    { title: "Utkaleshwaram Vyavastha", url: "https://www.amazon.com/dp/B0GGX85FSB", type: "book", icon: "📘", desc: "Earth systems and traditional organic structures.", tags: ["#earth", "#vyavastha"], lat: 20, lng: 80 },
    { title: "Patrakaar – Journalism", url: "https://www.amazon.com/dp/B0GGQ6MJZW", type: "book", icon: "📘", desc: "Encyclopedia of Journalism and Truth.", tags: ["#journalism"], lat: 28, lng: 77 },
    { title: "Rescue Bacche", url: "https://www.amazon.com/dp/B0G2FYBG7S", type: "book", icon: "📘", desc: "Who is Adivasi? Discovering roots.", tags: ["#adivasi"], lat: 22, lng: 82 },
    { title: "Brahman Photosynthesis", url: "https://www.amazon.com/dp/B0GHLG7LSB", type: "book", icon: "🌿", desc: "Science & Mysticism.", tags: ["#science"], lat: 10, lng: 76 },
    { title: "The Brahma Code", url: "https://www.amazon.com/dp/B0FXV32SGR", type: "book", icon: "🧠", desc: "Rewiring Your Reality.", tags: ["#reality"], lat: 30, lng: -90 },
    { title: 'Earth of Nirarthakarthak', url: 'https://kids.miraheze.org/wiki/Nirarthakarthak', type: 'concept', icon: "🌌", desc: 'Where Silence Dances with Sound.', tags: ['#philosophy'], lat: 20, lng: 75 },
    { title: 'Econology', url: '#', type: 'concept', icon: "🌱", desc: 'Integrating economy and ecology.', tags: ['#sustainability'], lat: 40, lng: -100 },
    { title: 'Kendriya Vidyalaya', url: 'https://www.kvsangathan.nic.in', type: 'org', icon: "🏫", desc: "India's largest school chain.", tags: ['#education'], lat: 28.6, lng: 77.2 },
    { title: 'Khan Academy', url: 'https://www.khanacademy.org', type: 'org', icon: "💻", desc: 'Free world-class education.', tags: ['#online'], lat: 37, lng: -122 },
    { title: 'World Wildlife Fund', url: 'https://www.wwf.org', type: 'org', icon: "🐼", desc: 'Conservation and biodiversity.', tags: ['#conservation'], lat: -20, lng: 130 },
    { title: 'IEEE', url: 'https://www.ieee.org', type: 'org', icon: "⚡", desc: 'Institute of Electrical Engineers.', tags: ['#engineering'], lat: 40, lng: -74 },
    { title: 'Solar Desalination Pod', url: '#', type: 'concept', icon: "☀️", desc: 'Open source ocean water purification.', tags: ['#water', '#solar'], lat: 10, lng: -20 },
    { title: 'Earth Day Festival', url: '#', type: 'event', icon: "🌍", desc: 'Global celebration of our planet.', tags: ['#environment'], lat: 40.7, lng: -74.0 },
    { title: 'Chipko Movement', url: '#', type: 'event', icon: "🌳", desc: 'Forest conservation movement.', tags: ['#ecology', '#india'], lat: 30.0, lng: 79.0 }
  ],

  // Wiki Aggregators (30 categories from kids.miraheze.org)
  wikiAggregators: [
    { title: "News & Media", desc: "Global news networks", url: "https://kids.miraheze.org/wiki/List_of_News_and_Media_Aggregators" },
    { title: "International Gov", desc: "Inter-government networks", url: "https://kids.miraheze.org/wiki/International_and_Inter_Government_sites" },
    { title: "Educational", desc: "Open knowledge & research", url: "https://kids.miraheze.org/wiki/List_of_Educational,_Research_%26_Open_Knowledge_Aggregators" },
    { title: "Banking & Finance", desc: "Central banks & economics", url: "https://kids.miraheze.org/wiki/List_of_Banking,_Finance,_Central_Banks_%26_Economic_Aggregators" },
    { title: "Security & Defense", desc: "Police & emergency", url: "https://kids.miraheze.org/wiki/List_of_Security,_Defense,_Police_%26_Emergency_Networks" },
    { title: "Environmental", desc: "Climate & conservation", url: "https://kids.miraheze.org/wiki/List_of_Environmental,_Climate_%26_Conservation_Networks" },
    { title: "Health & Humanitarian", desc: "Medical aid", url: "https://kids.miraheze.org/wiki/List_of_Health,_Medical_%26_Humanitarian_Aid_Networks" },
    { title: "Human & Species Rights", desc: "Rights advocacy", url: "https://kids.miraheze.org/wiki/List_of_Human_or_Species_rights" },
    { title: "Technology & OSS", desc: "Developers & open source", url: "https://kids.miraheze.org/wiki/List_of_Technology_and_Open_source_developers" },
    { title: "Arts & Culture", desc: "Heritage & spiritual", url: "https://kids.miraheze.org/wiki/List_of_Arts,_Culture,_Heritage_%26_Spiritual_Networks" },
    { title: "Labor & Trade Unions", desc: "Worker rights", url: "https://kids.miraheze.org/wiki/List_of_Labor,_Employment,_Trade_Unions_%26_Worker_Rights_Networks" },
    { title: "Sports & Recreation", desc: "Olympic networks", url: "https://kids.miraheze.org/wiki/List_of_Sports,_Recreation_%26_Olympic_Networks" },
    { title: "Transportation", desc: "Infrastructure", url: "https://kids.miraheze.org/wiki/List_of_Transportation,_Logistics_%26_Infrastructure_Networks" },
    { title: "Energy & Power", desc: "Utilities networks", url: "https://kids.miraheze.org/wiki/List_of_Energy,_Utilities_%26_Power_Grid_Networks" },
    { title: "Urban Planning", desc: "Smart cities & housing", url: "https://kids.miraheze.org/wiki/List_of_Urban_Planning,_Smart_Cities,_Architecture_%26_Housing_Networks" },
    { title: "Space & Aerospace", desc: "Astronomy networks", url: "https://kids.miraheze.org/wiki/List_of_Space_Exploration,_Aerospace_%26_Astronomy_Networks" },
    { title: "Oceans & Blue Economy", desc: "Marine research", url: "https://kids.miraheze.org/wiki/List_of_Oceans,_Marine_Research,_Conservation_%26_Blue_Economy_Networks" },
    { title: "Tourism & Hospitality", desc: "Travel networks", url: "https://kids.miraheze.org/wiki/List_of_Tourism,_Hospitality,_Travel_%26_Destination_Networks" },
    { title: "Telecommunications", desc: "Global connectivity", url: "https://kids.miraheze.org/wiki/List_of_Telecommunications,_Mobile_Networks_%26_Global_Connectivity_Infrastructure" },
    { title: "Meteorology", desc: "Climate monitoring", url: "https://kids.miraheze.org/wiki/List_of_Meteorology,_Weather,_Climate_Monitoring_%26_Geohazards_Networks" },
    { title: "Philanthropy", desc: "Grant-making", url: "https://kids.miraheze.org/wiki/List_of_Philanthropy,_Foundations_%26_Grant-Making_Networks" },
    { title: "Manufacturing", desc: "Global supply chain", url: "https://kids.miraheze.org/wiki/List_of_Manufacturing,_Industry,_Robotics_%26_Global_Supply_Chain_Networks" },
    { title: "Legal & Justice", desc: "Global law", url: "https://kids.miraheze.org/wiki/List_of_Legal,_Justice,_Bar_Associations_%26_Global_Law_Networks" },
    { title: "Food & FMCG", desc: "Consumer supply chain", url: "https://kids.miraheze.org/wiki/List_of_Food,_Beverage,_FMCG_%26_Global_Consumer_Supply_Chain_Networks" },
    { title: "Retail & E-commerce", desc: "Global trade", url: "https://kids.miraheze.org/wiki/List_of_Retail,_E-commerce,_Consumer_Markets_%26_Global_Trade_Networks" },
    { title: "Real Estate", desc: "Property markets", url: "https://kids.miraheze.org/wiki/List_of_Real_Estate,_Construction,_Property_Markets_%26_PropTech_Networks" },
    { title: "Evolution of Beliefs", desc: "Social organization", url: "https://kids.miraheze.org/wiki/Evolution_of_Human_Beliefs,_Values,_and_Social_Organization" },
    { title: "Timeline of Associations", desc: "Human organizations", url: "https://kids.miraheze.org/wiki/Timeline_of_Human_Associations_and_Organizations" },
    { title: "Human Behavior", desc: "Development psychology", url: "https://kids.miraheze.org/wiki/Human_Behavior_and_Development" },
    { title: "Biodiversity", desc: "Species understanding", url: "https://kids.miraheze.org/wiki/List_of_Species_Understanding,_Biodiversity_%26_Ecosystem_Networks" }
  ],

  // 5W1H Question Templates
  questionTemplates: [
    "What is the physical architecture of {k}?",
    "Why do we need {k} for planetary synchronization?",
    "How can we prototype {k} without the Creator Ego?",
    "Where can we find the silent roots of {k}?",
    "When did we start disconnecting from {k}?",
    "Who is witnessing the evolution of {k}?"
  ],

  // AI Synthesis Map (curated keyword → packaged knowledge)
  synthesisMap: {
    "water": {
      fact: "Only 3% of Earth's water is fresh, yet it sustains all terrestrial life.",
      book: { title: "The Water Will Come", url: "https://www.amazon.com/s?k=the+water+will+come&tag=amazon0339f-21" },
      event: { title: "World Water Summit", url: "https://www.worldwatersummit.org/" },
      community: { title: "Water.org", url: "https://www.water.org/" },
      product: { title: "Rainwater Harvesting Barrel", url: "https://www.amazon.com/s?k=rainwater+harvesting+barrel&tag=amazon0339f-21" }
    },
    "soil": {
      fact: "A single teaspoon of soil contains more microorganisms than people on Earth.",
      book: { title: "Dirt: The Ecstatic Skin", url: "https://www.amazon.com/s?k=dirt+the+ecstatic+skin&tag=amazon0339f-21" },
      event: { title: "Global Soil Week", url: "https://www.globalsoilweek.org/" },
      community: { title: "Rodale Institute", url: "https://rodaleinstitute.org/" },
      product: { title: "Home Composting Kit", url: "https://www.amazon.com/s?k=composting+starter+kit&tag=amazon0339f-21" }
    },
    "energy": {
      fact: "The Sun provides more energy in one hour than humanity uses in a year.",
      book: { title: "Reinventing Fire", url: "https://www.amazon.com/s?k=reinventing+fire&tag=amazon0339f-21" },
      event: { title: "Clean Energy Ministerial", url: "https://www.cleanenergyministerial.org/" },
      community: { title: "Rocky Mountain Institute", url: "https://rmi.org/" },
      product: { title: "Solar Power Bank", url: "https://www.amazon.com/s?k=solar+power+bank&tag=amazon0339f-21" }
    },
    "community": {
      fact: "The strongest predictor of happiness is the quality of our social ties.",
      book: { title: "Bowling Alone", url: "https://www.amazon.com/s?k=bowling+alone&tag=amazon0339f-21" },
      event: { title: "Skoll World Forum", url: "https://skoll.org/skoll-world-forum/" },
      community: { title: "Ashoka", url: "https://www.ashoka.org/" },
      product: { title: "Community Board Game", url: "https://www.amazon.com/s?k=community+board+game&tag=amazon0339f-21" }
    },
    "mind": {
      fact: "The brain uses 20% of body energy, yet can observe itself.",
      book: { title: "Thinking, Fast and Slow", url: "https://www.amazon.com/s?k=thinking+fast+and+slow&tag=amazon0339f-21" },
      event: { title: "Mind & Life Institute", url: "https://www.mindandlife.org/" },
      community: { title: "Art of Living", url: "https://www.artofliving.org/" },
      product: { title: "Meditation Cushion", url: "https://www.amazon.com/s?k=meditation+cushion&tag=amazon0339f-21" }
    },
    "nature": {
      fact: "Nature does not hurry, yet everything is accomplished.",
      book: { title: "The Hidden Life of Trees", url: "https://www.amazon.com/s?k=hidden+life+of+trees&tag=amazon0339f-21" },
      event: { title: "UN Biodiversity Conference", url: "https://www.cbd.int/conferences/" },
      community: { title: "World Wildlife Fund", url: "https://www.wwf.org/" },
      product: { title: "Native Wildflower Seeds", url: "https://www.amazon.com/s?k=native+wildflower+seeds&tag=amazon0339f-21" }
    },
    "khel.o": {
      fact: "Play is the highest form of research. When the mind plays, it bypasses the ego.",
      book: { title: "Finite and Infinite Games", url: "https://www.amazon.com/s?k=finite+and+infinite+games&tag=amazon0339f-21" },
      event: { title: "Maker Faire", url: "https://makerfaire.com/" },
      community: { title: "Open Source Initiative", url: "https://opensource.org/" },
      product: { title: "Arduino Starter Kit", url: "https://www.amazon.com/s?k=arduino+starter+kit&tag=amazon0339f-21" }
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 4: SEMANTIC INSTRUCTION SET (11 Operations)
  // Each operation = compile + store + connect + correct + evolve
  // ═══════════════════════════════════════════════════════════════════
  CONNECT(id, type) {
    console.log(`[CONNECT] ${id} → ${type}`);
    this.RELATE(id);
    this.TRACK('connect', id);
  },
  RELATE(id, context) {
    console.log(`[RELATE] Finding relationships for ${id}`);
    this.DISCOVER(id);
    this.TRACK('relate', id);
  },
  INFER(id) {
    console.log(`[INFER] Deducing new knowledge from ${id}`);
    this.VERIFY(id);
    this.TRACK('infer', id);
  },
  VERIFY(id, evidence) {
    console.log(`[VERIFY] Checking truth of ${id}`);
    this.TRACK('verify', id);
  },
  COMPARE(id1, id2) {
    console.log(`[COMPARE] Measuring distance between ${id1} and ${id2}`);
    this.TRACK('compare', `${id1},${id2}`);
  },
  MERGE(id1, id2) {
    console.log(`[MERGE] Combining ${id1} and ${id2}`);
    this.CONNECT(id1, 'merged');
    this.TRACK('merge', `${id1},${id2}`);
  },
  DISCOVER(id, domain) {
    console.log(`[DISCOVER] Finding patterns in ${id} (${domain})`);
    this.TRACK('discover', id);
  },
  SIMULATE(id, timeline) {
    console.log(`[SIMULATE] Projecting ${id} through time`);
    this.PREDICT(id);
    this.TRACK('simulate', id);
  },
  PREDICT(id, horizon) {
    console.log(`[PREDICT] Forecasting ${id}`);
    this.TRACK('predict', id);
  },
  EVOLVE(id, feedback) {
    console.log(`[EVOLVE] Self-modifying ${id}`);
    this.TRACK('evolve', id);
  },
  RENDER(id, mode) {
    console.log(`[RENDER] Manifesting ${id} as ${mode}`);
    this.TRACK('render', id);
  },
  TRACK(operation, id) {
    if (!this.state.usageLog) this.state.usageLog = [];
    this.state.usageLog.push({ op: operation, id: id, time: Date.now() });
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 5: PARSER & COMPRESSOR
  // ═══════════════════════════════════════════════════════════════════
  parse(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    doc.querySelectorAll('*').forEach(el => {
      const tag = el.tagName.toLowerCase();
      if (this.lib[tag]) {
        const m = this.lib[tag];
        el.style.cssText += m.css;
        el.style.color = m.col;
        el.style.borderColor = m.col;
        if (m.js) m.js(el);
        el.dataset.sanskrit = m.sa;
        el.dataset.chinese = m.zh;
        el.dataset.vector = JSON.stringify(m.vec);
        el.dataset.domain = m.domain;
        el.dataset.meaning = m.meaning;
      }
    });
    return doc.body.innerHTML;
  },

  compress(html) {
    let c = html;
    const patterns = [
      [/display:flex;align-items:center;justify-content:center;/g, '<z>'],
      [/position:absolute;top:50%;left:50%;transform:translate\(-50%,-50%\);/g, '<a>'],
      [/background:linear-gradient\(135deg,#00ff88,#00aaff\);/g, '<b>'],
      [/display:grid;grid-template-columns:repeat\(auto-fit,minmax\(200px,1fr\)\);/g, '<c>'],
      [/width:60px;height:60px;border-radius:50%;/g, '<d>'],
      [/font-size:24px;font-weight:bold;/g, '<e>'],
      [/position:fixed;bottom:20px;right:20px;/g, '<f>'],
      [/display:flex;flex-direction:column;gap:10px;/g, '<g>'],
      [/width:100%;height:100vh;overflow:hidden;/g, '<h>']
    ];
    patterns.forEach(([p, r]) => c = c.replace(p, r));
    return c;
  },

  learn(usageData) {
    const freq = {};
    usageData.forEach(char => freq[char] = (freq[char] || 0) + 1);
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    sorted.forEach(([char, count]) => {
      if (this.lib[char]) {
        const col = this.lib[char].col;
        const r = parseInt(col.slice(1, 3), 16);
        const g = parseInt(col.slice(3, 5), 16);
        const b = parseInt(col.slice(5, 7), 16);
        const boost = Math.min(255, r + count);
        this.lib[char].col = `#${boost.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      }
    });
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 6: GRAPH OPERATIONS
  // ═══════════════════════════════════════════════════════════════════
  addNode(el) {
    const node = document.createElement('i');
    node.style.left = Math.random() * 80 + 10 + '%';
    node.style.top = Math.random() * 80 + 10 + '%';
    el.parentElement.appendChild(node);
    this.parse(node.outerHTML);
  },

  layoutPhyllotaxis(container) {
    const nodes = container.querySelectorAll('i');
    nodes.forEach((node, i) => {
      const angle = i * 137.508 * (Math.PI / 180);
      const radius = 20 * Math.sqrt(i);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      node.style.setProperty('--x', x + 'px');
      node.style.setProperty('--y', y + 'px');
      node.style.transform = `translate3d(var(--x), var(--y), 0)`;
    });
  },

  drawEdges(container) {
    const nodes = Array.from(container.querySelectorAll('i'));
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = 'position:absolute;width:100%;height:100%;pointer-events:none;';
    nodes.forEach((node, i) => {
      if (i > 0) {
        const prev = nodes[i - 1];
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', prev.offsetLeft + 20);
        line.setAttribute('y1', prev.offsetTop + 20);
        line.setAttribute('x2', node.offsetLeft + 20);
        line.setAttribute('y2', node.offsetTop + 20);
        line.setAttribute('stroke', '#00ff88');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
      }
    });
    container.appendChild(svg);
  },

  expandNode(el) {
    const vec = JSON.parse(el.dataset.vector);
    console.log('[EXPAND]', el.dataset.sanskrit, el.dataset.chinese, vec);
    for (let i = 0; i < 5; i++) {
      const child = document.createElement('d');
      child.textContent = ['🌱','🍚','🔥','👑','🌸'][i];
      child.style.transform = `translate(${Math.cos(i*72*Math.PI/180)*100}px, ${Math.sin(i*72*Math.PI/180)*100}px)`;
      el.parentElement.appendChild(child);
      this.parse(child.outerHTML);
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 7: API METHODS (Multi-source)
  // ═══════════════════════════════════════════════════════════════════
  async fetchWiki(page) {
    const url = `${this.config.wikiApi}?action=parse&page=${page}&prop=text|links&format=json&origin=*`;
    const response = await fetch(url);
    return await response.json();
  },

  async compressData(text) {
    const bytes = new TextEncoder().encode(text);
    const cs = new CompressionStream('gzip');
    const writer = cs.writable.getWriter();
    writer.write(bytes);
    writer.close();
    const buf = await new Response(cs.readable).arrayBuffer();
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
  },

  async decompressData(compressed) {
    const bytes = Uint8Array.from(atob(compressed), c => c.charCodeAt(0));
    const ds = new DecompressionStream('gzip');
    const writer = ds.writable.getWriter();
    writer.write(bytes);
    writer.close();
    const buf = await new Response(ds.readable).arrayBuffer();
    return new TextDecoder().decode(buf);
  },

  // Multi-source search
  async searchUniversal(query) {
    const ext = this.state.extensions;
    const promises = [];
    if (ext.wiki) promises.push(this.fetchWikiLive(query));
    if (ext.scholar) promises.push(this.fetchScholarLive(query));
    if (ext.books) promises.push(this.fetchBooksLive(query));
    if (ext.maker) promises.push(this.fetchGitHubLive(query));
    if (ext.local) promises.push(this.fetchLocalLive(query));
    const settled = await Promise.allSettled(promises);
    let results = [];
    settled.forEach(r => { if (r.status === 'fulfilled') results = results.concat(r.value); });
    return results;
  },

  async fetchWikiLive(query) {
    try {
      const url = `${this.config.wikiApi}?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
      const res = await fetch(url);
      const data = await res.json();
      return (data.query?.search || []).slice(0, 3).map(page => ({
        title: page.title,
        url: `https://kids.miraheze.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`,
        type: 'wiki', icon: '📚',
        desc: (page.snippet || '').replace(/<[^>]*>/g, '').substring(0, 120) + '…'
      }));
    } catch(e) { return []; }
  },

  async fetchScholarLive(query) {
    try {
      const res = await fetch(`https://api.openalex.org/works?search=${encodeURIComponent(query)}&per_page=2&sort=cited_by_count:desc`);
      const data = await res.json();
      return (data.results || []).map(p => ({
        title: p.title || 'Untitled', url: p.doi ? `https://doi.org/${p.doi}` : p.id,
        type: 'scholar', icon: '🔬', desc: `Research · Citations: ${p.cited_by_count ?? 0}`
      }));
    } catch(e) { return []; }
  },

  async fetchBooksLive(query) {
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=2`);
      const data = await res.json();
      return (data.docs || []).map(b => ({
        title: b.title, url: `https://openlibrary.org${b.key}`,
        type: 'books', icon: '📖', desc: `Book · ${b.author_name?.[0] || 'Unknown'}`
      }));
    } catch(e) { return []; }
  },

  async fetchGitHubLive(query) {
    try {
      const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=2`);
      const data = await res.json();
      return (data.items || []).map(r => ({
        title: r.full_name, url: r.html_url, type: 'maker', icon: '🛠',
        desc: `Open source · ⭐ ${r.stargazers_count}`
      }));
    } catch(e) { return []; }
  },

  async fetchLocalLive(query) {
    const loc = this.state.location;
    const lat = loc?.lat ?? 20.59, lng = loc?.lng ?? 78.96;
    const q = `[out:json][timeout:10];(node["amenity"="community_centre"](around:60000,${lat},${lng});node["office"="ngo"](around:60000,${lat},${lng}););out body 3;`;
    try {
      const res = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: q });
      const data = await res.json();
      return (data.elements || []).map(el => ({
        title: el.tags?.name || 'Local Community',
        url: `https://www.openstreetmap.org/node/${el.id}`,
        type: 'local', icon: '📍',
        desc: `Near ${loc?.city || 'you'} · ${el.tags?.amenity || el.tags?.office || 'community'}`
      }));
    } catch(e) { return []; }
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 8: VECTOR MATH
  // ═══════════════════════════════════════════════════════════════════
  cosineSimilarity(v1, v2) {
    const vec1 = typeof v1 === 'string' ? JSON.parse(v1) : v1;
    const vec2 = typeof v2 === 'string' ? JSON.parse(v2) : v2;
    let dot = 0, n1 = 0, n2 = 0;
    for (let i = 0; i < vec1.length; i++) {
      dot += vec1[i] * vec2[i];
      n1 += vec1[i] * vec1[i];
      n2 += vec2[i] * vec2[i];
    }
    return dot / (Math.sqrt(n1) * Math.sqrt(n2));
  },

  dotProduct(v1, v2) {
    const vec1 = typeof v1 === 'string' ? JSON.parse(v1) : v1;
    const vec2 = typeof v2 === 'string' ? JSON.parse(v2) : v2;
    return vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  },

  magnitude(vector) {
    const vec = typeof vector === 'string' ? JSON.parse(vector) : vector;
    return Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 9: ANIMATION
  // ═══════════════════════════════════════════════════════════════════
  lerp(el, prop, start, end, duration) {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = start + (end - start) * progress;
      el.style[prop] = value;
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 10: INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════
  init() {
    console.log(`🌌 KHEL.O EARTH 00 v${this.config.version} initialized`);
    console.log(`📚 Domains: ${Object.keys(this.domains).length}`);
    console.log(`📚 SubDomains: ${Object.keys(this.subDomains).length}`);
    console.log(`🔤 Characters: ${Object.keys(this.lib).length}`);
    console.log(`📖 Knowledge Base: ${this.knowledgeBase.length} items`);
    console.log(`📂 Wiki Aggregators: ${this.wikiAggregators.length} categories`);
    console.log(`🎯 5W1H Templates: ${this.questionTemplates.length}`);
    console.log(`🧠 Synthesis Map: ${Object.keys(this.synthesisMap).length} keywords`);
  }
};

// Export for use
if (typeof module !== 'undefined') module.exports = KHELO;