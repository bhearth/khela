/**
 * mesh.js - The Semantic Engine & Mathematical Bridge
 * Connects the UI to the GitHub-hosted JSON Knowledge Mesh
 */
const KhelaMesh = (function() {
    const BASE_URL = 'https://bhearth.github.io/khela/';
    const cache = {};

    async function loadJSON(filename) {
        if (cache[filename]) return cache[filename];
        try {
            const response = await fetch(`${BASE_URL}${filename}`);
            if (!response.ok) throw new Error(`Failed to load ${filename}`);
            const data = await response.json();
            cache[filename] = data;
            return data;
        } catch (error) {
            console.error(`[KhelaMesh] Error fetching ${filename}:`, error);
            return null;
        }
    }

    function getDirectChildren(parentCode, allNodes) {
        const parentLen = parentCode.length;
        return Object.keys(allNodes).filter(key => {
            return key.startsWith(parentCode) && key.length === parentLen + 1;
        });
    }

    function calculateResonance(vectorA, vectorB) {
        if (!vectorA || !vectorB || vectorA.length !== 10 || vectorB.length !== 10) return 0;
        let dotProduct = 0;
        for (let i = 0; i < 10; i++) {
            dotProduct += (vectorA[i] * vectorB[i]);
        }
        return dotProduct;
    }

    async function initBigBang() {
        console.log("[KhelaMesh] Initiating Big Bang... Fetching Root Domains.");
        const rootDomains = await loadJSON('1.json');
        if (rootDomains && rootDomains.domains) {
            return Object.keys(rootDomains.domains).map(code => ({
                code: code,
                name: rootDomains.domains[code].name,
                vector: rootDomains.domains[code].vector,
                languages: rootDomains.domains[code].languages
            }));
        }
        return [];
    }

    async function drillDown(currentCode) {
        let targetFile = '9.json';
        if (currentCode.startsWith('0.')) targetFile = '2.json';
        
        const data = await loadJSON(targetFile);
        if (!data) return [];

        const childrenCodes = getDirectChildren(currentCode, data.tree || data);
        
        return childrenCodes.map(code => ({
            code: code,
            name: data.tree ? data.tree[code] : code,
        }));
    }

    return {
        initBigBang,
        drillDown,
        calculateResonance,
        loadJSON
    };
})();
