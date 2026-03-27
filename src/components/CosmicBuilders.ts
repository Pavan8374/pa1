import * as THREE from "three";

export const getCircleTexture = () => {
  if (typeof window === 'undefined') return null; // SSR safety
  let texture = (window as any).__circleTexture;
  if (!texture) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }
    texture = new THREE.CanvasTexture(canvas);
    (window as any).__circleTexture = texture;
  }
  return texture;
};

export const createHomeUniverse = (scene: THREE.Scene, position: THREE.Vector3) => {
  const group = new THREE.Group();
  group.position.copy(position);

  const contentGroup = new THREE.Group();
  contentGroup.position.z = -25; // Dramatic wide cinematic view
  group.add(contentGroup);

  // 1. Hyper-Realistic Star Core (White-Blue High Temperature)
  const coreGeo = new THREE.SphereGeometry(4, 64, 64);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x88ccff,
    emissiveIntensity: 5.0,
    metalness: 0,
    roughness: 1,
  });
  const sun = new THREE.Mesh(coreGeo, coreMat);
  contentGroup.add(sun);

  // Realistic Corona (Soft Volumetric Glow)
  const coronaGeo = new THREE.SphereGeometry(8, 64, 64);
  const coronaMat = new THREE.MeshBasicMaterial({
    color: 0x4488ff,
    transparent: true,
    opacity: 0.1,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  });
  const corona = new THREE.Mesh(coronaGeo, coronaMat);
  contentGroup.add(corona);

  // 2. High-Fidelity Solar Array Megastructure
  const structureGroup = new THREE.Group();
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x222222,
    emissive: 0x001122,
    metalness: 0.9,
    roughness: 0.2,
    side: THREE.DoubleSide
  });
  const strutMat = new THREE.MeshStandardMaterial({
    color: 0x444444,
    metalness: 1.0,
    roughness: 0.1
  });

  // Create orbiting solar panels
  const panelCount = 12;
  const panels = new THREE.Group();
  for(let i=0; i<panelCount; i++) {
    const angle = (i / panelCount) * Math.PI * 2;
    const r = 10;
    
    const panel = new THREE.Group();
    // The panel surface
    const surface = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 0.1), panelMat);
    panel.add(surface);
    
    // The connection strut
    const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4, 8), strutMat);
    strut.position.x = -2;
    strut.rotation.z = Math.PI / 2;
    panel.add(strut);

    panel.position.set(Math.cos(angle) * r, Math.sin(angle) * 2, Math.sin(angle) * r);
    panel.lookAt(0, 0, 0);
    panel.rotation.y += Math.PI / 8; // Tilted for realism
    panels.add(panel);
  }
  structureGroup.add(panels);

  // Orbital Docking Ring (Thin Lattice)
  const ringGeo = new THREE.TorusGeometry(15, 0.05, 16, 128);
  const ring = new THREE.Mesh(ringGeo, strutMat);
  ring.rotation.x = Math.PI/2;
  structureGroup.add(ring);
  
  contentGroup.add(structureGroup);

  // 3. Physically Accurate Accretion Dust (Thin & Grainy)
  const dustCount = 15000;
  const dPos = new Float32Array(dustCount * 3);
  const dCol = new Float32Array(dustCount * 3);
  for(let i=0; i<dustCount; i++) {
    const r = 12 + Math.pow(Math.random(), 2) * 30;
    const angle = Math.random() * Math.PI * 2;
    dPos[i*3] = Math.cos(angle) * r;
    dPos[i*3+1] = (Math.random() - 0.5) * 0.2; // Extremely thin physically
    dPos[i*3+2] = Math.sin(angle) * r;
    
    const color = new THREE.Color().setHSL(0.6, 0.8, 0.4 + Math.random() * 0.2);
    dCol[i*3] = color.r; dCol[i*3+1] = color.g; dCol[i*3+2] = color.b;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
  dustGeo.setAttribute('color', new THREE.BufferAttribute(dCol, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    size: 0.1, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.4, map: getCircleTexture()
  }));
  contentGroup.add(dust);

  // 4. Star Lights (Shadow-casting point lights)
  const sunLight = new THREE.PointLight(0x88ccff, 10, 100);
  contentGroup.add(sunLight);

  group.userData = { 
    type: 'home', 
    sun, corona, panels, dust,
    rotationSpeed: 0.0005 // Realistic, slow rotation
  };
  scene.add(group);
  return group;
};

