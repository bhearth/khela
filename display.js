// display.js - The Dis-play Widget (100px of Pure Resonance)
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
                </div>
                
                <!-- UPI Contribution (Hidden by default) -->
                <div id="khela-upi" style="display:none; background:rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.2); border-radius:16px; padding:20px; margin-top:16px;">
                    <p style="color:#10b981; font-size:0.9rem; margin-bottom:12px;">Scan to support the Earth Mesh</p>
                    <img src="https://raw.githubusercontent.com/krishnabhearth-svg/Kraizen-Journal/main/upi%20pay%20qr%20code.jpeg" alt="UPI QR" style="max-width:200px; width:100%; border-radius:12px; margin:0 auto; display:block;">
                    <p style="color:#94a3b8; font-size:0.75rem; margin-top:8px;">${upiID}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // The Dice Roll Logic
        document.getElementById('khela-roll').addEventListener('click', function() {
            this.style.animation = 'spin 0.5s linear';
            setTimeout(() => this.style.animation = '', 500);
            
            const questions = [
                {icon:'🌱', text:'Plant a seed where you stand'},
                {icon:'🎵', text:'Sing one song for the earth'},
                {icon:'🤝', text:'Help one person today'},
                {icon:'💧', text:'Save a glass of water'},
                {icon:'📚', text:'Teach one word to a child'},
                {icon:'🧘', text:'Sit in silence for 2 minutes'}
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
        }
    }
})();
