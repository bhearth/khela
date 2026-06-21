/**
 * display.js v2.0 - The Earth 00 OS Big Bang Trigger & JSON Bridge
 * Replaces the old Pentagon Widget with the "Golden Dot".
 * Connects the UI to the 3D Universe (v4.html) and the GitHub JSON Mesh.
 */
(function() {
    'use strict';

    // ==========================================
    // 1. CONFIGURATION & GITHUB MESH LINKS
    // ==========================================
    const CONFIG = {
        githubBase: 'https://bhearth.github.io/khela/',
        upiID: 'krishna.bh.earth@upi',
        qrURL: 'https://raw.githubusercontent.com/krishnabhearth-svg/Kraizen-Journal/main/upi%20pay%20qr%20code.jpeg'
    };

    // Global State for the Mesh Data
    window.KhelaMesh = {
        rootDomains: [],
        symbols: {},
        userLocation: 'Earth',
        isUniverseAwake: false
    };

    // ==========================================
    // 2. THE GOLDEN DOT (The Seed)
    // ==========================================
    const dot = document.createElement('div');
    dot.id = 'khela-golden-dot';
    dot.style.cssText = `
        position: fixed; bottom: 40px; right: 40px; z-index: 999999;
        width: 24px; height: 24px; background: #fbbf24; border-radius: 50%;
        box-shadow: 0 0 20px 8px rgba(251, 191, 36, 0.6);
        cursor: pointer; transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        animation: khela-pulse 3s infinite;
    `;
    
    // Inject CSS Animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes khela-pulse {
            0%, 100% { box-shadow: 0 0 20px 8px rgba(251, 191, 36, 0.6); transform: scale(1); }
            50% { box-shadow: 0 0 35px 15px rgba(251, 191, 36, 0.9); transform: scale(1.1); }
        }
        @keyframes khela-fadeOut { to { opacity: 0; transform: scale(0); pointer-events: none; } }
        #khela-cosmic-panel {
            position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 999998;
            background: rgba(5, 5, 8, 0.85); backdrop-filter: blur(20px);
            border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 24px;
            padding: 16px 24px; display: none; align-items: center; gap: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.8); font-family: system-ui, sans-serif;
            transition: all 0.5s ease;
        }
        #khela-cosmic-panel.active { display: flex; }
        .khela-btn {
            background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
            color: #e6e1e5; width: 50px; height: 50px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 24px; cursor: pointer; transition: 0.3s;
        }
        .khela-btn:hover { background: rgba(251, 191, 36, 0.2); border-color: #fbbf24; transform: translateY(-5px); }
        .khela-btn.voice.listening { background: rgba(251, 191, 36, 0.4); animation: khela-pulse 1s infinite; }
    `;
    document.head.appendChild(style);
    document.body.appendChild(dot);

    // ==========================================
    // 3. THE COSMIC PANEL (The Old Widget Reborn)
    // ==========================================
    const panel = document.createElement('div');
    panel.id = 'khela-cosmic-panel';
    panel.innerHTML = `
        <button class="khela-btn" id="btn-dice" title="Roll 5W1H Singularity Dice">🎲</button>
        <button class="khela-btn" id="btn-wiki" title="Random Kids Wiki Dive">📚</button>
        <button class="khela-btn" id="btn-map" title="Find Local Gathering Point">🗺️</button>
        <button class="khela-btn voice" id="btn-voice" title="Speak Command">🎙️</button>
        <button class="khela-btn" id="btn-upi" title="Nourish the Earth Mesh">🌱</button>
        <div id="khela-status" style="color: #14b8a6; font-size: 0.8rem; letter-spacing: 1px; min-width: 150px;">📍 Detecting Coordinates...</div>
    `;
    document.body.appendChild(panel);

    // ==========================================
    // 4. THE BIG BANG TRIGGER (Event Bus)
    // ==========================================
    dot.addEventListener('click', async () => {
        if (window.KhelaMesh.isUniverseAwake) return;
        
        // 1. Haptic & Audio Feedback
        if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
        playTone(600, 0.3, 'triangle');

        // 2. Collapse the Dot
        dot.style.animation = 'khela-fadeOut 0.8s forwards';

        // 3. FIRE THE BIG BANG EVENT (v4.html listens for this!)
        window.dispatchEvent(new CustomEvent('khela:bigbang:init'));
        window.KhelaMesh.isUniverseAwake = true;

        // 4. Fetch the JSON Mesh from GitHub
        await fetchMeshData();

        // 5. Reveal the Cosmic Panel (The Controls)
        setTimeout(() => {
            panel.classList.add('active');
            detectLocation();
        }, 1000);
    });

    // ==========================================
    // 5. JSON FETCHING ENGINE (The Bridge)
    // ==========================================
    async function fetchMeshData() {
        try {
            console.log("[Khela OS] Fetching Root Domains (1.json)...");
            const res1 = await fetch(`${CONFIG.githubBase}1.json`);
            const data1 = await res1.json();
            window.KhelaMesh.rootDomains = Object.entries(data1.domains).map(([code, info]) => ({
                code, name: info.name, vector: info.vector, icon: '🪐' // Default icon
            }));

            console.log("[Khela OS] Fetching Symbol Library (symbol1.json)...");
            const res2 = await fetch(`${CONFIG.githubBase}symbol1.json`);
            const data2 = await res2.json();
            // Flatten symbols for easy lookup
            window.KhelaMesh.symbols = data2; 

            console.log("[Khela OS] Mesh Loaded Successfully. Ready for 3D Rendering.", window.KhelaMesh.rootDomains);
            
            // Notify the 3D engine that data is ready
            window.dispatchEvent(new CustomEvent('khela:mesh:ready'));

        } catch (error) {
            console.error("[Khela OS] Failed to fetch JSON mesh. Check GitHub Pages URL.", error);
        }
    }

    // ==========================================
    // 6. THE SINGULARITY CONTROLS (Old Widget Logic)
    // ==========================================
    // Dice Roll
    document.getElementById('btn-dice').addEventListener('click', () => {
        const actions = [
            {icon:'🌱', text:'Plant a seed where you stand.'},
            {icon:'🎵', text:'Sing one song for the earth.'},
            {icon:'🤝', text:'Help one person in your pincode.'},
            {icon:'💧', text:'Save a glass of water today.'},
            {icon:'📚', text:'Teach one word to a child.'},
            {icon:'🧘', text:'Sit in silence for 2 minutes.'}
        ];
        const q = actions[Math.floor(Math.random() * actions.length)];
        playTone(800, 0.2, 'square');
        if(navigator.vibrate) navigator.vibrate([50, 50, 100]);
        speak(`Your action: ${q.text}`);
        document.getElementById('khela-status').innerText = `${q.icon} ${q.text}`;
    });

    // Wiki Dive
    document.getElementById('btn-wiki').addEventListener('click', () => {
        playTone(1000, 0.2);
        speak('Opening the Kids Wiki knowledge mesh.');
        window.open('https://kids.miraheze.org/wiki/Special:Random', '_blank');
    });

    // Map / Komute
    document.getElementById('btn-map').addEventListener('click', () => {
        playTone(700, 0.2);
        speak('Finding local gathering points.');
        window.open(`https://www.openstreetmap.org/search?query=community%20center%20${encodeURIComponent(window.KhelaMesh.userLocation)}`, '_blank');
    });

    // UPI / Contribute
    document.getElementById('btn-upi').addEventListener('click', () => {
        playTone(500, 0.2);
        speak('Opening contribution QR code.');
        window.open(`upi://pay?pa=${CONFIG.upiID}&pn=EarthOrg&cu=INR`, '_blank');
    });

    // Voice Engine
    const SpeechRecognition = window.SpeechRecognition || window.webkit
