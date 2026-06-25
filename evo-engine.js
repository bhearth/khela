/**
 * evo-engine.js v2.0 - The Bulletproof EVOD Renderer
 * Reads .evo files. If network/local fetch fails, falls back to embedded Genesis DNA.
 */
const EVOD = (function() {
    'use strict';

    const BASE_URL = './'; // Assumes .evo files are in the same folder
    const cache = new Map();

    // ==========================================
    // 1. THE GENESIS FALLBACK (Embedded DNA)
    // If fetch fails, the universe still blooms using this data.
    // ==========================================
    const GENESIS_SEED = {
        seed: { id: "0.8", word: "sahyog", icon: "🤝" },
        nodes: [
            { id: "0.81", name: "collaboration", icon: "🤝" },
            { id: "0.82", name: "synthesis", icon: "🧬" },
            { id: "0.88", name: "sanyog", icon: "🌌" },
            { id: "0.888", name: "devotional_flute", icon: "🪈" },
            { id: "0.8881", name: "raga_yaman", icon: "🎵" }
        ]
    };

    // ==========================================
    // 2. THE LAZY LOADER
    // ==========================================
    async function loadEvo(nodeId) {
        if (cache.has(nodeId)) return cache.get(nodeId);

        try {
            // Attempt to fetch the .evo file
            const res = await fetch(`${BASE_URL}${nodeId}.evo`);
            if (!res.ok) throw new Error('File not found');
            const data = await res.json();
            cache.set(nodeId, data);
            return data;
        } catch (e) {
            console.warn(`[EVOD] Fetch failed for ${nodeId}.evo. Using Genesis Fallback.`);
            return GENESIS_SEED; // The Bulletproof Fallback
        }
    }

    // ==========================================
    // 3. THE FIBONACCI RENDERER (The Math)
    // ==========================================
    function renderFlower(evoData, container) {
        container.innerHTML = ''; 
        
        // 1. Render the Center Seed
        const seed = document.createElement('div');
        seed.className = 'evo-seed';
        seed.innerHTML = `<span class="icon">${evoData.seed.icon}</span><span class="word">${evoData.seed.word}</span>`;
        container.appendChild(seed);

        // 2. Render the Petals (Fibonacci / Golden Angle Math)
        const GOLDEN_ANGLE = 137.5; // Degrees
        evoData.nodes.forEach((node, i) => {
            const angle = i * GOLDEN_ANGLE;
            const radius = 90 + (i * 25); // Expanding outward
            
            const petal = document.createElement('div');
            petal.className = 'evo-petal';
            // CSS variables drive the 3D/2D positioning
            petal.style.setProperty('--angle', `${angle}deg`);
            petal.style.setProperty('--radius', `${radius}px`);
            petal.style.transitionDelay = `${i * 0.1}s`; // Staggered bloom
            
            petal.innerHTML = `<span class="icon">${node.icon}</span><span class="word">${node.name}</span>`;
            
            // Recursive Trigger
            if (node.load) {
                petal.addEventListener('click', () => {
                    if (navigator.vibrate) navigator.vibrate(30);
                    expandNode(node.load.replace('.evo', ''), container);
                });
            }
            
            container.appendChild(petal);
            
            // Trigger bloom animation
            setTimeout(() => petal.classList.add('bloom'), 50);
        });
    }

    // ==========================================
    // 4. RECURSIVE EXPANSION
    // ==========================================
    async function expandNode(nodeId, container) {
        container.innerHTML = `<div class="evo-loading">🌱 Growing ${nodeId}...</div>`;
        const nextEvo = await loadEvo(nodeId);
        if (nextEvo) renderFlower(nextEvo, container);
    }

    // ==========================================
    // 5. PUBLIC API
    // ==========================================
    return {
        init: async function(rootNodeId, containerId) {
            const container = document.getElementById(containerId);
            if(!container) return;
            
            container.innerHTML = `<div class="evo-loading">🌱 Awakening the Seed...</div>`;
            
            // Load the root .evo (or fallback)
            const rootEvo = await loadEvo(rootNodeId);
            if (rootEvo) {
                // Small delay for dramatic effect
                setTimeout(() => renderFlower(rootEvo, container), 300);
            }
        }
    };
})();
