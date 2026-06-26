/**
 * 🌌 KNOWLEDGE GALAXY - Main Script
 * Loads from: https://bhearth.github.io/khela/galaxy.js
 * 
 * Flow:
 * 1. Fetch pre-computed JSON from Kids:KnowledgeGraphData
 * 2. If found → render AI-generated icons
 * 3. If not found → render local wiki links (fallback)
 * 4. Show milestone debug log
 */

(function() {
    'use strict';
    
    const GRAPH_DATA_PAGE = 'Kids:KnowledgeGraphData';
    const pageTitle = mw.config.get('wgPageName').replace(/_/g, ' ');
    
    // Fetch the pre-computed graph
    fetch(`/wiki/${encodeURIComponent(GRAPH_DATA_PAGE)}?action=raw`)
        .then(r => r.json())
        .then(data => {
            const pageData = data.pages?.[pageTitle];
            if (pageData) {
                renderAIGraph(pageData);
            } else {
                renderLocalFallback();
            }
        })
        .catch(() => renderLocalFallback());
    
    function renderAIGraph(data) {
        // Render the beautiful icon grid with AI-generated connections
        // [Full rendering code from previous message]
    }
    
    function renderLocalFallback() {
        // Extract wiki links and categories from current page
        // Render them as icons
        // [Full fallback code from previous message]
    }
})();
