/**
 * mesh.js - The Semantic Engine & Mathematical Bridge
 * Connects the UI to the GitHub-hosted JSON Knowledge Mesh.
 */
const KhelaMesh = (function() {
    const BASE_URL = 'https://bhearth.github.io/khela/';
    const cache = {}; // In-memory cache to prevent redundant network calls

    // ==========================================
    // 1. THE FETCH MATHS (Loading the Mesh)
    // ==========================================
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

    // ==========================================
    // 2. THE DECIMAL MATHS (Tree Traversal)
    // ==========================================
    /**
     * The brilliant simplicity of the decimal hierarchy:
     * Parent: "1.8" (Length 3)
     * Child:  "1.81" (Length 4) -> Direct Child
     * Grandchild: "1.811" (Length 5) -> Not a direct child of 1.8
     */
    function getDirectChildren(parentCode, allNodes) {
        const parentLen = parentCode.length;
        return Object.keys(allNodes).filter(key => {
            // Must start with the parent code, and be exactly 1 character longer
            return key.startsWith(parentCode) && key.length === parentLen + 1;
        });
    }

    // ==========================================
    // 3. THE VECTOR MATHS (10D Dharma Resonance)
    // ==========================================
    /**
     * Calculates the Dot Product of two 10D vectors.
     * Returns a score indicating how aligned two concepts are.
     * (Ahimsa, Satya, Aparigraha, Prakriti, Rta, Vinaya, Shaurya, Viveka, Mukti, Seva)
     */
    function calculateResonance(vectorA, vectorB) {
        if (!vectorA || !vectorB || vectorA.length !== 10 || vectorB.length !== 10) return 0;
        let dotProduct = 0;
        for (let i = 0; i < 10; i++) {
            dotProduct += (vectorA[i] * vectorB[i]);
        }
        return dotProduct; // Higher score = higher semantic resonance
    }

    // ==========================================
    // 4. THE BIG BANG INIT (Fetching 1.json)
    // ==========================================
    async function initBigBang() {
        console.log("[KhelaMesh] Initiating Big Bang... Fetching Root Domains.");
        const rootDomains = await loadJSON('1.json');
        
        if (rootDomains && rootDomains.domains) {
            // Return the 9 domains to the UI to render the Solar System / Mandala
            return Object.keys(rootDomains.domains).map(code => ({
                code: code,
                name: rootDomains.domains[code].name,
                vector: rootDomains.domains[code].vector,
                languages: rootDomains.domains[code].languages
            }));
        }
        return [];
    }

    // ==========================================
    // 5. THE DRILL-DOWN (Fetching deeper nodes)
    // ==========================================
    async function drillDown(currentCode) {
        // Determine which file holds this code based on depth/structure
        // For Sahyog tree, it's 9.json. For general, it might be 2-8.json.
        // Here we simplify by checking the cached files or fetching 9.json as an example.
        let targetFile = '9.json'; 
        if (currentCode.startsWith('0.')) targetFile = '2.json'; // Example mapping
        
        const data = await loadJSON(targetFile);
        if (!data) return [];

        // Use Decimal Maths to find exact children
        const childrenCodes = getDirectChildren(currentCode, data.tree || data);
        
        return childrenCodes.map(code => ({
            code: code,
            name: data.tree ? data.tree[code] : code,
            // If the file has vector data, calculate resonance here
        }));
    }

    // Public API
    return {
        initBigBang,
        drillDown,
        calculateResonance,
        loadJSON
    };
})();