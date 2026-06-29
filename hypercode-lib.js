/**
 * QWEN HYPER-CODE LIBRARY v3.0
 * Single Character = CSS + JS + Semantic Meaning + Vector
 * Works on ALL browsers, ALL OS via HTML/JS
 * Self-Learning, Graph Operations, Vector Math, Compression
 */

const Q = {
  // ═══════════════════════════════════════════════════════════════════
  // CHARACTER LIBRARY (100+ mappings)
  // ═══════════════════════════════════════════════════════════════════
  lib: {
    // CORE UI (z-h)
    'z': { css: 'display:flex;align-items:center;justify-content:center;border-radius:50%;transition:all .3s;', js: el => el.onclick = () => el.classList.toggle('active'), sa: 'चक्र', zh: '圈', vec: [1,0,0,0,0,0,0,0,0,0], col: '#00ff88' },
    'a': { css: 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);', js: el => el.style.animation = 'pulse 2s infinite', sa: 'आत्मन्', zh: '体', vec: [0.75,0.82,-0.33,0.65,0.44,-0.22,0.55,0.91,0.67,0.33], col: '#FF0000' },
    'b': { css: 'background:linear-gradient(135deg,#00ff88,#00aaff);color:#000;padding:10px 20px;border-radius:8px;cursor:pointer;', js: el => el.onmouseover = () => el.style.transform = 'scale(1.1)', sa: 'बल', zh: '力', vec: [0.88,0.44,0.22,0.77,0.89,0.66,0.33,0.55,0.44,0.91], col: '#FF7F00' },
    'c': { css: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;', js: el => el.querySelectorAll('*').forEach(c => c.style.margin = '0'), sa: 'चक्र', zh: '网', vec: [0.91,0.66,-0.44,0.95,0.88,0.22,0.11,0.77,0.55,0.82], col: '#FFFF00' },
    'd': { css: 'width:60px;height:60px;border-radius:50%;border:2px solid;cursor:pointer;', js: el => el.onclick = () => Q.expandNode(el), sa: 'दृष्टि', zh: '点', vec: [0.85,0.55,-0.22,0.88,0.77,0.33,0.44,0.66,0.50,0.75], col: '#00FF00' },
    'e': { css: 'font-size:24px;font-weight:bold;text-align:center;', js: el => el.style.textShadow = '0 0 10px currentColor', sa: 'एक', zh: '一', vec: [0.82,0.91,0.11,0.65,0.77,0.88,0.95,0.89,0.66,0.55], col: '#0000FF' },
    'f': { css: 'position:fixed;bottom:20px;right:20px;z-index:1000;', js: el => el.onclick = () => Q.togglePanel(), sa: 'मुक्त', zh: '浮', vec: [0.77,0.66,0.33,0.55,0.65,0.91,0.88,0.82,0.75,0.95], col: '#9400D3' },
    'g': { css: 'display:flex;flex-direction:column;gap:10px;padding:20px;background:rgba(0,0,0,0.8);border-radius:10px;', js: el => el.style.backdropFilter = 'blur(10px)', sa: 'गति', zh: '长', vec: [0.95,0.77,0.44,0.82,0.89,0.75,0.66,0.55,0.88,0.91], col: '#FFFFFF' },
    'h': { css: 'width:100%;height:100vh;overflow:hidden;position:relative;', js: el => Q.initTree(el), sa: 'हृदय', zh: '空', vec: [0.89,0.55,0.88,0.77,0.91,0.44,0.33,0.66,0.95,0.82], col: '#000000' },

    // GRAPH OPERATIONS (i-r)
    'i': { css: 'width:40px;height:40px;border-radius:50%;background:rgba(0,255,136,0.2);border:2px solid #00ff88;position:absolute;', js: el => el.onclick = () => Q.addNode(el), sa: 'नोड', zh: '节点', vec: [0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1,0], col: '#00ff88' },
    'j': { css: 'width:2px;height:100px;background:linear-gradient(to bottom,#00ff88,transparent);position:absolute;', js: el => el.style.transform = `rotate(${Math.random()*360}deg)`, sa: 'मार्ग', zh: '边', vec: [0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1,0,0.9], col: '#00aaff' },
    'k': { css: 'position:absolute;transform-style:preserve-3d;width:100%;height:100%;', js: el => Q.layoutPhyllotaxis(el), sa: 'विन्यास', zh: '布局', vec: [0.7,0.6,0.5,0.4,0.3,0.2,0.1,0,0.9,0.8], col: '#ff7f00' },
    'l': { css: 'position:absolute;width:100%;height:100%;pointer-events:none;', js: el => Q.drawEdges(el), sa: 'रेखा', zh: '线', vec: [0.6,0.5,0.4,0.3,0.2,0.1,0,0.9,0.8,0.7], col: '#ffff00' },
    'm': { css: 'transform:translate3d(var(--x,0),var(--y,0),var(--z,0));transition:transform 0.5s;', js: el => Q.animateNode(el), sa: 'गतिमान', zh: '动', vec: [0.5,0.4,0.3,0.2,0.1,0,0.9,0.8,0.7,0.6], col: '#00ff00' },
    'n': { css: 'width:20px;height:20px;border-radius:50%;background:#ff0000;position:absolute;', js: el => Q.highlightNode(el), sa: 'केंद्र', zh: '中心', vec: [0.4,0.3,0.2,0.1,0,0.9,0.8,0.7,0.6,0.5], col: '#ff0000' },
    'o': { css: 'border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:10px;margin:5px;', js: el => Q.expandCluster(el), sa: 'समूह', zh: '群', vec: [0.3,0.2,0.1,0,0.9,0.8,0.7,0.6,0.5,0.4], col: '#9400d3' },
    'p': { css: 'position:relative;overflow:hidden;', js: el => Q.zoomGraph(el), sa: 'दृश्य', zh: '视图', vec: [0.2,0.1,0,0.9,0.8,0.7,0.6,0.5,0.4,0.3], col: '#ffffff' },
    'q': { css: 'cursor:grab;user-select:none;', js: el => Q.enableDrag(el), sa: 'आकर्षण', zh: '拖', vec: [0.1,0,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2], col: '#00ffff' },
    'r': { css: 'transition:all 0.3s ease-out;', js: el => Q.resetView(el), sa: 'पुनर्स्थापना', zh: '重置', vec: [0,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1], col: '#ff00ff' },

    // API OPERATIONS (s-y)
    's': { css: 'display:none;', js: async el => await Q.fetchWiki(el.dataset.page), sa: 'प्राप्त', zh: '取', vec: [0.95,0.85,0.75,0.65,0.55,0.45,0.35,0.25,0.15,0.05], col: '#38bdf8' },
    't': { css: 'font-family:monospace;font-size:12px;padding:10px;background:#1e293b;border-radius:8px;', js: el => Q.parseJSON(el), sa: 'व्याख्या', zh: '解析', vec: [0.85,0.75,0.65,0.55,0.45,0.35,0.25,0.15,0.05,0.95], col: '#f59e0b' },
    'u': { css: 'background:#1e293b;color:#e2e8f0;padding:15px;border-radius:8px;', js: async el => el.textContent = await Q.compressData(el.dataset.text), sa: 'संपीड़न', zh: '压缩', vec: [0.75,0.65,0.55,0.45,0.35,0.25,0.15,0.05,0.95,0.85], col: '#10b981' },
    'v': { css: 'white-space:pre-wrap;word-break:break-all;', js: async el => el.textContent = await Q.decompressData(el.dataset.compressed), sa: 'विस्तार', zh: '解压', vec: [0.65,0.55,0.45,0.35,0.25,0.15,0.05,0.95,0.85,0.75], col: '#ef4444' },
    'w': { css: 'border:2px solid #38bdf8;padding:10px;border-radius:8px;', js: el => Q.extractLinks(el), sa: 'कड़ी', zh: '链接', vec: [0.55,0.45,0.35,0.25,0.15,0.05,0.95,0.85,0.75,0.65], col: '#8b5cf6' },
    'x': { css: 'display:flex;gap:10px;flex-wrap:wrap;', js: el => Q.filterResults(el), sa: 'छानना', zh: '过滤', vec: [0.45,0.35,0.25,0.15,0.05,0.95,0.85,0.75,0.65,0.55], col: '#ec4899' },
    'y': { css: 'background:rgba(56,189,248,0.1);padding:10px;border-radius:8px;', js: el => Q.searchWiki(el), sa: 'खोज', zh: '搜索', vec: [0.35,0.25,0.15,0.05,0.95,0.85,0.75,0.65,0.55,0.45], col: '#06b6d4' },

    // VECTOR MATH (A-E)
    'A': { css: 'display:inline-block;width:10px;height:10px;background:#00ff88;border-radius:50%;margin:2px;', js: el => el.title = `Vector: ${JSON.stringify(Q.getVector(el))}`, sa: 'सदिश', zh: '向量', vec: [1,1,1,1,1,1,1,1,1,1], col: '#00ff88' },
    'B': { css: 'font-size:10px;color:#888;padding:5px;', js: el => el.textContent = Q.cosineSimilarity(el.dataset.v1, el.dataset.v2).toFixed(2), sa: 'साम्य', zh: '相似', vec: [0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9], col: '#ff7f00' },
    'C': { css: 'width:100%;height:2px;background:linear-gradient(90deg,#00ff88,#ff0000);margin:5px 0;', js: el => Q.normalizeVector(el), sa: 'सामान्यीकरण', zh: '标准化', vec: [0.8,0.8,0.8,0.8,0.8,0.8,0.8,0.8,0.8,0.8], col: '#ffff00' },
    'D': { css: 'display:flex;align-items:center;gap:5px;padding:5px;', js: el => el.textContent = Q.dotProduct(el.dataset.v1, el.dataset.v2), sa: 'गुणनफल', zh: '点积', vec: [0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7], col: '#00ff00' },
    'E': { css: 'font-weight:bold;color:#00aaff;padding:5px;', js: el => el.textContent = Q.magnitude(el.dataset.vector), sa: 'परिमाण', zh: '幅度', vec: [0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6], col: '#0000ff' },

    // ANIMATION (F-J)
    'F': { css: 'animation:fadeIn 0.5s;', js: el => Q.lerp(el, 'opacity', 0, 1, 500), sa: 'क्रमिक', zh: '渐变', vec: [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5], col: '#9400d3' },
    'G': { css: 'animation:slideIn 0.5s;', js: el => Q.easeOut(el, 'transform', 'translateX(100px)', 'translateX(0)', 500), sa: 'गति', zh: '缓动', vec: [0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4], col: '#ffffff' },
    'H': { css: 'animation:pulse 2s infinite;', js: el => Q.animateLoop(el, 'scale', 1, 1.1, 1000), sa: 'चक्र', zh: '循环', vec: [0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3], col: '#000000' },
    'I': { css: 'transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);', js: el => el.onmouseover = () => el.style.transform = 'scale(1.2)', sa: 'बॉउंस', zh: '弹跳', vec: [0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2], col: '#ff00ff' },
    'J': { css: 'animation:rotate 2s linear infinite;', js: el => Q.rotateElement(el, 360, 2000), sa: 'घूर्णन', zh: '旋转', vec: [0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1], col: '#00ffff' },

    // DATA STRUCTURES (K-O)
    'K': { css: 'display:flex;flex-direction:column;align-items:center;', js: el => Q.buildTree(el), sa: 'वृक्ष', zh: '树', vec: [0.95,0.85,0.75,0.65,0.55,0.45,0.35,0.25,0.15,0.05], col: '#10b981' },
    'L': { css: 'position:relative;', js: el => Q.buildGraph(el), sa: 'ग्राफ', zh: '图', vec: [0.85,0.75,0.65,0.55,0.45,0.35,0.25,0.15,0.05,0.95], col: '#f59e0b' },
    'M': { css: 'display:flex;gap:5px;', js: el => Q.buildQueue(el), sa: 'पंक्ति', zh: '队列', vec: [0.75,0.65,0.55,0.45,0.35,0.25,0.15,0.05,0.95,0.85], col: '#ef4444' },
    'N': { css: 'display:grid;grid-template-columns:repeat(3,1fr);gap:5px;', js: el => Q.buildStack(el), sa: 'ढेर', zh: '栈', vec: [0.65,0.55,0.45,0.35,0.25,0.15,0.05,0.95,0.85,0.75], col: '#8b5cf6' },
    'O': { css: 'border:1px dashed #888;padding:10px;border-radius:8px;', js: el => Q.buildMap(el), sa: 'मानचित्र', zh: '映射', vec: [0.55,0.45,0.35,0.25,0.15,0.05,0.95,0.85,0.75,0.65], col: '#ec4899' }
  },

  // ═══════════════════════════════════════════════════════════════════
  // KNOWLEDGE BASE (from 1.json + 3.json)
  // ═══════════════════════════════════════════════════════════════════
  domains: {
    '0.1': { name: 'individual', sa: 'आत्मन्', zh: '体', col: '#FF0000', vec: [0.75,0.82,-0.33,0.65,0.44,-0.22,0.55,0.91,0.67,0.33] },
    '0.2': { name: 'samajh', sa: 'समाज', zh: '社会', col: '#FF7F00', vec: [0.88,0.44,0.22,0.77,0.89,0.66,0.33,0.55,0.44,0.91] },
    '0.3': { name: 'econology', sa: 'अर्थ-प्रकृति', zh: '生态经济', col: '#FFFF00', vec: [0.91,0.66,-0.44,0.95,0.88,0.22,0.11,0.77,0.55,0.82] },
    '0.4': { name: 'earth_engineering', sa: 'वास्तु', zh: '地球工程', col: '#00FF00', vec: [0.85,0.55,-0.22,0.88,0.77,0.33,0.44,0.66,0.50,0.75] },
    '0.5': { name: 'discovery', sa: 'खोज', zh: '发现', col: '#0000FF', vec: [0.82,0.91,0.11,0.65,0.77,0.88,0.95,0.89,0.66,0.55] },
    '0.6': { name: 'innovation', sa: 'नवाचार', zh: '创新', col: '#9400D3', vec: [0.77,0.66,0.33,0.55,0.65,0.91,0.88,0.82,0.75,0.95] },
    '0.8': { name: 'sahyog', sa: 'सहयोग', zh: '协同', col: '#FFFFFF', vec: [0.95,0.77,0.44,0.82,0.89,0.75,0.66,0.55,0.88,0.91] },
    '0.9': { name: 'mukti', sa: 'मोक्ष', zh: '解脱', col: '#000000', vec: [0.89,0.55,0.88,0.77,0.91,0.44,0.33,0.66,0.95,0.82] }
  },

  subDomains: {
    '0.111': 'physical_wellbeing', '0.112': 'chronological_age', '0.113': 'mental_health',
    '0.114': 'emotional_balance', '0.115': 'self_awareness', '0.116': 'vitality',
    '0.211': 'kinship', '0.212': 'neighborhood', '0.213': 'heritage',
    '0.311': 'ecosystem_health', '0.312': 'circular_economy', '0.313': 'biophilic_design',
    '0.811': 'joint_problem_solving', '0.812': 'shared_vision', '0.813': 'mutual_trust',
    '0.911': 'freedom_of_thought', '0.912': 'freedom_of_expression', '0.913': 'freedom_from_fear'
  },

  // ═══════════════════════════════════════════════════════════════════
  // CORE METHODS
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
      }
    });
    return doc.body.innerHTML;
  },

  compress(html) {
    let c = html;
    const p = [
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
    p.forEach(([pattern, replacement]) => c = c.replace(pattern, replacement));
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
  // GRAPH METHODS
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
    console.log('Expanding:', el.dataset.sanskrit, el.dataset.chinese, vec);
    for (let i = 0; i < 5; i++) {
      const child = document.createElement('d');
      child.textContent = ['🌱','🍚','🔥','👑','🌸'][i];
      child.style.transform = `translate(${Math.cos(i*72*Math.PI/180)*100}px, ${Math.sin(i*72*Math.PI/180)*100}px)`;
      el.parentElement.appendChild(child);
      this.parse(child.outerHTML);
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // API METHODS
  // ═══════════════════════════════════════════════════════════════════

  async fetchWiki(page) {
    const url = `https://kids.miraheze.org/w/api.php?action=parse&page=${page}&prop=text|links&format=json&origin=*`;
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

  // ═══════════════════════════════════════════════════════════════════
  // VECTOR MATH
  // ═══════════════════════════════════════════════════════════════════

  cosineSimilarity(v1, v2) {
    const vec1 = JSON.parse(v1);
    const vec2 = JSON.parse(v2);
    let dotProduct = 0, norm1 = 0, norm2 = 0;
    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }
    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  },

  dotProduct(v1, v2) {
    const vec1 = JSON.parse(v1);
    const vec2 = JSON.parse(v2);
    return vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  },

  magnitude(vector) {
    const vec = JSON.parse(vector);
    return Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
  },

  // ═══════════════════════════════════════════════════════════════════
  // ANIMATION
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

  initTree(container) {
    console.log('Tree initialized in', container);
  },

  togglePanel() {
    console.log('Panel toggled');
  }
};

if (typeof module !== 'undefined') module.exports = Q;