export const createAboutUniverse = (scene: THREE.Scene, position: THREE.Vector3) => {
  const group = new THREE.Group();
  group.position.copy(position);

  const contentGroup = new THREE.Group();
  contentGroup.position.z = -15; 
  group.add(contentGroup);

  // 1. Central Pulsating Core (Supernova)
  const coreGeo = new THREE.SphereGeometry(4, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xaa44ff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  contentGroup.add(core);

  // 2. Volumetric Nebula Clouds
  const clouds = new THREE.Group();
  const cloudCount = 60;
  for(let i=0; i<cloudCount; i++) {
    const geo = new THREE.PlaneGeometry(12, 12);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.7 + Math.random() * 0.2, 0.8, 0.4),
      transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
    });
    const cloud = new THREE.Mesh(geo, mat);
    const dist = 5 + Math.random() * 10;
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.acos(Math.random() * 2 - 1);
    cloud.position.set(
      dist * Math.sin(theta) * Math.cos(phi),
      dist * Math.sin(theta) * Math.sin(phi),
      dist * Math.cos(theta)
    );
    cloud.lookAt(0, 0, 0);
    cloud.rotation.z = Math.random() * Math.PI;
    clouds.add(cloud);
  }
  contentGroup.add(clouds);

  // 3. Ejected Particle Streams
  const particleCount = 4000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);
  for(let i=0; i<particleCount; i++) {
    const r = 4 + Math.random() * 20;
    const angle = Math.random() * Math.PI * 2;
    const tilt = (Math.random() - 0.5) * 0.5;
    positions[i*3] = Math.cos(angle) * r;
    positions[i*3+1] = tilt * r;
    positions[i*3+2] = Math.sin(angle) * r;
    
    speeds[i] = 0.05 + Math.random() * 0.1;
    
    const c = new THREE.Color().setHSL(0.8 + Math.random() * 0.15, 0.9, 0.6);
    colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
  }
  const partGeo = new THREE.BufferGeometry();
  partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  partGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const partMat = new THREE.PointsMaterial({ 
    size: 0.3, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.7, map: getCircleTexture(), alphaTest: 0.01 
  });
  const points = new THREE.Points(partGeo, partMat);
  contentGroup.add(points);

  group.userData = { type: 'about', core, clouds, points, rotationSpeed: 0.002 };
  scene.add(group);
  return group;
};

export const createSkillsUniverse = (scene: THREE.Scene, position: THREE.Vector3) => {
  const group = new THREE.Group();
  group.position.copy(position);

  const contentGroup = new THREE.Group();
  contentGroup.position.z = -20; 
  group.add(contentGroup);

  // 1. Extreme Neutron Pulsar Star
  const pulsarGeo = new THREE.SphereGeometry(2, 32, 32);
  const pulsarMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, blending: THREE.AdditiveBlending });
  const pulsar = new THREE.Mesh(pulsarGeo, pulsarMat);
  contentGroup.add(pulsar);

  // 2. High-Energy Jet Beams
  const createBeam = (isTop: boolean) => {
    const beamCount = 3000;
    const pos = new Float32Array(beamCount * 3);
    const col = new Float32Array(beamCount * 3);
    for(let i=0; i<beamCount; i++) {
      const y = Math.pow(Math.random(), 2.0) * 40 * (isTop ? 1 : -1);
      const angle = Math.random() * Math.PI * 2;
      const r = (Math.abs(y) * 0.05) + Math.random() * 0.2;
      pos[i*3] = Math.cos(angle) * r;
      pos[i*3+1] = y;
      pos[i*3+2] = Math.sin(angle) * r;
      
      const c = new THREE.Color().setHSL(0.5 + Math.random() * 0.1, 1, 0.7);
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
    }
    const bGeo = new THREE.BufferGeometry();
    bGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    bGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return new THREE.Points(bGeo, new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.8, map: getCircleTexture() }));
  };
  const beamTop = createBeam(true);
  const beamBot = createBeam(false);
  contentGroup.add(beamTop);
  contentGroup.add(beamBot);

  // 3. Gravitational Wave Compression Rings
  const ringGroup = new THREE.Group();
  for(let i=0; i<5; i++) {
    const ringGeo = new THREE.TorusGeometry(8 + i * 4, 0.05, 16, 128);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x0088ff, transparent: true, opacity: 0.3 / (i + 1), blending: THREE.AdditiveBlending });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI/2;
    ringGroup.add(ring);
  }
  contentGroup.add(ringGroup);

  group.userData = { type: 'skills', pulsar, beamTop, beamBot, ringGroup, rotationSpeed: 0.05 };
  scene.add(group);
  return group;
};

