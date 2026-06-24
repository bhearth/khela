// display.js - The Dis-play Widget (100px of Pure Resonance)
/*!
 * Khel.o Dis-play Universe 2086 - Embeddable Widget
 * A universal sensory bridge for 8.25 billion souls.
 * Material Design 3, Voice-Enabled, Screen-Reader Optimized.
 */
(function() {
    'use strict';
    
    // Extract UPI ID from data attribute
    const script = document.currentScript;
    const upiID = script.getAttribute('data-upi') || 'krishna.bh.earth@upi';
    
    // Create the 100x100px floating container
    const container = document.createElement('div');
    container.id = 'khela-display';
    container.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; z-index: 999999;
        width: 100px; height: 100px; cursor: pointer;
        transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    `;
    
    // The Pentagon Dice (SVG - scales perfectly, no image loading)
    container.innerHTML = `
        <svg viewBox="0 0 100 100" style="width:100%;height:100%;filter:drop-shadow(0 8px 20px rgba(234,179,8,0.4));">
            <defs>
                <linearGradient id="khela-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#fbbf24"/>
                    <stop offset="100%" style="stop-color:#f59e0b"/>
                </linearGradient>
            </defs>
            <!-- Pentagon Shape -->
            <polygon points="50,5 95,38 77,90 23,90 5,38" fill="url(#khela-grad)" stroke="#fff" stroke-width="2"/>
            <!-- The Dice Dots (5W1H) -->
            <circle cx="50" cy="35" r="6" fill="#fff" opacity="0.9"/>
            <circle cx="35" cy="55" r="6" fill="#fff" opacity="0.9"/>
            <circle cx="65" cy="55" r="6" fill="#fff" opacity="0.9"/>
            <circle cx="40" cy="75" r="6" fill="#fff" opacity="0.9"/>
            <circle cx="60" cy="75" r="6" fill="#fff" opacity="0.9"/>
            <!-- Breathing Animation -->
            <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="3s" repeatCount="indefinite" additive="sum"/>
        </svg>
    `;
    
    // Haptic feedback for disabled users (if supported)
    container.addEventListener('click', function() {
        if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
        openKhelaPopup();
    });
    
    // Hover effect
    container.addEventListener('mouseenter', () => container.style.transform = 'scale(1.1) rotate(15deg)');
    container.addEventListener('mouseleave', () => container.style.transform = 'scale(1)');
    
    document.body.appendChild(container);
    
    // The Popup (Accessible, No Text Required)
    function openKhelaPopup() {
        const popup = document.createElement('div');
        popup.id = 'khela-popup';
        popup.style.cssText = `
            position: fixed; inset: 0; z-index: 9999999;
            background: rgba(5,5,8,0.95); backdrop-filter: blur(20px);
            display: flex; align-items: center; justify-content: center;
            animation: fadeIn 0.3s ease;
        `;

    // Extract configuration from script tag
    const scriptTag = document.currentScript;
    const upiID = scriptTag.getAttribute('data-upi') || 'krishna.bh.earth@upi';
    const qrURL = 'https://raw.githubusercontent.com/krishnabhearth-svg/Kraizen-Journal/main/upi%20pay%20qr%20code.jpeg';

    // ==========================================
    // 1. MATERIAL DESIGN 3 CSS INJECTION
    // ==========================================
    const css = `
        #kp-root { font-family: 'Roboto', system-ui, -apple-system, sans-serif; color: #e6e1e5; --kp-primary: #fbbf24; --kp-surface: #141218; --kp-surface-container: #1D1B20; --kp-outline: #49454F; }
        #kp-root * { box-sizing: border-box; margin: 0; padding: 0; }
        
        // Detect location for physical gathering
        let locationText = 'Finding your gathering point...';
        let gatheringPoint = null;
        
        // Try to get location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const lat = pos.coords.latitude.toFixed(4);
                const lon = pos.coords.longitude.toFixed(4);
                // Query OpenStreetMap for nearest gathering point
                const query = `[out:json][timeout:5];(node["amenity"="place_of_worship"](around:2000,${lat},${lon});node["amenity"="school"](around:2000,${lat},${lon});node["leisure"="park"](around:2000,${lat},${lon}););out body 1;`;
                try {
                    const res = await fetch('https://overpass-api.de/api/interpreter', {method:'POST', body:query});
                    const data = await res.json();
                    if (data.elements && data.elements[0]) {
                        const place = data.elements[0];
                        gatheringPoint = place;
                        const name = place.tags?.name || 'The Open Ground';
                        locationText = `📍 Gather at: ${name}`;
                        document.getElementById('khela-location').innerHTML = locationText;
                    }
                } catch(e) {
                    document.getElementById('khela-location').innerHTML = '📍 Your balcony is your gathering point. Plant a seed.';
                }
            }, () => {
                document.getElementById('khela-location').innerHTML = '📍 Enable location to find your gathering point.';
            });
        /* The Pentagon Trigger (Fixed Click Area) */
        .kp-trigger {
            position: fixed; bottom: 24px; right: 24px; z-index: 999998;
            width: 80px; height: 80px; cursor: pointer;
            transition: transform 0.4s cubic-bezier(0.2, 0, 0, 1);
            filter: drop-shadow(0 8px 16px rgba(251, 191, 36, 0.4));
            outline: none; border-radius: 50%;
        }
        
        popup.innerHTML = `
            <div style="background:#131826; border:1px solid rgba(255,255,255,0.1); border-radius:32px; padding:40px; max-width:500px; width:90%; text-align:center; position:relative;">
                <button onclick="document.getElementById('khela-popup').remove()" style="position:absolute;top:16px;right:16px;background:none;border:none;color:#94a3b8;font-size:24px;cursor:pointer;">×</button>
                
                <!-- The Jumbling Logo -->
                <div style="font-family:'Space Grotesk',sans-serif; font-size:2rem; font-weight:700; background:linear-gradient(90deg,#fbbf24,#14b8a6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:24px;" id="khela-logo">khel.o</div>
                
                <!-- Location (Haptic/Visual for disabled) -->
                <div id="khela-location" style="font-size:1.1rem; color:#10b981; margin-bottom:32px; min-height:30px;">${locationText}</div>
                
                <!-- The 5W1H Dice Roll -->
                <button id="khela-roll" style="width:80px;height:80px;border-radius:50%;border:2px solid #fbbf24;background:rgba(251,191,36,0.1);color:#fbbf24;font-size:36px;cursor:pointer;margin-bottom:24px;transition:0.3s;">🎲</button>
                <div id="khela-question" style="font-size:1.2rem; color:#fff; margin-bottom:32px; min-height:60px;">Tap the dice to discover your action</div>
                
                <!-- Universal Icons (No text needed) -->
                <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:32px;">
                    <a href="https://kids.miraheze.org/wiki/Special:Random" target="_blank" style="text-decoration:none;">
                        <div style="font-size:2.5rem;">📚</div>
                        <div style="font-size:0.7rem; color:#94a3b8;">Wiki</div>
                    </a>
                    <a href="https://www.google.com/maps/search/community+center" target="_blank" style="text-decoration:none;">
                        <div style="font-size:2.5rem;">🗺️</div>
                        <div style="font-size:0.7rem; color:#94a3b8;">Map</div>
                    </a>
                    <a href="https://www.meetup.com/find/" target="_blank" style="text-decoration:none;">
                        <div style="font-size:2.5rem;">🤝</div>
                        <div style="font-size:0.7rem; color:#94a3b8;">Meet</div>
                    </a>
                    <div onclick="document.getElementById('khela-upi').style.display='block'" style="cursor:pointer;">
                        <div style="font-size:2.5rem;">🌱</div>
                        <div style="font-size:0.7rem; color:#94a3b8;">Give</div>
                    </div>
        .kp-trigger:hover, .kp-trigger:focus { transform: scale(1.1) rotate(15deg); }
        .kp-trigger:active { transform: scale(0.95); }
        .kp-trigger svg { width: 100%; height: 100%; pointer-events: none; } /* Fixes the partial click issue */

        /* M3 Overlay Backdrop */
        .kp-overlay {
            position: fixed; inset: 0; z-index: 999999;
            background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            display: flex; align-items: center; justify-content: center;
            opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        .kp-overlay.active { opacity: 1; pointer-events: auto; }

        /* M3 Modal Card */
        .kp-modal {
            background: var(--kp-surface); border: 1px solid var(--kp-outline);
            border-radius: 28px; padding: 24px; width: 90%; max-width: 420px;
            max-height: 85vh; overflow-y: auto; position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.7);
            transform: scale(0.9) translateY(20px); transition: transform 0.4s cubic-bezier(0.2, 0, 0, 1);
        }
        .kp-overlay.active .kp-modal { transform: scale(1) translateY(0); }

        /* Typography & Jumbler */
        .kp-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .kp-logo { font-size: 1.8rem; font-weight: 700; background: linear-gradient(90deg, #fbbf24, #14b8a6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-family: 'Space Grotesk', sans-serif; min-width: 120px; }
        .kp-close { background: var(--kp-surface-container); border: 1px solid var(--kp-outline); color: #e6e1e5; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 20px; transition: 0.2s; }
        .kp-close:hover { background: rgba(255,255,255,0.1); }

        /* Location & Status */
        .kp-loc { font-size: 0.85rem; color: #14b8a6; background: rgba(20, 184, 166, 0.1); padding: 6px 14px; border-radius: 20px; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 24px; border: 1px solid rgba(20, 184, 166, 0.2); }

        /* Action Grid */
        .kp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        .kp-btn {
            background: var(--kp-surface-container); border: 1px solid var(--kp-outline);
            border-radius: 16px; padding: 20px 12px; text-align: center; cursor: pointer;
            transition: 0.2s; display: flex; flex-direction: column; align-items: center; gap: 8px;
            color: #e6e1e5; font-size: 0.9rem; font-weight: 500;
        }
        .kp-btn:hover, .kp-btn:focus { background: rgba(251, 191, 36, 0.1); border-color: var(--kp-primary); outline: none; }
        .kp-btn .icon { font-size: 2rem; }
        .kp-btn.voice { grid-column: 1 / -1; background: rgba(251, 191, 36, 0.05); border-color: var(--kp-primary); color: var(--kp-primary); flex-direction: row; justify-content: center; font-weight: 700; }
        .kp-btn.voice.listening { animation: kp-pulse 1s infinite; background: rgba(251, 191, 36, 0.2); }
        @keyframes kp-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4); } 50% { box-shadow: 0 0 0 10px rgba(251, 191, 36, 0); } }

        /* Dice Result Area */
        .kp-result { background: var(--kp-surface-container); border-radius: 16px; padding: 20px; text-align: center; min-height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 24px; border: 1px solid var(--kp-outline); }
        .kp-result .emoji { font-size: 3rem; margin-bottom: 12px; }
        .kp-result .text { font-size: 1.1rem; color: #e6e1e5; line-height: 1.4; }

        /* UPI Contribution */
        .kp-upi { display: none; text-align: center; background: rgba(20, 184, 166, 0.05); border: 1px solid rgba(20, 184, 166, 0.2); border-radius: 16px; padding: 20px; }
        .kp-upi img { width: 180px; border-radius: 12px; margin-bottom: 12px; border: 1px solid var(--kp-outline); }
        .kp-upi .id { font-size: 0.8rem; color: #14b8a6; font-family: monospace; }

        /* Screen Reader Only */
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
    `;
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // ==========================================
    // 2. HTML INJECTION
    // ==========================================
    const root = document.createElement('div');
    root.id = 'kp-root';
    root.innerHTML = `
        <!-- The Pentagon Trigger -->
        <div class="kp-trigger" id="kp-trigger" role="button" tabindex="0" aria-label="Open Khel.o Dis-play menu. Tap to explore, roll the dice, or use voice commands.">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="kp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#fbbf24"/>
                        <stop offset="100%" style="stop-color:#f59e0b"/>
                    </linearGradient>
                </defs>
                <polygon points="50,5 95,38 77,90 23,90 5,38" fill="url(#kp-grad)" stroke="#fff" stroke-width="2"/>
                <circle cx="50" cy="35" r="5" fill="#fff" opacity="0.9"/>
                <circle cx="35" cy="55" r="5" fill="#fff" opacity="0.9"/>
                <circle cx="65" cy="55" r="5" fill="#fff" opacity="0.9"/>
                <circle cx="40" cy="75" r="5" fill="#fff" opacity="0.9"/>
                <circle cx="60" cy="75" r="5" fill="#fff" opacity="0.9"/>
            </svg>
        </div>

        <!-- The M3 Overlay -->
        <div class="kp-overlay" id="kp-overlay" role="dialog" aria-modal="true" aria-labelledby="kp-logo-text">
            <div class="kp-modal">
                <div class="kp-header">
                    <div class="kp-logo" id="kp-logo-text">khel.o</div>
                    <button class="kp-close" id="kp-close" aria-label="Close menu">&times;</button>
                </div>
                
                <!-- UPI Contribution (Hidden by default) -->
                <div id="khela-upi" style="display:none; background:rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.2); border-radius:16px; padding:20px; margin-top:16px;">
                    <p style="color:#10b981; font-size:0.9rem; margin-bottom:12px;">Scan to support the Earth Mesh</p>
                    <img src="https://raw.githubusercontent.com/krishnabhearth-svg/Kraizen-Journal/main/upi%20pay%20qr%20code.jpeg" alt="UPI QR" style="max-width:200px; width:100%; border-radius:12px; margin:0 auto; display:block;">
                    <p style="color:#94a3b8; font-size:0.75rem; margin-top:8px;">${upiID}</p>
                <div class="kp-loc" id="kp-loc">📍 Detecting your coordinates...</div>

                <!-- Action Grid -->
                <div class="kp-grid">
                    <button class="kp-btn" id="btn-dice" aria-label="Roll the 5W1H Singularity Dice">
                        <span class="icon">🎲</span>
                        <span>Roll Dice</span>
                    </button>
                    <button class="kp-btn" id="btn-wiki" aria-label="Open a random Kids Wiki page">
                        <span class="icon">📚</span>
                        <span>Kids Wiki</span>
                    </button>
                    <button class="kp-btn" id="btn-upi" aria-label="Support the Earth Mesh via UPI">
                        <span class="icon">🌱</span>
                        <span>Contribute</span>
                    </button>
                    <button class="kp-btn" id="btn-map" aria-label="Find local gathering points on OpenStreetMap">
                        <span class="icon">🗺️</span>
                        <span>Local Map</span>
                    </button>
                    
                    <!-- Voice Command Button -->
                    <button class="kp-btn voice" id="btn-voice" aria-label="Activate voice commands. Say: Roll dice, Open wiki, or Contribute.">
                        <span class="icon">🎙️</span>
                        <span>Speak Command (Try: "Roll Dice")</span>
                    </button>
                </div>

                <!-- Result Display -->
                <div class="kp-result" id="kp-result" aria-live="polite">
                    <div class="emoji">✨</div>
                    <div class="text">Tap the dice or speak a command to begin your Dis-play.</div>
                </div>

                <!-- UPI Section -->
                <div class="kp-upi" id="kp-upi">
                    <p style="color:#14b8a6; font-weight:600; margin-bottom:12px;">Scan to nourish the Earth Mesh</p>
                    <img src="${qrURL}" alt="UPI QR Code">
                    <div class="id">${upiID}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // The Dice Roll Logic
        document.getElementById('khela-roll').addEventListener('click', function() {
            this.style.animation = 'spin 0.5s linear';
            setTimeout(() => this.style.animation = '', 500);
        </div>
    `;
    document.body.appendChild(root);

    // ==========================================
    // 3. CORE ENGINE
    // ==========================================
    const app = {
        els: {},
        location: 'Earth',
        recognition: null,
        synth: window.speechSynthesis,
        audioCtx: null,

        init() {
            this.cacheDOM();
            this.bindEvents();
            this.startJumbler();
            this.detectLocation();
            this.initVoice();
        },

        cacheDOM() {
            this.els = {
                trigger: document.getElementById('kp-trigger'),
                overlay: document.getElementById('kp-overlay'),
                close: document.getElementById('kp-close'),
                loc: document.getElementById('kp-loc'),
                dice: document.getElementById('btn-dice'),
                wiki: document.getElementById('btn-wiki'),
                upi: document.getElementById('btn-upi'),
                map: document.getElementById('btn-map'),
                voice: document.getElementById('btn-voice'),
                result: document.getElementById('kp-result'),
                upiBox: document.getElementById('kp-upi'),
                logo: document.getElementById('kp-logo-text')
            };
        },

        bindEvents() {
            // Trigger Click & Keyboard (Accessibility)
            this.els.trigger.addEventListener('click', () => this.openOverlay());
            this.els.trigger.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.openOverlay(); } });
            
            // Close
            this.els.close.addEventListener('click', () => this.closeOverlay());
            this.els.overlay.addEventListener('click', (e) => { if(e.target === this.els.overlay) this.closeOverlay(); });
            document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && this.els.overlay.classList.contains('active')) this.closeOverlay(); });

            // Actions
            this.els.dice.addEventListener('click', () => this.rollDice());
            this.els.wiki.addEventListener('click', () => this.openWiki());
            this.els.upi.addEventListener('click', () => this.toggleUPI());
            this.els.map.addEventListener('click', () => this.openMap());
            this.els.voice.addEventListener('click', () => this.toggleVoice());
        },

        // --- Audio & Haptics ---
        playTone(freq, duration, type = 'sine') {
            try {
                if(!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = this.audioCtx.createOscillator();
                const gain = this.audioCtx.createGain();
                osc.type = type;
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
                osc.connect(gain);
                gain.connect(this.audioCtx.destination);
                osc.start();
                osc.stop(this.audioCtx.currentTime + duration);
            } catch(e) {}
        },

        speak(text) {
            if(this.synth) {
                this.synth.cancel();
                const utter = new SpeechSynthesisUtterance(text);
                utter.rate = 0.9;
                utter.pitch = 1;
                this.synth.speak(utter);
            }
        },

        // --- Overlay Management ---
        openOverlay() {
            this.els.overlay.classList.add('active');
            this.playTone(600, 0.2, 'triangle');
            if(navigator.vibrate) navigator.vibrate(30);
            // Trap focus for screen readers
            this.els.close.focus(); 
        },

        closeOverlay() {
            this.els.overlay.classList.remove('active');
            this.els.upiBox.style.display = 'none';
            this.playTone(400, 0.2, 'triangle');
            this.els.trigger.focus(); // Return focus to trigger
        },

        // --- Jumbler Engine ---
        startJumbler() {
            const words = ['ApI', 'Dis-play', 'khel.o', 'ba.che', 'e/arth'];
            const chars = '!<>-_\\/[]{}—=+*^?#~';
            let idx = 0;

            const run = () => {
                const target = words[idx];
                idx = (idx + 1) % words.length;
                let frame = 0;
                const interval = setInterval(() => {
                    let out = '';
                    for(let i=0; i<target.length; i++) {
                        if(i < frame) out += target[i];
                        else out += chars[Math.floor(Math.random() * chars.length)];
                    }
                    this.els.logo.textContent = out;
                    frame += 0.5;
                    if(frame >= target.length) {
                        this.els.logo.textContent = target;
                        clearInterval(interval);
                        setTimeout(run, 3000);
                    }
                }, 60);
            };
            run();
        },

        // --- Location ---
        async detectLocation() {
            try {
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                this.location = `${data.city}, ${data.country_name}`;
                this.els.loc.innerHTML = `📍 ${this.location}`;
            } catch(e) {
                this.els.loc.innerHTML = '📍 Earth Network';
            }
        },

        // --- Actions ---
        rollDice() {
            const questions = [
                {icon:'🌱', text:'Plant a seed where you stand'},
                {icon:'🎵', text:'Sing one song for the earth'},
                {icon:'🤝', text:'Help one person today'},
                {icon:'💧', text:'Save a glass of water'},
                {icon:'📚', text:'Teach one word to a child'},
                {icon:'🧘', text:'Sit in silence for 2 minutes'}
                { icon: '🌱', text: 'Plant a seed where you stand today.' },
                { icon: '🎵', text: 'Sing one song for the earth.' },
                { icon: '🤝', text: 'Help one person in your pincode.' },
                { icon: '💧', text: 'Save a glass of water today.' },
                { icon: '📚', text: 'Teach one word to a child.' },
                { icon: '🧘', text: 'Sit in silence for 2 minutes.' }
            ];
            const q = questions[Math.floor(Math.random() * questions.length)];
            document.getElementById('khela-question').innerHTML = `<span style="font-size:2rem;">${q.icon}</span><br>${q.text}`;

            if (navigator.vibrate) navigator.vibrate(100);
        });
        
        // Inject keyframes
        if (!document.getElementById('khela-styles')) {
            const style = document.createElement('style');
            style.id = 'khela-styles';
            style.textContent = `
                @keyframes fadeIn { from{opacity:0} to{opacity:1} }
                @keyframes spin { 100%{transform:rotate(360deg)} }
            `;
            document.head.appendChild(style);
            this.els.result.innerHTML = `<div class="emoji">${q.icon}</div><div class="text">${q.text}</div>`;
            this.playTone(800, 0.3, 'square');
            if(navigator.vibrate) navigator.vibrate([50, 50, 100]);
            
            // Speak for the blind
            this.speak(`Your action for today: ${q.text}`);
        },

        openWiki() {
            this.els.result.innerHTML = `<div class="emoji">📚</div><div class="text">Opening a random page from the Kids Wiki...</div>`;
            this.playTone(1000, 0.2);
            this.speak('Opening the Kids Wiki knowledge mesh.');
            
            const terms = ['ecology', 'technology', 'art', 'space', 'history', 'agriculture'];
            const term = terms[Math.floor(Math.random() * terms.length)];
            const url = `https://kids.miraheze.org/w/api.php?action=query&list=search&srsearch=${term}&format=json&origin=*`;
            
            fetch(url).then(r => r.json()).then(data => {
                if(data.query?.search?.length > 0) {
                    const r = data.query.search[Math.floor(Math.random() * data.query.search.length)];
                    window.open(`https://kids.miraheze.org/wiki/${encodeURIComponent(r.title.replace(/ /g, '_'))}`, '_blank');
                }
            }).catch(() => window.open('https://kids.miraheze.org', '_blank'));
        },

        toggleUPI() {
            const isHidden = this.els.upiBox.style.display === 'none' || !this.els.upiBox.style.display;
            this.els.upiBox.style.display = isHidden ? 'block' : 'none';
            if(isHidden) {
                this.playTone(500, 0.2);
                this.speak('Opening contribution QR code.');
            }
        },

        openMap() {
            this.els.result.innerHTML = `<div class="emoji">🗺️</div><div class="text">Finding gathering points near ${this.location}...</div>`;
            this.playTone(700, 0.2);
            this.speak(`Searching OpenStreetMap for community spaces in ${this.location}.`);
            window.open(`https://www.openstreetmap.org/search?query=community%20center%20${encodeURIComponent(this.location)}`, '_blank');
        },

        // --- Voice Engine (Web Speech API) ---
        initVoice() {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                this.els.voice.style.display = 'none'; // Hide if not supported
                return;
            }
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'en-US';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;

            this.recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.els.voice.classList.remove('listening');
                this.els.voice.innerHTML = '<span class="icon">🎙️</span><span>Speak Command</span>';
                
                this.playTone(1200, 0.2);
                
                if (command.includes('roll') || command.includes('dice')) this.rollDice();
                else if (command.includes('wiki') || command.includes('read')) this.openWiki();
                else if (command.includes('map') || command.includes('find')) this.openMap();
                else if (command.includes('give') || command.includes('upi') || command.includes('contribute')) this.toggleUPI();
                else {
                    this.els.result.innerHTML = `<div class="emoji">🤔</div><div class="text">I heard: "${command}". Try saying "Roll dice" or "Open wiki".</div>`;
                    this.speak(`I heard ${command}. Please try saying Roll dice or Open wiki.`);
                }
            };

            this.recognition.onerror = () => {
                this.els.voice.classList.remove('listening');
                this.els.voice.innerHTML = '<span class="icon">🎙️</span><span>Speak Command</span>';
            };
            
            this.recognition.onend = () => {
                this.els.voice.classList.remove('listening');
                this.els.voice.innerHTML = '<span class="icon">🎙️</span><span>Speak Command</span>';
            };
        },

        toggleVoice() {
            if (!this.recognition) return;
            
            if (this.els.voice.classList.contains('listening')) {
                this.recognition.stop();
            } else {
                this.els.voice.classList.add('listening');
                this.els.voice.innerHTML = '<span class="icon">🎙️</span><span>Listening...</span>';
                this.playTone(600, 0.1);
                this.speak('Listening for your command.');
                this.recognition.start();
            }
        }
    };

    // Boot when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }
})();
