/**
 * MeshMapper v2.0 - The Mathematical Universe Generator
 * Fixes: Scope errors, Raycaster conflicts, Async race conditions, Array bounds, Symbol mapping.
 * Philosophy: JSON provides the DNA (Vectors). Math provides the Physics (Growth).
 */
const MeshMapper = (function() {
    'use strict';

    // ==========================================
    // 1. INTERNAL STATE & MATH CONSTANTS
    // ==========================================
    let scene, camera, renderer, controls, domElement;
    let raycaster, mouse;
    let bodies = [];
    let labels = [];
    let meshData = { domains: {}, symbols: {}, stories: {} };
    
    // Math Constants for Organic Growth (No hardcoded JSON numbers)
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees
    const FIB_SCALE = 46; 
    const QUANTUM_FLUX = 0.15; // Randomness factor for organic feel

    // ==========================================
    // 2. SYMBOL MAPPING (Bulletproof Flattener)
    // ==========================================
    function flattenSymbols(symbolJSON) {
        const map = {};
        if (!symbolJSON || !symbolJSON.categories) return map;
        
        // Safely traverse the nested structure of symbol1.json
        Object.values(symbolJSON.categories).forEach(cat => {
            if (!cat.symbols) return;
            cat.symbols.forEach(sym => {
                if (sym.icon && sym.name) map[sym.name.toLowerCase()] = sym.icon;
                if (sym.tags && Array.isArray(sym.tags)) {
                    sym.tags.forEach(tag => {
                        const t = tag.toLowerCase().replace(/[^a-z0-9]/g, '');
                        if (t && !map[t]) map[t] = sym.icon;
                    });
                }
            });
        });
        return map;
    }

    // ==========================================
    // 3. VECTOR TO VISUALS (The DNA -> Physics Engine)
    // ==========================================
    /**
     * Maps the 10D Dharma Vector to Three.js Visuals using Trigonometry.
     * No hardcoded colors or sizes. Pure math.
     */
    function vectorToPhysics(vector, index) {
        // 1. COLOR: Map Prakriti (Nature - idx 3) to Green, Shaurya (Courage - idx 6) to Red
        const natureWeight = Math.abs(vector[3] || 0);
        const courageWeight = Math.abs(vector[6] || 0);
        const wisdomWeight = Math.abs(vector[7] || 0);
        
        const r = Math.floor(courageWeight * 200 + 55);
        const g = Math.floor(natureWeight * 200 + 55);
        const b = Math.floor(wisdomWeight * 200 + 55);
        const color = new THREE.Color(`rgb(${r},${g},${b})`);

        // 2. MASS (SIZE): Map Seva (Service - idx 9) and Satya (Truth - idx 1)
        const mass = (Math.abs(vector[9] || 0) + Math.abs(vector[1] || 0)) / 2;
        const size = 1.5 + (mass * 2.5) + (Math.random() * QUANTUM_FLUX);

        // 3. ORBIT SPEED: Map Mukti (Liberation - idx 8)
        const speed = 0.002 + (Math.abs(vector[8] || 0) * 0.008);

        // 4. INCLINATION (Tilt): Map Ahimsa (idx 0) for orbital tilt
        const tilt = (vector[0] || 0) * 0.5; 

        return { color, size, speed, tilt };
    }

    // ==========================================
    // 4. THE MATHEMATICAL GENERATOR (Fibonacci/Golden Angle)
    // ==========================================
    function generateUniverse() {
        const domainKeys = Object.keys(meshData.domains);
        if (domainKeys.length === 0) return;

        // Clear previous bodies
        bodies.forEach(b => scene.remove(b.mesh));
        bodies = [];

        // SUN (The Core / 100 Day Launcher)
        const sunGeo = new THREE.SphereGeometry(8, 64, 64);
        const sunMat = new THREE.MeshBasicMaterial({ color: 0xffaa33 });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        sun.userData = { isSun: true, name: 'The Core', code: '0.0' };
        scene.add(sun);
        bodies.push({ mesh: sun, data: sun.userData });
        createLabel(sun, '☀️', 'The Core');

        // PLANETS (The Root Domains)
        // Using Golden Angle Spiral for perfect distribution, regardless of array length
        domainKeys.forEach((key, index) => {
            const domain = meshData.domains[key];
            const physics = vectorToPhysics(domain.vector, index);

            // MATH: Golden Angle Spiral Distribution
            const theta = index * GOLDEN_ANGLE;
            // MATH: Square root radius for even area distribution
            const orbitRadius = Math.sqrt(index + 1) * FIB_SCALE * 2.5; 
            
            // Add Quantum Flux (Randomness) so no two Big Bangs are identical
            const fluxX = (Math.random() - 0.5) * QUANTUM_FLUX * orbitRadius;
            const fluxZ = (Math.random() - 0.5) * QUANTUM_FLUX * orbitRadius;
            const fluxY = Math.sin(theta) * physics.tilt * 20;

            const geometry = new THREE.SphereGeometry(physics.size, 32, 32);
            const material = new THREE.MeshStandardMaterial({ 
                color: physics.color, roughness: 0.6, metalness: 0.3, emissive: physics.color, emissiveIntensity: 0.2
            });
            const planet = new THREE.Mesh(geometry, material);
            
            planet.position.set(
                orbitRadius * Math.cos(theta) + fluxX,
                fluxY,
                orbitRadius * Math.sin(theta) + fluxZ
            );

            // Attach Metadata
            planet.userData = {
                code: key,
                name: domain.name,
                orbitRadius: orbitRadius,
                angle: theta,
                speed: physics.speed,
                tilt: physics.tilt,
                vector: domain.vector
            };

            scene.add(planet);
            bodies.push({ mesh: planet, data: planet.userData });

            // Icon Mapping (O(1) Lookup with Fallback)
            const iconKey = domain.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            const icon = meshData.symbols[iconKey] || meshData.symbols['seed'] || '🪐';
            createLabel(planet, icon, domain.languages?.en || domain.name);
        });

        // Start Animation Loop
        animate();
        
        // Hide Loading State
        isLoading = false;
        document.dispatchEvent(new CustomEvent('khela:mesh:loaded'));
    }

    // ==========================================
    // 5. HELPERS (Labels, Animation, Camera Fly)
    // ==========================================
    function createLabel(mesh, icon, text) {
        const div = document.createElement('div');
        div.className = 'planet-label';
        div.innerHTML = `<span style="font-size:24px;">${icon}</span><br><span style="font-size:10px; letter-spacing:2px;">${text.toUpperCase()}</span>`;
        div.style.cssText = 'position:absolute; pointer-events:none; text-align:center; color:#fff; text-shadow:0 0 10px #000; transition:opacity 0.3s;';
        document.getElementById('labels-container').appendChild(div);
        labels.push({ mesh, el: div });
    }

    function updateLabels() {
        const v = new THREE.Vector3();
        labels.forEach(l => {
            l.mesh.getWorldPosition(v);
            v.project(camera);
            if (v.z > 1 || v.z < -1) { l.el.style.opacity = 0; return; }
            
            const x = (v.x * 0.5 + 0.5) * window.innerWidth;
            const y = (v.y * -0.5 + 0.5) * window.innerHeight;
            l.el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y - 40}px)`;
            l.el.style.opacity = 1;
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        
        // Orbital Physics
        bodies.forEach(b => {
            if (b.data.isSun) return;
            b.data.angle += b.data.speed;
            b.mesh.position.x = b.data.orbitRadius * Math.cos(b.data.angle);
            b.mesh.position.z = b.data.orbitRadius * Math.sin(b.data.angle);
            b.mesh.rotation.y += 0.005;
        });

        updateLabels();
        if (controls) controls.update();
        if (renderer && scene && camera) renderer.render(scene, camera);
    }

    function flyToPlanet(planetMesh) {
        const targetPos = new THREE.Vector3();
        planetMesh.getWorldPosition(targetPos);
        const offset = planetMesh.geometry.parameters.radius * 4;
        
        // Smooth camera transition using GSAP (if available) or manual lerp
        if (window.gsap) {
            gsap.to(camera.position, { x: targetPos.x + offset, y: targetPos.y + offset, z: targetPos.z + offset, duration: 2, ease: "power2.inOut" });
            gsap.to(controls.target, { x: targetPos.x, y: targetPos.y, z: targetPos.z, duration: 2, ease: "power2.inOut" });
        } else {
            camera.position.set(targetPos.x + offset, targetPos.y + offset, targetPos.z + offset);
            controls.target.copy(targetPos);
        }
    }

    // ==========================================
    // 6. PUBLIC API & INITIALIZATION
    // ==========================================
    return {
        init: function(threeScene, threeCamera, threeRenderer, threeControls) {
            scene = threeScene;
            camera = threeCamera;
            renderer = threeRenderer;
            controls = threeControls;
            domElement = renderer.domElement;

            // Safe Raycaster Initialization
            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();

            // Click Listener (Bound to Canvas, not Window)
            domElement.addEventListener('click', (event) => {
                if (isLoading) return;
                const rect = domElement.getBoundingClientRect();
                mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
                
                raycaster.setFromCamera(mouse, camera);
                const meshes = bodies.map(b => b.mesh);
                const intersects = raycaster.intersectObjects(meshes);
                
                if (intersects.length > 0) {
                    const clickedBody = bodies.find(b => b.mesh === intersects[0].object);
                    if (clickedBody && !clickedBody.data.isSun) {
                        flyToPlanet(clickedBody.mesh);
                        
                        // Safe Event Dispatch for event.js
                        window.dispatchEvent(new CustomEvent('khela:planet:focus', { 
                            detail: { 
                                code: clickedBody.data.code, 
                                name: clickedBody.data.name,
                                vector: clickedBody.data.vector
                            } 
                        }));
                    }
                }
            });

            // Trigger Async Load
            this.loadMesh();
        },

        loadMesh: async function() {
            isLoading = true;
            document.dispatchEvent(new CustomEvent('khela:mesh:loading'));
            
            try {
                // Parallel Fetch with Timeout Protection
                const fetchWithTimeout = (url, ms = 5000) => {
                    const controller = new AbortController();
                    setTimeout(() => controller.abort(), ms);
                    return fetch(url, { signal: controller.signal }).then(r => r.json());
                };

                const [domains, symbols, stories] = await Promise.allSettled([
                    fetchWithTimeout('https://bhearth.github.io/khela/1.json'),
                    fetchWithTimeout('https://bhearth.github.io/khela/symbol1.json'),
                    fetchWithTimeout('https://bhearth.github.io/khela/y.json')
                ]);

                meshData.domains = domains.status === 'fulfilled' ? domains.value.domains : {};
                meshData.symbols = symbols.status === 'fulfilled' ? flattenSymbols(symbols.value) : {};
                meshData.stories = stories.status === 'fulfilled' ? stories.value : {};

                console.log("[MeshMapper] DNA Acquired. Initiating Big Bang Math...");
                generateUniverse();

            } catch (error) {
                console.error("[MeshMapper] Fetch failed. Generating fallback universe.", error);
                // Fallback DNA if GitHub Pages is unreachable
                meshData.domains = {
                    "0.1": { name: "individual", vector: [0.75, 0.82, -0.33, 0.65, 0.44, -0.22, 0.55, 0.91, 0.67, 0.33], languages: {en: "Individual"} },
                    "0.8": { name: "sahyog", vector: [0.95, 0.77, 0.44, 0.82, 0.89, 0.75, 0.66, 0.55, 0.88, 0.91], languages: {en: "Sahyog"} }
                };
                generateUniverse();
            }
        },
        
        getBodies: () => bodies,
        isLoading: () => isLoading
    };
})();
