(function() {
    // 1. Inject CSS for Animations and Layout
    const style = document.createElement('style');
    style.innerHTML = `
        #khela-universe-hub {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 150px;
            height: 150px;
            z-index: 999999;
            font-family: sans-serif;
            pointer-events: none; /* Let clicks pass through empty space */
        }
        .khela-node {
            pointer-events: auto;
            position: absolute;
            transition: all 0.3s ease;
            cursor: pointer;
            fill: #d4af37;
        }
        /* The Center Golden Ratio */
        #khela-center-core {
            top: 50%;
            left: 50%;
            width: 60px;
            height: 60px;
            margin-top: -30px;
            margin-left: -30px;
            transform-origin: center center;
            animation: breathe-spin 8s infinite cubic-bezier(0.4, 0, 0.2, 1);
            filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.5));
        }
        #khela-center-core:hover {
            animation: fast-spin 2s infinite linear;
            filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));
        }
        /* Surrounding Icons */
        .khela-orbit-icon {
            width: 24px;
            height: 24px;
            fill: #fff;
            background: rgba(10, 10, 10, 0.8);
            border: 1px solid #d4af37;
            border-radius: 50%;
            padding: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        .khela-orbit-icon:hover {
            background: #d4af37;
            fill: #000;
            transform: scale(1.1);
        }
        
        /* Keyframes for the Golden Ratio */
        @keyframes breathe-spin {
            0% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.2) rotate(180deg); }
            100% { transform: scale(1) rotate(360deg); }
        }
        @keyframes fast-spin {
            0% { transform: scale(1.3) rotate(0deg); }
            100% { transform: scale(1.3) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // 2. Create the Hub Container
    const hub = document.createElement('div');
    hub.id = 'khela-universe-hub';

    // 3. The Golden Ratio SVG (Center)
    const goldenRatioSVG = `
        <svg id="khela-center-core" class="khela-node" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 a40 40 0 0 1 40 40 a40 40 0 0 1 -40 40 a40 40 0 0 1 -40 -40 a40 40 0 0 1 40 -40" fill="none" stroke="#d4af37" stroke-width="2"/>
            <path d="M50 10 A40 40 0 0 1 90 50 A24 24 0 0 1 66 74 A14.4 14.4 0 0 1 51.6 59.6 A8.64 8.64 0 0 1 60.24 50.96 A5.18 5.18 0 0 1 65.42 56.14" fill="none" stroke="#d4af37" stroke-width="4" stroke-linecap="round"/>
        </svg>
    `;

    // 4. The 5 Orbiting Nodes (Map, Wiki, Science, Code, Ear)
    // Angles for a perfect pentagon layout: -90 (top), -18, 54, 126, 198
    const radius = 55;
    const angles = [-90, -18, 54, 126, 198];
    
    // SVGs for the 5 elements
    const icons = [
        // Map (Overpass)
        `<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
        // Wiki (Knowledge)
        `<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>`,
        // Atom (OpenAlex/Science)
        `<svg viewBox="0 0 24 24"><path d="M12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-4.5c-3.1 0-5.8 1.4-7.5 3.5 1.7 2.1 4.4 3.5 7.5 3.5s5.8-1.4 7.5-3.5c-1.7-2.1-4.4-3.5-7.5-3.5zm0 12c-3.1 0-5.8-1.4-7.5-3.5 1.7-2.1 4.4-3.5 7.5-3.5s5.8 1.4 7.5 3.5c-1.7 2.1-4.4 3.5-7.5 3.5z"/></svg>`,
        // Code (GitHub/Talent)
        `<svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
        // Ear (OpenWhispr/Voice)
        `<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z"/></svg>`
    ];

    const actions = [
        "loadLocalRoots()", // Overpass
        "plantSeed()",      // Wiki
        "fetchScience()",   // OpenAlex
        "syncTalent()",     // GitHub
        "activateWhispr()"  // Ear / Voice
    ];

    let orbitHTML = '';
    for(let i=0; i<5; i++) {
        // Calculate coordinates for the circular orbit
        const rad = angles[i] * (Math.PI / 180);
        const x = 75 + radius * Math.cos(rad) - 20; // 75 is center of 150px box, 20 is half of 40px icon
        const y = 75 + radius * Math.sin(rad) - 20;
        
        orbitHTML += `
            <div class="khela-node khela-orbit-icon" style="top: ${y}px; left: ${x}px;" onclick="window.khelaAPI.${actions[i].replace('()','')}()">
                ${icons[i]}
            </div>
        `;
    }

    // 5. Assemble and Inject
    hub.innerHTML = orbitHTML + goldenRatioSVG;
    document.body.appendChild(hub);

    // 6. Define the Global Khela API for the 6 Codes
    window.khelaAPI = {
        activateWhispr: function() {
            console.log("Listening via OpenWhispr protocols...");
            // Initialize Web Speech API or OpenWhispr hooks here
        },
        loadLocalRoots: function() { console.log("Fetching Overpass OpenStreetMap data..."); },
        plantSeed: function() { console.log("Accessing Wiki Seed Data..."); },
        fetchScience: function() { console.log("Fetching OpenAlex Research..."); },
        syncTalent: function() { console.log("Syncing GitHub Repositories..."); },
        triggerCenter: function() {
            console.log("Golden Ratio Activated. Spinning up universal mesh.");
            // Action to occur when the center breathing spiral is clicked
        }
    };

    // Attach click to center
    document.getElementById('khela-center-core').onclick = window.khelaAPI.triggerCenter;

})();
