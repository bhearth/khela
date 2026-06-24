/* Khel.o Dis-play Widget - Embeddable on any site */
(function(){
    'use strict';
    const script=document.currentScript;
    const upiID=script.getAttribute('data-upi')||'krishna.bh.earth@upi';
    
    const container=document.createElement('div');
    container.id='khela-display';
    container.style.cssText='position:fixed;bottom:20px;right:20px;width:100px;height:100px;cursor:pointer;z-index:999999;transition:transform 0.3s';
    container.innerHTML=`
        <svg viewBox="0 0 100 100" style="width:100%;height:100%;filter:drop-shadow(0 8px 20px rgba(251,191,36,0.4))">
            <defs><linearGradient id="khg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#fbbf24"/><stop offset="100%" style="stop-color:#f59e0b"/></linearGradient></defs>
            <polygon points="50,5 95,38 77,90 23,90 5,38" fill="url(#khg)" stroke="#fff" stroke-width="2"/>
            <circle cx="50" cy="35" r="6" fill="#fff"/><circle cx="35" cy="55" r="6" fill="#fff"/><circle cx="65" cy="55" r="6" fill="#fff"/><circle cx="40" cy="75" r="6" fill="#fff"/><circle cx="60" cy="75" r="6" fill="#fff"/>
        </svg>`;
    
    container.addEventListener('click',()=>openPopup());
    container.addEventListener('mouseenter',()=>container.style.transform='scale(1.1) rotate(15deg)');
    container.addEventListener('mouseleave',()=>container.style.transform='scale(1)');
    document.body.appendChild(container);
    
    function openPopup(){
        if(navigator.vibrate)navigator.vibrate([50,30,50]);
        const popup=document.createElement('div');
        popup.id='khela-popup';
        popup.style.cssText='position:fixed;inset:0;z-index:9999999;background:rgba(5,5,8,0.95);backdrop-filter:blur(20px);display:flex;align-items:center;justify-content:center';
        popup.innerHTML=`
            <div style="background:#131826;border:1px solid rgba(255,255,255,0.1);border-radius:32px;padding:40px;max-width:500px;width:90%;text-align:center;position:relative">
                <button onclick="document.getElementById('khela-popup').remove()" style="position:absolute;top:16px;right:16px;background:none;border:none;color:#94a3b8;font-size:24px;cursor:pointer">×</button>
                <div style="font-family:'Space Grotesk';font-size:2rem;font-weight:700;background:linear-gradient(90deg,#fbbf24,#14b8a6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:24px">khel.o</div>
                <button id="khela-roll" style="width:80px;height:80px;border-radius:50%;border:2px solid #fbbf24;background:rgba(251,191,36,0.1);color:#fbbf24;font-size:36px;cursor:pointer;margin-bottom:24px">🎲</button>
                <div id="khela-question" style="font-size:1.2rem;color:#fff;margin-bottom:32px">Tap dice to discover action</div>
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
                    <a href="https://kids.miraheze.org/wiki/Special:Random" target="_blank" style="text-decoration:none"><div style="font-size:2.5rem">📚</div><div style="font-size:0.7rem;color:#94a3b8">Wiki</div></a>
                    <a href="https://google.com/maps" target="_blank" style="text-decoration:none"><div style="font-size:2.5rem">🗺️</div><div style="font-size:0.7rem;color:#94a3b8">Map</div></a>
                    <a href="https://meetup.com/find" target="_blank" style="text-decoration:none"><div style="font-size:2.5rem">🤝</div><div style="font-size:0.7rem;color:#94a3b8">Meet</div></a>
                    <div onclick="document.getElementById('khela-upi').style.display='block'" style="cursor:pointer"><div style="font-size:2.5rem">🌱</div><div style="font-size:0.7rem;color:#94a3b8">Give</div></div>
                </div>
                <div id="khela-upi" style="display:none;margin-top:20px;padding:20px;background:rgba(16,185,129,0.05);border-radius:12px">
                    <p style="color:#10b981;font-size:0.9rem">Scan to support Earth Mesh</p>
                    <img src="https://raw.githubusercontent.com/krishnabhearth-svg/Kraizen-Journal/main/upi%20pay%20qr%20code.jpeg" style="max-width:200px;width:100%;border-radius:12px;margin:10px 0">
                    <p style="color:#94a3b8;font-size:0.75rem">${upiID}</p>
                </div>
            </div>`;
        document.body.appendChild(popup);
        
        document.getElementById('khela-roll').addEventListener('click',function(){
            this.style.animation='spin 0.5s linear';
            setTimeout(()=>this.style.animation='',500);
            const actions=[
                {icon:'🌱',text:'Plant a seed where you stand'},
                {icon:'🎵',text:'Sing one song for earth'},
                {icon:'🤝',text:'Help one person today'},
                {icon:'💧',text:'Save a glass of water'},
                {icon:'📚',text:'Teach one word to a child'}
            ];
            const a=actions[Math.floor(Math.random()*actions.length)];
            document.getElementById('khela-question').innerHTML=`<span style="font-size:2rem">${a.icon}</span><br>${a.text}`;
            if(navigator.vibrate)navigator.vibrate(100);
        });
    }
    
    const style=document.createElement('style');
    style.textContent='@keyframes spin{100%{transform:rotate(360deg)}}';
    document.head.appendChild(style);
})();