export const createProjectsUniverse = (scene: THREE.Scene, position: THREE.Vector3) => {
  const group = new THREE.Group();
  group.position.copy(position);

  const contentGroup = new THREE.Group();
  contentGroup.position.z = -20; // Perfect framing distance
  
  // Angle for dramatic Pinterest-like cinematic X-shape
  contentGroup.rotation.x = Math.PI / 3;
  contentGroup.rotation.z = Math.PI / 6;
  group.add(contentGroup);

  // 1. Sleek, Optimized Spiral Accretion Disk
  const diskParticleCount = 8000;
  const diskPositions = new Float32Array(diskParticleCount * 3);
  const diskColors = new Float32Array(diskParticleCount * 3);
  const diskAngles = new Float32Array(diskParticleCount);
  const spiralArms = 4;
  
  for (let i = 0; i < diskParticleCount; i++) {
    // Golden ratio swirling
    const t = Math.pow(Math.random(), 1.5); // Concentrated at center
    const radius = t * 18; 
    
    // Create distinct spiral arms with some scatter
    const armOffset = ((i % spiralArms) / spiralArms) * Math.PI * 2;
    // Tighter winding at the core, looser at the edges
    const spin = radius * 0.8; 
    const spread = (1 - t) * (Math.random() - 0.5) * 3.0; // Tighter at core
    
    const angle = armOffset + spin + spread;
    const height = (Math.random() - 0.5) * (1 - t) * 1.5; 
    
    diskPositions[i * 3] = Math.cos(angle) * radius;
    diskPositions[i * 3 + 1] = height * Math.cos(angle * 2); // Wavy disk effect
    diskPositions[i * 3 + 2] = Math.sin(angle) * radius;
    
    diskAngles[i] = angle;
    
    // Extremely aesthetic cool-blue to bright-cyan to hot-yellow temperature mapping
    const color = new THREE.Color();
    if (radius < 3) {
      color.setRGB(1, 1, 0.8); // White-yellow intense core
    } else if (radius < 9) {
      color.setRGB(1, 1, 0.5).lerp(new THREE.Color(0.0, 0.8, 1), (radius - 3) / 6); // Yellow -> glowing cyan
    } else {
      color.setRGB(0.0, 0.8, 1).lerp(new THREE.Color(0.02, 0.05, 0.2), (radius - 9) / 9); // Cyan -> deep space
    }
    
    diskColors[i * 3] = color.r;
    diskColors[i * 3 + 1] = color.g;
    diskColors[i * 3 + 2] = color.b;
  }
  
  const diskGeo = new THREE.BufferGeometry();
  diskGeo.setAttribute('position', new THREE.BufferAttribute(diskPositions, 3));
  diskGeo.setAttribute('color', new THREE.BufferAttribute(diskColors, 3));
  diskGeo.setAttribute('aAngle', new THREE.BufferAttribute(diskAngles, 1));
  
  const diskMat = new THREE.PointsMaterial({ 
    size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending, map: getCircleTexture(), transparent: true, opacity: 0.8, alphaTest: 0.01 
  });
  const accretionDisk = new THREE.Points(diskGeo, diskMat);
  contentGroup.add(accretionDisk);

  // 2. Focused & Optimized Hyper-Jets
  const jetParticleCount = 5000;
  const jetPositions = new Float32Array(jetParticleCount * 3);
  const jetColors = new Float32Array(jetParticleCount * 3);
  const jetVelocities = new Float32Array(jetParticleCount); 
  
  for (let i = 0; i < jetParticleCount; i++) {
    const isTop = Math.random() > 0.5;
    // Exponentially distributed length for intense core concentration
    const yVal = Math.pow(Math.random(), 3) * 35 * (isTop ? 1 : -1); 
    const absY = Math.abs(yVal);
    
    // Tightly focused beam that splays slightly at extreme distance
    const jetRadius = 0.2 + (absY * absY * 0.002);
    const angle = Math.random() * Math.PI * 2;
    const r = Math.pow(Math.random(), 2) * jetRadius;
    
    jetPositions[i * 3] = Math.cos(angle) * r;
    jetPositions[i * 3 + 1] = yVal;
    jetPositions[i * 3 + 2] = Math.sin(angle) * r;

    jetVelocities[i] = (8 + Math.random() * 12) * (isTop ? 1 : -1); // Extremely fast ejection
    
    const color = new THREE.Color();
    if (absY < 5) {
      color.setRGB(1, 1, 0.8); // White-Yellow base
    } else if (absY < 18) {
      color.setRGB(1, 0.6, 0).lerp(new THREE.Color(1, 0.1, 0), (absY - 5) / 13); // Orange -> Hot Red
    } else {
      color.setRGB(1, 0.1, 0).lerp(new THREE.Color(0.1, 0, 0.2), (absY - 18) / 17); // Red -> Purple Void
    }
    
    jetColors[i * 3] = color.r;
    jetColors[i * 3 + 1] = color.g;
    jetColors[i * 3 + 2] = color.b;
  }

  const jetGeo = new THREE.BufferGeometry();
  jetGeo.setAttribute('position', new THREE.BufferAttribute(jetPositions, 3));
  jetGeo.setAttribute('color', new THREE.BufferAttribute(jetColors, 3));
  jetGeo.setAttribute('aVelocity', new THREE.BufferAttribute(jetVelocities, 1));
  
  const jetMat = new THREE.PointsMaterial({ 
    size: 0.25, vertexColors: true, blending: THREE.AdditiveBlending, map: getCircleTexture(), transparent: true, opacity: 0.9, depthWrite: false 
  });
  const jets = new THREE.Points(jetGeo, jetMat);
  contentGroup.add(jets);

  // 3. Mathematical Lens Distortion Rings mimicking Gravitational Waves
  for (let i = 1; i <= 3; i++) {
    const ringGeo = new THREE.RingGeometry(2.5 * i, 2.5 * i + 0.1, 64);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: 0x00aaff, transparent: true, opacity: 0.2 / i, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    contentGroup.add(ring);
  }

  // 4. Central Singularity Glow
  const coreGeo = new THREE.SphereGeometry(1.5, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
  const core = new THREE.Mesh(coreGeo, coreMat);
  contentGroup.add(core);

  const glowGeo = new THREE.SphereGeometry(6, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xffaa44, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  contentGroup.add(glow);

  group.userData = { 
    type: 'projects',
    disk: accretionDisk,
    jets: jets,
    coreAnimation: glow,
    rotationSpeed: 0.005 // Faster spin for the highly optimized setup
  };
  scene.add(group);
  return group;
};

export const createExperienceUniverse = (scene: THREE.Scene, position: THREE.Vector3) => {
  const group = new THREE.Group();
  group.position.copy(position);

  const contentGroup = new THREE.Group();
  contentGroup.position.z = -40; // Wide cinematic framing
  group.add(contentGroup);

  // 1. Einstein-Rosen Bridge (Wormhole Distortions)
  const tubeCount = 12;
  const tubes = new THREE.Group();
  for(let i=0; i<tubeCount; i++) {
    const ringGeo = new THREE.TorusGeometry(15 + i * 2, 0.1, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: new THREE.Color().setHSL(0.6 + i * 0.03, 1, 0.5),
      transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.z = -i * 10;
    tubes.add(ring);
  }
  contentGroup.add(tubes);

  // 2. Accretion Swirls
  const swirlCount = 10000;
  const pos = new Float32Array(swirlCount * 3);
  const col = new Float32Array(swirlCount * 3);
  for(let i=0; i<swirlCount; i++) {
    const z = -Math.random() * 150;
    const r = 8 + (Math.abs(z) * 0.2) + Math.random() * 5;
    const angle = (z * 0.1) + Math.random() * Math.PI * 2;
    pos[i*3] = Math.cos(angle) * r;
    pos[i*3+1] = Math.sin(angle) * r;
    pos[i*3+2] = z;
    
    const color = new THREE.Color().setHSL(0.58 + (z * -0.001), 0.8, 0.4);
    col[i*3] = color.r; col[i*3+1] = color.g; col[i*3+2] = color.b;
  }
  const swirlGeo = new THREE.BufferGeometry();
  swirlGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  swirlGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const swirlMat = new THREE.PointsMaterial({ size: 0.4, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.6, map: getCircleTexture() });
  const points = new THREE.Points(swirlGeo, swirlMat);
  contentGroup.add(points);

  group.userData = { type: 'experience', tubes, points, rotationSpeed: 0.02 };
  scene.add(group);
  return group;
};

export const createContactUniverse = (scene: THREE.Scene, position: THREE.Vector3) => {
  const group = new THREE.Group();
  group.position.copy(position);

  const contentGroup = new THREE.Group();
  contentGroup.position.z = -35; // Majestic view distance perfectly framed
  group.add(contentGroup);

  const bhRadius = 7.0; // Slightly larger for better shadow visibility

  // 1. The Supermassive Black Hole (Pure Black Core)
  const bhGeo = new THREE.SphereGeometry(bhRadius, 64, 64);
  const bhMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const blackHole = new THREE.Mesh(bhGeo, bhMat);
  // Ensure the black sphere is rendered last over the particles to maintain the hole
  blackHole.renderOrder = 999;
  contentGroup.add(blackHole);

  // 2. Volumetric Soft Photon Ring (Directly touching the event horizon)
  // Shifted further out to keep the central black hole sharp
  const photonGeo = new THREE.RingGeometry(bhRadius + 1.2, bhRadius + 2.0, 128);
  const photonMat = new THREE.MeshBasicMaterial({
    color: 0xffffcc, side: THREE.DoubleSide, transparent: true, opacity: 0.2, // Lower opacity
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const pRing = new THREE.Mesh(photonGeo, photonMat);
  pRing.renderOrder = 1;
  contentGroup.add(pRing);

  // 3. The Gargantua Accretion Particles (Perfect Interstellar Lensing Physics)
  const baseParticles = 60000;
  const dPos: number[] = [];
  const dCol: number[] = [];

  const addParticle = (x: number, y: number, z: number, c: THREE.Color) => {
    dPos.push(x, y, z);
    dCol.push(c.r, c.g, c.b);
  };

  for (let i = 0; i < baseParticles; i++) {
    const t = Math.pow(Math.random(), 3.0);
    // Start particles further out (bhRadius + 1.5) to keep the central shadow clean
    const r = (bhRadius + 1.5) + t * 35.0; 
    
    const bandMask = Math.sin((r - bhRadius) * 2.5);
    if (bandMask < -0.4 && Math.random() > 0.3) continue;

    const angle = Math.random() * Math.PI * 2;
    
    // Position on a perfectly flat disc
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = (Math.random() - 0.5) * 0.15; // Extremely thin physically

    // Mathematical cinematic color grading: Light Yellow and Golden Orange mix
    let c = new THREE.Color();
    if (r < bhRadius + 4.0) {
       // Intensely blinding white-yellow core rim
       const innerT = (r - (bhRadius + 1.5)) / 2.5;
       c.lerpColors(new THREE.Color(0xffffff), new THREE.Color(0xfff0aa), innerT);
    } else if (r < bhRadius + 10.0) {
       // Light Yellow to Golden Orange transition
       const midT = (r - (bhRadius + 4.0)) / 6.0;
       c.lerpColors(new THREE.Color(0xfff0aa), new THREE.Color(0xffaa22), midT);
    } else if (r < bhRadius + 20.0) {
       // Deep Golden Orange into warm Dark Brown
       const deepT = (r - (bhRadius + 10.0)) / 10.0;
       c.lerpColors(new THREE.Color(0xffaa22), new THREE.Color(0x331100), deepT);
    } else {
       // Outer Fringe Fade to pure space black
       const fadeT = (r - (bhRadius + 20.0)) / 15.0;
       c.lerpColors(new THREE.Color(0x331100), new THREE.Color(0x000000), fadeT);
    }

    // Give high density bands a slight luminosity boost
    if (bandMask > 0.8) {
       c.lerp(new THREE.Color(0xffffff), 0.1);
    }

    // Additive noise to recreate dusty plasma rather than perfectly smooth gradients
    c.offsetHSL(0.0, 0.0, (Math.random() - 0.5) * 0.05);

    // The signature warm deep orange Doppler shift at the bottom
    // We strictly map this to deep orange as requested
    if (Math.sin(angle) < -0.2 && r < bhRadius + 14.0) {
       const shiftAmount = Math.pow(Math.abs(Math.sin(angle)), 2.0) * (1.0 - (r - bhRadius) / 14.0);
       c.lerp(new THREE.Color(0xff4400), shiftAmount * 0.9);
    }

    // A. Main Accretion Disk (Always rendered)
    addParticle(x, y, z, c);

    // B. The Mathematical Gravitational Lens Folds
    // In physics, light from behind the black hole travels over its poles towards the viewer.
    // By taking the back half of our disc (Z < 0) and wrapping it by 90 degrees upwards and downwards,
    // we generate mathematically perfect continuous Interstellar halos that seamlessly intersect the disc!
    // We strictly use Z < -0.5 to avoid Z-fighting near the exact center poles.
    if (z < -0.5) {
      // Light loses slight energy as it bends (makes front disk inherently brighter naturally)
      const lensedColor = c.clone().multiplyScalar(0.75);
      
      // Top arch fold: Rotated exactly 90 degrees around X axis
      const topX = x;
      const topY = -z; 
      const topZ = y - 1.0; // Pushed slightly into the background so the black hole physically eclipses it
      addParticle(topX, topY, topZ, lensedColor);

      // Bottom arch fold: Rotated exactly -90 degrees around X axis
      const botX = x;
      const botY = z;
      const botZ = y - 1.0;
      addParticle(botX, botY, botZ, lensedColor);
    }
  }

  const diskGeo = new THREE.BufferGeometry();
  diskGeo.setAttribute('position', new THREE.Float32BufferAttribute(dPos, 3));
  diskGeo.setAttribute('color', new THREE.Float32BufferAttribute(dCol, 3));
  
  // High-performance volumetric dust renderer
  const diskMat = new THREE.PointsMaterial({ 
    size: 0.25, // Soft, wide points
    vertexColors: true, 
    blending: THREE.AdditiveBlending, 
    transparent: true, 
    opacity: 0.5, // Semi transparent layer builds intense volume
    map: getCircleTexture(), 
    alphaTest: 0.005,
    depthWrite: false
  });
  
  const accretionDust = new THREE.Points(diskGeo, diskMat);
  
  // Final dramatic camera tilt (giving us the classic oblique cinematic Interstellar viewing angle)
  accretionDust.rotation.x = Math.PI / 18; // Only a gentle 10 degree tilt on the whole setup
  accretionDust.rotation.z = -Math.PI / 12; // Slight twist
  contentGroup.add(accretionDust);

  group.userData = { 
    type: 'contact', 
    disk: accretionDust, 
    rotationSpeed: 0.0008, // Slow, peaceful rotation 
    bhRadius 
  };
  scene.add(group);
  return group;
};

export const createStationUniverse = (scene: THREE.Scene, position: THREE.Vector3) => {
  const group = new THREE.Group();
  group.position.copy(position);

  const contentGroup = new THREE.Group();
  // Zoom out heavily so both the massive station and the planet curvature are highly visible
  contentGroup.position.z = -75; 
  
  // Dramatic cinematic angle from below
  contentGroup.rotation.x = Math.PI / 8;
  contentGroup.rotation.y = -Math.PI / 10;
  contentGroup.rotation.z = Math.PI / 12;
  group.add(contentGroup);

  // 1. Deep Space Galactic Background (Replacing the Planet)
  
  // Reusable helper to generate deeply colored, varied galaxies
  const createGalaxy = (
      particleCount: number, size: number, 
      colorIn: number, colorOut: number, 
      spread: number, arms: number, spin: number
  ) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const cIn = new THREE.Color(colorIn);
      const cOut = new THREE.Color(colorOut);
      
      for(let i=0; i<particleCount; i++) {
          const t = Math.pow(Math.random(), 1.5);
          const r = t * size;
          const branchAngle = ((i % arms) / arms) * Math.PI * 2;
          const spinAngle = r * spin;
          
          const angle = branchAngle + spinAngle + ((Math.random() - 0.5) * spread * (1-t)*2);
          
          pos[i*3] = Math.cos(angle) * r;
          pos[i*3+1] = (Math.random() - 0.5) * spread * 5 * (1-t);
          pos[i*3+2] = Math.sin(angle) * r;

          const color = new THREE.Color().copy(cIn).lerp(cOut, t);
          // Add a tiny bit of star variance
          color.offsetHSL(0, 0, (Math.random() - 0.5) * 0.2);

          colors[i*3] = color.r;
          colors[i*3+1] = color.g;
          colors[i*3+2] = color.b;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      // Large soft particles
      const mat = new THREE.PointsMaterial({
          size: 1.2, vertexColors: true, blending: THREE.AdditiveBlending, map: getCircleTexture(), transparent: true, opacity: 0.6, depthWrite: false
      });
      return new THREE.Points(geo, mat);
  };

  // Celestial Body 1: Massive Andromeda-style Cyan/Blue galaxy core
  const gal1 = createGalaxy(12000, 90, 0xaaffff, 0x002277, 1.8, 5, 0.08);
  gal1.position.set(-180, 80, -280);
  gal1.rotation.x = Math.PI / 3.5;
  gal1.rotation.z = Math.PI / 6;
  contentGroup.add(gal1);

  // Celestial Body 2: Golden/Red glowing Elliptical cluster
  const gal2 = createGalaxy(10000, 60, 0xfff0bb, 0xaa2200, 2.5, 2, 0.2);
  gal2.position.set(200, -70, -320);
  gal2.rotation.x = -Math.PI / 4;
  gal2.rotation.z = -Math.PI / 10;
  contentGroup.add(gal2);

  // Celestial Body 3: Distant Chaotic Magenta/Purple Nebula
  const gal3 = createGalaxy(8000, 50, 0xff88ff, 0x440099, 4.0, 1, 0.04);
  gal3.position.set(-60, -140, -220);
  gal3.rotation.x = Math.PI / 2;
  contentGroup.add(gal3);

  // 2. The Space Station Group
  const station = new THREE.Group();
  
  // Shared Materials
  const metalMat = new THREE.MeshStandardMaterial({ 
    color: 0xe0e0e0, metalness: 0.7, roughness: 0.4 
  });
  const polishedMetalMat = new THREE.MeshStandardMaterial({ 
    color: 0xffffff, metalness: 0.9, roughness: 0.1 
  });
  const darkGlassMat = new THREE.MeshPhysicalMaterial({ 
    color: 0x111111, metalness: 0.9, roughness: 0.1, clearcoat: 1.0 
  });
  const latticeMat = new THREE.MeshBasicMaterial({
    color: 0xb0b0b0, wireframe: true, transparent: true, opacity: 0.5
  });

  // Hub structural core
  const coreMesh1 = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 18, 16), metalMat);
  station.add(coreMesh1);
  const coreMesh2 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 26, 16), metalMat);
  station.add(coreMesh2);

  // Intricate hub lattice (central cylinder cage)
  const lattice = new THREE.Mesh(new THREE.CylinderGeometry(4.0, 4.0, 10, 24, 6), latticeMat);
  station.add(lattice);
  
  // Hub cap rings (Docking ports)
  for(let yPos of [5, -5]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(4.0, 0.3, 16, 48), metalMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = yPos;
    station.add(ring);
    
    // Inner docking port structures
    const port = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.5, 16), darkGlassMat);
    port.position.y = yPos + (yPos > 0 ? 0.3 : -0.3);
    station.add(port);
  }

  // Ring dimension
  const ringRadius = 40;
  const numSpokes = 6;

  // Outer Backbone Tube
  const backboneGeo = new THREE.TorusGeometry(ringRadius, 0.5, 16, 128);
  const backbone = new THREE.Mesh(backboneGeo, metalMat);
  backbone.rotation.x = Math.PI / 2;
  station.add(backbone);

  // Add Spokes
  for (let i = 0; i < numSpokes; i++) {
    const angle = (i / numSpokes) * Math.PI * 2;
    const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, ringRadius - 4, 16), metalMat);
    // Position spoke horizontally
    spoke.position.x = Math.cos(angle) * (ringRadius / 2);
    spoke.position.z = Math.sin(angle) * (ringRadius / 2);
    spoke.rotation.x = Math.PI / 2;
    spoke.rotation.z = angle;
    station.add(spoke);
  }

  // Tension Cables (Wireframe aesthetic connecting hub to ring)
  const lineMat = new THREE.LineBasicMaterial({ color: 0x999999, transparent: true, opacity: 0.3 });
  for (let i = 0; i < numSpokes; i++) {
    const angle = (i / numSpokes) * Math.PI * 2;
    const nextAngle = ((i + 1) / numSpokes) * Math.PI * 2;
    
    for (const y of [5, -5]) {
      const pts1 = [
        new THREE.Vector3(0, y, 0),
        new THREE.Vector3(Math.cos(angle + 0.2) * ringRadius, 0, Math.sin(angle + 0.2) * ringRadius)
      ];
      station.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts1), lineMat));

      const pts2 = [
        new THREE.Vector3(0, y, 0),
        new THREE.Vector3(Math.cos(nextAngle - 0.2) * ringRadius, 0, Math.sin(nextAngle - 0.2) * ringRadius)
      ];
      station.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2), lineMat));
    }
  }

  // Habitat Pods along the ring
  const numPods = 24;
  const podGeo = new THREE.CapsuleGeometry(1.8, 4, 16, 16);
  podGeo.rotateZ(Math.PI / 2); // Lay flat

  for (let i = 0; i < numPods; i++) {
    const angle = (i / numPods) * Math.PI * 2;
    const podGroup = new THREE.Group();
    
    // Main pod body
    const pod = new THREE.Mesh(podGeo, metalMat);
    podGroup.add(pod);

    // Dark glass solar window on top of the pod
    const windowMesh = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.5, 2.5), darkGlassMat);
    windowMesh.position.y = 1.6;
    podGroup.add(windowMesh);
    
    // Small connection tube to backbone
    const joint = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.5, 8), metalMat);
    joint.position.z = -1.2;
    joint.rotation.x = Math.PI / 2;
    podGroup.add(joint);

    // Position pod around the ring
    podGroup.position.x = Math.cos(angle) * (ringRadius + 1.2); // Just outside backbone
    podGroup.position.z = Math.sin(angle) * (ringRadius + 1.2);
    podGroup.rotation.y = -angle; // Face outward/tangent
    
    station.add(podGroup);
  }

  // 3. Launchers / Starships (Adding immense impact and scale)
  const createStarship = () => {
    const ship = new THREE.Group();
    // Main fuselage (tall cylinder)
    const body = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 8, 16), polishedMetalMat);
    ship.add(body);
    // Dark heat-shield nose cone
    const nose = new THREE.Mesh(new THREE.CylinderGeometry(0, 1.2, 3, 16), darkGlassMat);
    nose.position.y = 5.5;
    ship.add(nose);
    // Aft aerodynamic fins
    for(let w of [-1, 1]) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.5, 1.5), darkGlassMat);
      fin.position.set(w * 1.3, -2.5, 0);
      fin.rotation.x = Math.PI / 8;
      ship.add(fin);
    }
    return ship;
  };

  // Ship 1: Approaching the top hub actively
  const ship1 = createStarship();
  // Nose pointing down towards hub
  ship1.rotation.x = Math.PI; 
  ship1.position.set(2, 25, 5); // Floating high above the hub
  station.add(ship1);

  // Ship 2: Docked perpendicularly at the outer ring backbone
  const ship2 = createStarship();
  ship2.rotation.x = Math.PI / 2; // Pointing center
  // Dock it between two pods
  const dockAngle = (1.5 / numPods) * Math.PI * 2; 
  ship2.position.set(
    Math.cos(dockAngle) * (ringRadius + 6), 
    0, 
    Math.sin(dockAngle) * (ringRadius + 6)
  );
  ship2.rotation.z = -dockAngle;
  ship2.rotation.y = -dockAngle;
  station.add(ship2);

  // Slight tilt to the whole station
  station.rotation.x = 0.15;
  station.rotation.z = -0.15;
  contentGroup.add(station);

  // 4. Cinematic Space Lightscape
  const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
  dirLight.position.set(60, 80, 20); // Main "Sun" light
  contentGroup.add(dirLight);

  // Cyan rim-light from Andromeda-style body
  const cyanLight = new THREE.DirectionalLight(0x00aaff, 1.2);
  cyanLight.position.set(-180, 80, -280);
  contentGroup.add(cyanLight);

  // Warm bounce light from Elliptical cluster
  const warmLight = new THREE.DirectionalLight(0xff6600, 0.8);
  warmLight.position.set(200, -70, -320);
  contentGroup.add(warmLight);

  const ambientLight = new THREE.AmbientLight(0x110022, 1.5); // Deep purple cosmic ambient
  contentGroup.add(ambientLight);

  group.userData = { 
    type: 'station', 
    stationRing: station, 
    launcher1: ship1,
    galaxies: [gal1, gal2, gal3], // Track all 3 diverse galaxies for animation
    rotationSpeed: 0.0015
  };
  scene.add(group);
  return group;
};
