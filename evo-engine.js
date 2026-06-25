/**
 * evo-engine.js - The EVOD (Evolutionary Object) Renderer
 * Reads .evo files and renders them as 3D Fibonacci Flowers.
 * Optimized for 3G mobile: Lazy-loads only what the user touches.
 */
const EVOD = (function() {
    'use strict';

    const BASE_URL = 'https://bhearth.github.io/khela/evo/';
    const cache = new Map(); // O(1) cache for loaded .evo files

    // ==========================================
    // 1. THE LAZY LOADER (3G Optimized)
    // ==========================================
    async function loadEvo(nodeId) {
        if (cache.has(nodeId)) return cache.get(nodeId);

        try {
            // Fetch the .evo file (Usually < 5KB)
            const res = await fetch(`${BASE_URL}${nodeId}.evo`);
            if (!res.ok) throw new Error(`Failed to load ${nodeId}.evo`);
            
            const data = await res.json();
            cache.set(nodeId, data);
            return data;
        } catch (e) {
            console.warn(`[EVOD] Fallback for ${nodeId}:`, e);
            return null;
        }
    }

    // ==========================================
    // 2. THE FIBONACCI RENDERER (The Flower)
    // ==========================================
    function renderFlower(evoData, container) {
        container.innerHTML = ''; // Clear previous state
        
        // 1. Render the Center Seed
        const seed = document.createElement('div');
        seed.className = 'evo-seed';
        seed.innerHTML = `<span class="icon">${evoData.seed.icon}</span><span class="word">${evoData.seed.word}</span>`;
        container.appendChild(seed);

        // 2. Render the Petals (Nodes) using Fibonacci Angle
        const GOLDEN_ANGLE = 137.5;
        evoData.nodes.forEach((node, i) => {
            const angle = i * GOLDEN_ANGLE;
            const radius = 80 + (i * 20); // Expanding radius
            
            const petal = document.createElement('div');
            petal.className = 'evo-petal';
            petal.style.setProperty('--angle', `${angle}deg`);
            petal.style.setProperty('--radius', `${radius}px`);
            petal.innerHTML = `<span class="icon">${node.icon}</span><span class="word">${node.name}</span>`;
            
            // 3. The Recursive Trigger (Lazy Load Next Layer)
            petal.addEventListener('click', () => {
                if (navigator.vibrate) navigator.vibrate(30);
                expandNode(node, container);
            });
            
            container.appendChild(petal);
        });
    }

    // ==========================================
    // 3. THE RECURSIVE EXPANSION (The Universe Grows)
    // ==========================================
    async function expandNode(node, container) {
        // Show loading state
        container.innerHTML = `<div class="evo-loading">🌱 Growing ${node.name}...</div>`;
        
        // Fetch the next .evo file
        const nextEvo = await loadEvo(node.id);
        
        if (nextEvo) {
            // Render the new flower
            renderFlower(nextEvo, container);
        } else {
            container.innerHTML = `<div class="evo-end">🌸 You have reached the edge of this branch. Plant a seed to grow it further.</div>`;
        }
    }

    // ==========================================
    // 4. PUBLIC API
    // ==========================================
    return {
        init: async function(rootNodeId, containerId) {
            const container = document.getElementById(containerId);
            container.innerHTML = `<div class="evo-loading">🌱 Awakening the Seed...</div>`;
            
            const rootEvo = await loadEvo(rootNodeId);
            if (rootEvo) {
                renderFlower(rootEvo, container);
            }
        },
        loadEvo,
        renderFlower
    };
})();
