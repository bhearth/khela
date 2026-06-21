/**
 * integral.js - The Mandala Intent Loom & Dynamic Extension Builder
 * Part of the Khel.o Dis-play Universe (Earth 00 OS)
 * 
 * PHILOSOPHY: We do not force the user into a rigid menu. 
 * We provide a living, breathing Mandala of human intent.
 * The user drills down infinitely through the 5W1H axes, 
 * selects their resonance, and locks it in. 
 * Zero dependencies. Infinite drill-downs. Pure Nirmal Sahyog.
 * 
 * INTEGRATION: Dispatches 'khela:intent:woven' event for felicitation.js to consume.
 */

const IntegralEngine = (function() {
    'use strict';

    // ==========================================
    // 1. THE INFINITE DOMAIN TREE (Recursive Data)
    // ==========================================
    const INTENT_TREE = {
        what: {
            label: "What is the drive?", icon: "🎯", color: "#fbbf24",
            children: {
                learning: { label: "Learning", children: { course: "Courses", book: "Books", skill: "Skill Dev", language: "Languages" } },
                community: { label: "Community", children: { club: "Clubs", meetup: "Meetings", dao: "DAOs", volunteer: "Volunteering" } },
                connection: { label: "Connection", children: { dating: "Dating", friends: "Friends", kids: "Kids Play", elders: "Elder Care", mentor: "Mentorship" } },
                product: { label: "Products", children: { tool: "Tools", gear: "Gear", art: "Artifacts", software: "Software" } },
                event: { label: "Events", children: { workshop: "Workshops", festival: "Festivals", retreat: "Retreats" } }
            }
        },
        who: {
            label: "Who will you connect with?", icon: "🤝", color: "#10b981",
            children: {
                solo: { label: "Solo Journey", children: { introvert: "Deep Focus", extrovert: "Broad Exploration" } },
                peers: { label: "Peers & Friends", children: { same_age: "Same Age", cross_gen: "Cross-Generation" } },
                guidance: { label: "Guidance", children: { mentor: "Find a Mentor", mentee: "Mentor Someone", expert: "Consult an Expert" } },
                family: { label: "Family & Kin", children: { children: "With Kids", elders: "With Elders", couples: "Couples" } }
            }
        },
        where: {
            label: "Where is the source?", icon: "🗺️", color: "#3b82f6",
            children: {
                physical: { label: "Physical Space", children: { local: "Neighborhood", city: "City Hub", nature: "In Nature", travel: "Travel/Retreat" } },
                digital: { label: "Digital Space", children: { global: "Global Mesh", local_net: "Local Pincode", vr: "Virtual Reality" } },
                hybrid: { label: "Phygital (Both)", children: { synced: "Live Streamed", async: "Recorded & Physical" } }
            }
        },
        how: {
            label: "How will it happen?", icon: "⚙️", color: "#8b5cf6",
            children: {
                structured: { label: "Structured", children: { curriculum: "Syllabus/Course", certification: "Certified", schedule: "Fixed Schedule" } },
                fluid: { label: "Fluid/Organic", children: { drop_in: "Drop-in", self_paced: "Self-Paced", open_space: "Open Space Tech" } },
                collaborative: { label: "Collaborative", children: { peer_to_peer: "Peer-to-Peer", project_based: "Project-Based", hackathon: "Build-a-thon" } }
            }
        },
        why: {
            label: "Why are you seeking this?", icon: "💡", color: "#f43f5e",
            children: {
                growth: { label: "Personal Growth", children: { career: "Career/Wealth", health: "Health/Longevity", wisdom: "Wisdom/Spirit" } },
                impact: { label: "Global Impact", children: { ecology: "Earth Repair", society: "Social Justice", tech: "Open Source" } },
                joy: { label: "Pure Joy", children: { art: "Creative Expression", play: "Play/Recreation", rest: "Deep Rest" } }
            }
        },
        when: {
            label: "When is the rhythm?", icon: "⏳", color: "#0ea5e9",
            children: {
                immediate: { label: "Immediate", children: { now: "Right Now", today: "Today", weekend: "This Weekend" } },
                routine: { label: "Routine", children: { daily: "Daily Habit", weekly: "Weekly Circle", monthly: "Monthly Sync" } },
                epoch: { label: "Long-term", children: { season: "This Season", year: "Year-long", lifetime: "Lifetime Practice" } }
            }
        }
    };

    // ==========================================
    // 2. STATE MANAGEMENT
    // ==========================================
    const STATE = {
        activePod: null,      // Currently expanded 5W1H axis (e.g., 'what')
        currentPath: [],      // The drill-down path (e.g., ['learning', 'skill'])
        selections: {},       // The final locked choices { what: 'skill', who: 'mentor' }
        isLocked: false       // If the user has finalized their intent
    };

    // ==========================================
    // 3. UI INJECTION & STYLING
    // ==========================================
    function injectStyles() {
        const css = `
            #int-root { font-family: 'Inter', system-ui, sans-serif; color: #e6e1e5; --int-bg: #0f172a; --int-surface: rgba(30, 41, 59, 0.8); --int-border: rgba(255,255,255,0.1); }
            #int-root * { box-sizing: border-box; margin: 0; padding: 0; }
            
            /* The Mandala Trigger */
            .int-trigger { position: fixed; bottom: 24px; left: 24px; z-index: 999997; width: 64px; height: 64px; border-radius: 50%; background: var(--int-bg); border: 2px solid var(--int-border); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 8px 24px rgba(0,0,0,0.5); transition: 0.3s; font-size: 28px; }
            .int-trigger:hover { transform: scale(1.1); border-color: #fbbf24; }
            
            /* The Overlay */
            .int-overlay { position: fixed; inset: 0; z-index: 999998; background: rgba(0,0,0,0.85); backdrop-filter: blur(16px); display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.4s; padding: 20px; overflow-y: auto; }
            .int-overlay.active { opacity: 1; pointer-events: auto; }
            
            /* The 6 Pods (Mandala) */
            .int-mandala { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 600px; width: 100%; margin-bottom: 24px; }
            @media (max-width: 500px) { .int-mandala { grid-template-columns: repeat(2, 1fr); } }
            
            .int-pod { background: var(--int-surface); border: 2px solid var(--int-border); border-radius: 24px; padding: 24px 16px; text-align: center; cursor: pointer; transition: 0.3s; position: relative; overflow: hidden; }
            .int-pod:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.3); }
            .int-pod.active { border-color: var(--pod-color); background: rgba(255,255,255,0.05); box-shadow: 0 0 30px rgba(var(--pod-color-rgb), 0.2); }
            .int-pod.locked { opacity: 0.6; pointer-events: none; }
            .int-pod.locked::after { content: '✓'; position: absolute; top: 10px; right: 14px; font-size: 22px; font-weight: bold; color: var(--pod-color); }
            .int-pod .icon { font-size: 32px; margin-bottom: 8px; display: block; }
            .int-pod .label { font-size: 0.9rem; font-weight: 600; color: #fff; }
            .int-pod .selection { font-size: 0.75rem; color: var(--pod-color); margin-top: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; min-height: 18px; }

            /* The Drill-Down Explorer */
            .int-explorer { background: var(--int-bg); border: 1px solid var(--int-border); border-radius: 24px; padding: 24px; width: 100%; max-width: 600px; max-height: 40vh; overflow-y: auto; display: none; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
            .int-explorer.active { display: block; animation: int-slideUp 0.3s ease; }
            @keyframes int-slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            
            .int-breadcrumb { display: flex; gap: 8px; margin-bottom: 16px; font-size: 0.85rem; color: #94a3b8; flex-wrap: wrap; align-items: center; }
            .int-breadcrumb span.crumb { cursor: pointer; padding: 4px 10px; background: rgba(255,255,255,0.05); border-radius: 8px; transition: 0.2s; }
            .int-breadcrumb span.crumb:hover { background: rgba(255,255,255,0.15); color: #fff; }
            .int-breadcrumb span.separator { color: #475569; }
            
            .int-options { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }
            .int-option { background: rgba(255,255,255,0.03); border: 1px solid var(--int-border); border-radius: 16px; padding: 16px; text-align: center; cursor: pointer; transition: 0.2s; font-size: 0.9rem; font-weight: 500; color: #e2e8f0; display: flex; flex-direction: column; align-items: center; gap: 4px;}
            .int-option:hover { background: rgba(255,255,255,0.08); border-color: var(--pod-color); color: #fff; transform: scale(1.02); }
            .int-option .arrow { font-size: 0.7rem; opacity: 0.5; }

            /* Action Bar */
            .int-actions { display: flex; gap: 16px; margin-top: 24px; width: 100%; max-width: 600px; }
            .int-btn { flex: 1; padding: 16px; border-radius: 16px; border: none; font-size: 1rem; font-weight: 700; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; font-family: inherit; }
            .int-btn-primary { background: #fbbf24; color: #000; }
            .int-btn-primary:hover { background: #fcd34d; transform: translateY(-2px); }
            .int-btn-ghost { background: transparent; border: 1px solid var(--int-border); color: #94a3b8; }
            .int-btn-ghost:hover { background: rgba(255,255,255,0.05); color: #fff; }
        `;
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    function injectHTML() {
        const html = `
            <div id="int-root">
                <div class="int-trigger" id="int-trigger" title="Configure Your Intent" role="button" aria-label="Open Intent Mandala">🧭</div>
                
                <div class="int-overlay" id="int-overlay" role="dialog" aria-modal="true">
                    <div class="int-mandala" id="int-mandala"></div>
                    <div class="int-explorer" id="int-explorer"></div>
                    <div class="int-actions">
                        <button class="int-btn int-btn-ghost" id="int-reset">Reset All</button>
                        <button class="int-btn int-btn-primary" id="int-done">Weave Intent & Close</button>
                    </div>
                </div>
            </div>
        `;
        const root = document.createElement('div');
        root.innerHTML = html;
        document.body.appendChild(root);
    }

    // ==========================================
    // 4. RENDERING ENGINE (Recursive Drill-Down)
    // ==========================================
    function hexToRgb(hex) {
        const r = parseInt(hex.slice(1,3), 16);
        const g = parseInt(hex.slice(3,5), 16);
        const b = parseInt(hex.slice(5,7), 16);
        return `${r},${g},${b}`;
    }

    function renderMandala() {
        const container = document.getElementById('int-mandala');
        container.innerHTML = '';
        
        Object.keys(INTENT_TREE).forEach(key => {
            const pod = INTENT_TREE[key];
            const isSelected = !!STATE.selections[key];
            const isActive = STATE.activePod === key;
            
            const el = document.createElement('div');
            el.className = `int-pod ${isActive ? 'active' : ''} ${isSelected ? 'locked' : ''}`;
            el.style.setProperty('--pod-color', pod.color);
            el.style.setProperty('--pod-color-rgb', hexToRgb(pod.color));
            el.innerHTML = `
                <span class="icon">${pod.icon}</span>
                <div class="label">${pod.label}</div>
                <div class="selection">${isSelected ? STATE.selections[key].label : 'Select...'}</div>
            `;
            el.onclick = () => openPod(key);
            container.appendChild(el);
        });
    }

    function openPod(key) {
        if (STATE.selections[key]) return; // Already locked
        
        STATE.activePod = key;
        STATE.currentPath = [];
        renderMandala();
        renderExplorer();
    }

    function renderExplorer() {
        const explorer = document.getElementById('int-explorer');
        if (!STATE.activePod) {
            explorer.classList.remove('active');
            return;
        }
        
        explorer.classList.add('active');
        const podData = INTENT_TREE[STATE.activePod];
        
        explorer.style.setProperty('--pod-color', podData.color);
        explorer.style.setProperty('--pod-color-rgb', hexToRgb(podData.color));

        // Build Breadcrumb
        let currentNode = podData;
        let breadcrumbHTML = `<span class="crumb" onclick="IntegralEngine.drillUp(-1)">${podData.icon} ${podData.label}</span>`;
        
        STATE.currentPath.forEach((pathKey, index) => {
            currentNode = currentNode.children[pathKey];
            breadcrumbHTML += ` <span class="separator">›</span> <span class="crumb" onclick="IntegralEngine.drillUp(${index})">${currentNode.label}</span>`;
        });

        // Build Options
        let optionsHTML = '';
        if (currentNode.children) {
            Object.keys(currentNode.children).forEach(childKey => {
                const child = currentNode.children[childKey];
                const isLeaf = typeof child === 'string' || !child.children; 
                const label = isLeaf ? child : child.label;
                
                optionsHTML += `
                    <div class="int-option" onclick="IntegralEngine.drillDown('${childKey}', ${isLeaf})">
                        ${label} 
                        ${!isLeaf ? '<span class="arrow">›</span>' : ''}
                    </div>
                `;
            });
        }

        explorer.innerHTML = `
            <div class="int-breadcrumb">${breadcrumbHTML}</div>
            <div class="int-options">${optionsHTML}</div>
        `;
    }

    // ==========================================
    // 5. PUBLIC API
    // ==========================================
    return {
        init: function() {
            injectStyles();
            injectHTML();
            
            document.getElementById('int-trigger').onclick = () => {
                document.getElementById('int-overlay').classList.add('active');
                renderMandala();
            };
            
            document.getElementById('int-overlay').onclick = (e) => {
                if (e.target.id === 'int-overlay') {
                    document.getElementById('int-overlay').classList.remove('active');
                    STATE.activePod = null;
                    document.getElementById('int-explorer').classList.remove('active');
                }
            };

            document.getElementById('int-reset').onclick = () => {
                STATE.selections = {};
                STATE.activePod = null;
                STATE.currentPath = [];
                STATE.isLocked = false;
                renderMandala();
                document.getElementById('int-explorer').classList.remove('active');
            };

            document.getElementById('int-done').onclick = () => {
                STATE.isLocked = true;
                document.getElementById('int-overlay').classList.remove('active');
                
                const finalIntent = this.getIntent();
                console.log("🧭 Intent Woven:", finalIntent);
                
                // Dispatch event for felicitation.js to listen to and filter the mesh
                window.dispatchEvent(new CustomEvent('khela:intent:woven', { 
                    detail: finalIntent 
                }));
            };
        },

        drillDown: function(key, isLeaf) {
            STATE.currentPath.push(key);
            
            if (isLeaf) {
                // It's a leaf node! Lock the selection for this Pod.
                const label = this.getCurrentNode();
                const finalLabel = typeof label === 'string' ? label : label.label;
                
                STATE.selections[STATE.activePod] = { 
                    key: key, 
                    label: finalLabel, 
                    path: [...STATE.currentPath] 
                };
                STATE.activePod = null;
                STATE.currentPath = [];
                renderMandala();
                document.getElementById('int-explorer').classList.remove('active');
            } else {
                // It's a branch. Drill deeper.
                renderExplorer();
            }
        },

        drillUp: function(index) {
            if (index === -1) {
                STATE.currentPath = [];
            } else {
                STATE.currentPath = STATE.currentPath.slice(0, index + 1);
            }
            renderExplorer();
        },

        getCurrentNode: function() {
            let node = INTENT_TREE[STATE.activePod];
            STATE.currentPath.forEach(p => {
                if (node.children && node.children[p]) {
                    node = node.children[p];
                }
            });
            return node;
        },

        getIntent: function() {
            return { ...STATE.selections };
        },
        
        clearIntent: function() {
            STATE.selections = {};
            STATE.isLocked = false;
        }
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => IntegralEngine.init());
} else {
    IntegralEngine.init();
}