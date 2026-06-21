/**
 * display.js v3.0 - The Genesis Engine (Dot to Universe)
 * Connects the Void to the GitHub JSON Mesh.
 * Uses Golden Angle Mathematics for natural node distribution.
 */
(function() {
    'use strict';

    // ==========================================
    // 1. CONFIG & STATE
    // ==========================================
    const CONFIG = {
        githubBase: 'https://bhearth.github.io/khela/',
        upiID: 'krishna.bh.earth@upi'
    };

    const STATE = {
        isBloomed: false,
        meshData: { domains: {}, symbols: {} },
        activeNode: null
    };

    // DOM Elements
    const seed = document.getElementById('seed');
    const universe = document.getElementById('universe');
    const sheet = document.getElementById('sheet');

    // ==========================================
    // 2. AUDIO & HAPTIC ENGINE (Accessibility)
    // ==========================================
    const AudioHaptic = {
        ctx: null,
        init() { if(!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); },
        playTone(freq, duration, type = 'sine') {
            try {
                this.init();
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = type; osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
                osc.connect(gain); gain.connect(this.ctx.destination);
                osc.start(); osc.stop(this.ctx.currentTime + duration);
            } catch(e) {}
        },
        vibrate(pattern) { if(navigator.vibrate) navigator.vibrate(pattern); },
        speak(text) {
            if(window.speechSynthesis) {
                window.speechSynthesis.cancel();
                const utter = new SpeechSynthesisUtterance(text);
                utter.rate = 0.9; utter.pitch = 1;
                window.speechSynthesis.speak(utter);
            }
        }
    };

    // ==========================================
    // 3. THE MESH FETCHER (Connecting to GitHub)
    // ==========================================
    async function fetchMesh() {
        try {
            // Fetch 1.json (Root Domains) and symbol1.json (Icons) in parallel
            const [res1, res2] = await Promise.all([
                fetch(`${CONFIG.githubBase}1.json`).then(r => r.json()),
                fetch(`${CONFIG.githubBase}symbol1.json`).then(r => r.json())
            ]);
            
            STATE.meshData.domains = res1.domains;
            
            // Flatten symbol1.json for O(1) lookup
            const symMap = {};
            Object.values(res2.categories || {}).forEach(cat => {
                cat.symbols.forEach(sym => {
                    symMap[sym.name] = sym.icon;
                    symMap[sym.concept] = sym.icon;
                });
            });
            STATE.meshData.symbols = symMap;
            
            return true;
        } catch (e) {
            console.warn("[Genesis] Fetch failed. Using Fallback DNA.", e);
            // Fallback DNA if offline
            STATE.meshData.domains = {
                "0.1": { name: "individual", vector: [0.75, 0.82, -0.33, 0.65, 0.44, -0.22, 0.55, 0.91, 0.67, 0.33] },
                "0.8": { name: "sahyog", vector: [0.95, 0.77, 0.44, 0.82, 0.89, 0.75, 0.66, 0.55, 0.88, 0.91] },
                "0.3": { name: "econology", vector: [0.91, 0.66, -0.44, 0.95, 0.88, 0.22, 0.11, 0.77, 0.55, 0.82] }
            };
            STATE.meshData.symbols = { individual: '🧠', sahyog: '🤝', econology: '🌍' };
            return true;
        }
    }

    // ==========================================
    // 4. THE GOLDEN ANGLE MATH (Natural Bloom)
    // ==========================================
    function renderUniverse() {
        const domains = Object.entries(STATE.meshData.domains);
        const total = domains.length;
        const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees
        const baseRadius = Math.min(window.innerWidth, window.innerHeight) * 0.15;

        domains.forEach(([code, data], index) => {
            // Golden Angle Math for perfect distribution
            const angle = index * GOLDEN_ANGLE;
            const radius = baseRadius * Math.sqrt(index + 1); 
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const node = document.createElement('div');
            node.className = 'node';
            node.style.setProperty('--x', `${x}px`);
            node.style.setProperty('--y', `${y}px`);
            node.style.transitionDelay = `${index * 0.08}s`; // Staggered bloom

            // Map Icon from symbol1.json
            const icon = STATE.meshData.symbols[data.name] || '✨';
            
            node.innerHTML = `
                <div class="node-icon">${icon}</div>
                <div class="node-word">${data.name}</div>
            `;

            node.addEventListener('click', () => openSingularity(code, data, icon));
            universe.appendChild(node);
        });

        // Trigger Bloom Animation
        setTimeout(() => {
            universe.classList.add('active');
            document.querySelectorAll('.node').forEach(n => n.classList.add('bloom'));
        }, 100);
    }

    // ==========================================
    // 5. THE SINGULARITY SHEET (Action Hub)
    // ==========================================
    function openSingularity(code, data, icon) {
        AudioHaptic.vibrate(30);
        AudioHaptic.playTone(600, 0.2, 'triangle');
        
        STATE.activeNode = { code, data, icon };
        
        document.getElementById('sheet-icon').innerText = icon;
        
        // Jumbler Effect for Title
        const titleEl = document.getElementById('sheet-title');
        const target = data.name.toUpperCase();
        let frame = 0;
        const chars = '!<>-_\\/[]{}—=+*^?#~';
        const interval = setInterval(() => {
            let out = '';
            for(let i=0; i<target.length; i++) {
                if(i < frame) out += target[i];
                else out += chars[Math.floor(Math.random() * chars.length)];
            }
            titleEl.textContent = out;
            frame += 0.5;
            if(frame >= target.length) { titleEl.textContent = target; clearInterval(interval); }
        }, 40);

        // Story (Placeholder for y.json integration)
        document.getElementById('sheet-story').innerText = `Resonance locked: ${code}. The physical mesh awaits your command.`;
        
        sheet.classList.add('active');
        
        // Dispatch Event for event.js / integral.js
        window.dispatchEvent(new CustomEvent('khela:node:selected', { detail: { code, data } }));
    }

    function closeSheet() {
        sheet.classList.remove('active');
        AudioHaptic.playTone(400, 0.2, 'triangle');
    }

    // ==========================================
    // 6. ACTION HANDLERS (The Dis-play Protocol)
    // ==========================================
    document.getElementById('act-dice').addEventListener('click', () => {
        const actions = [
            {icon:'🌱', text:'Plant a seed where you stand.'},
            {icon:'🎵', text:'Sing one song for the earth.'},
            {icon:'🤝', text:'Help one person in your pincode.'},
            {icon:'💧', text:'Save a glass of water today.'},
            {icon:'📚', text:'Teach one word to a child.'},
            {icon:'🧘', text:'Sit in silence for 2 minutes.'}
        ];
        const q = actions[Math.floor(Math.random() * actions.length)];
        AudioHaptic.vibrate([50, 50, 100]);
        AudioHaptic.playTone(800, 0.3, 'square');
        document.getElementById('sheet-story').innerText = `${q.icon} ${q.text}`;
        AudioHaptic.speak(q.text);
    });

    document.getElementById('act-wiki').addEventListener('click', () => {
        AudioHaptic.playTone(1000, 0.2);
        AudioHaptic.speak('Opening the Kids Wiki knowledge mesh.');
        window.open('https://kids.miraheze.org/wiki/Special:Random', '_blank');
    });

    document.getElementById('act-map').addEventListener('click', () => {
        AudioHaptic.playTone(700, 0.2);
        AudioHaptic.speak('Finding local gathering points.');
        // Trigger Event for event.js to handle KOMUTE routing
        window.dispatchEvent(new CustomEvent('khela:komute:summon', { detail: STATE.activeNode }));
        // Fallback if event.js is not loaded
        window.open(`https://www.openstreetmap.org/search?query=community%20center`, '_blank');
    });

    document.getElementById('act-seed').addEventListener('click', () => {
        AudioHaptic.playTone(500, 0.4, 'sine');
        document.getElementById('upi-overlay').classList.add('active');
    });

    // Close sheet on background tap
    document.addEventListener('click', (e) => {
        if (sheet.classList.contains('active') && !e.target.closest('#sheet') && !e.target.closest('.node')) {
            closeSheet();
        }
    });

    // ==========================================
    // 7. INITIALIZATION (The Big Bang Trigger)
    // ==========================================
    seed.addEventListener('click', async () => {
        if (STATE.isBloomed) return;
        STATE.isBloomed = true;
        
        AudioHaptic.vibrate([50, 30, 100]);
        AudioHaptic.playTone(400, 0.5, 'sine');
        AudioHaptic.speak('The mesh is awake.');

        seed.classList.add('bloom');
        
        // Fetch Data & Bloom
        await fetchMesh();
        renderUniverse();
        
        window.dispatchEvent(new CustomEvent('khela:bigbang:complete'));
    });

})();
