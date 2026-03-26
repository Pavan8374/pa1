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

  // Core icosahedron
  const coreGeometry = new THREE.IcosahedronGeometry(1.5, 3);
  const coreMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x4a00e0, emissive: 0x8e2de2, emissiveIntensity: 1.2,
    metalness: 0.8, roughness: 0.2, clearcoat: 1.0, transparent: true, opacity: 0.95, side: THREE.DoubleSide,
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  group.add(core);

  const ringGroup = new THREE.Group();
  const createRingLayer = (radius: number, thickness: number, color: number, opacity: number) => {
    const ringGeometry = new THREE.RingGeometry(radius - thickness / 2, radius + thickness / 2, 64, 8);
    const ringMaterial = new THREE.MeshPhysicalMaterial({
      color, emissive: color, emissiveIntensity: 0.3,
      transparent: true, opacity, side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    const layerGroup = new THREE.Group();
    layerGroup.add(ring);
    layerGroup.userData = { rotationSpeed: 0.001 + Math.random() * 0.002 };
    return layerGroup;
  };

  ringGroup.add(createRingLayer(2.8, 0.3, 0x00ffff, 0.4));
  ringGroup.add(createRingLayer(3.2, 0.4, 0x0088ff, 0.3));
  ringGroup.add(createRingLayer(3.7, 0.5, 0x4400ff, 0.25));

  group.add(ringGroup);
  group.userData = { type: 'home', core, ringLayers: ringGroup.children };
  scene.add(group);
  return group;
};

export const createAboutUniverse = (scene: THREE.Scene, position: THREE.Vector3) => {
  const group = new THREE.Group();
  group.position.copy(position);

  const contentGroup = new THREE.Group();
  contentGroup.position.z = -10; // Push back to avoid zoom
  group.add(contentGroup);

  const planetGeo = new THREE.IcosahedronGeometry(5, 4);
  const planetMat = new THREE.MeshPhysicalMaterial({
    color: 0x4a00e0, emissive: 0x110022, wireframe: true, transparent: true, opacity: 0.8
  });
  const planet = new THREE.Mesh(planetGeo, planetMat);
  contentGroup.add(planet);

  for (let i = 0; i < 6; i++) {
    const ringGeo = new THREE.RingGeometry(6.5 + i * 1.5, 7.2 + i * 1.5, 64);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: new THREE.Color().setHSL(0.7 + i * 0.05, 1, 0.6), 
      side: THREE.DoubleSide, transparent: true, opacity: 0.4 - i * 0.04,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
    ring.rotation.y = (Math.random() - 0.5) * 0.3;
    contentGroup.add(ring);
  }

  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const r = 8 + Math.random() * 12;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3;
    positions[i * 3 + 2] = r * Math.cos(phi);
    
    const color = new THREE.Color();
    color.setHSL(0.7 + Math.random() * 0.2, 0.8, 0.5 + Math.random() * 0.3);
    colors[i * 3] = color.r; colors[i * 3 + 1] = color.g; colors[i * 3 + 2] = color.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const mat = new THREE.PointsMaterial({ 
    size: 0.5, vertexColors: true, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending,
    map: getCircleTexture(), alphaTest: 0.01
  });
  const points = new THREE.Points(geo, mat);
  contentGroup.add(points);

  // Separate atmospheric glow for pulsing
  const atmosphereGeo = new THREE.SphereGeometry(5.2, 32, 32);
  const atmosphereMat = new THREE.MeshBasicMaterial({
    color: 0x4400aa, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, side: THREE.BackSide
  });
  const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
  contentGroup.add(atmosphere);

  group.userData = { type: 'about', rotationSpeed: 0.002, atmosphere };
  scene.add(group);
  return group;
};

export const createSkillsUniverse = (scene: THREE.Scene, position: THREE.Vector3) => {
  const group = new THREE.Group();
  group.position.copy(position);

  const contentGroup = new THREE.Group();
  contentGroup.position.z = -15; // Push back
  group.add(contentGroup);

  const nodeCount = 120;
  const nodesGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(nodeCount * 3);
  for(let i=0; i<nodeCount; i++) {
    positions[i*3] = (Math.random() - 0.5) * 25;
    positions[i*3+1] = (Math.random() - 0.5) * 25;
    positions[i*3+2] = (Math.random() - 0.5) * 25;
  }
  nodesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const nodesMat = new THREE.PointsMaterial({ 
    color: 0x00ffff, size: 0.8, blending: THREE.AdditiveBlending, map: getCircleTexture(), transparent: true, alphaTest: 0.01 
  });
  const nodes = new THREE.Points(nodesGeo, nodesMat);
  contentGroup.add(nodes);

  const linesPos = [];
  for(let i=0; i<nodeCount; i++) {
    for(let j=i+1; j<nodeCount; j++) {
      const dx = positions[i*3] - positions[j*3];
      const dy = positions[i*3+1] - positions[j*3+1];
      const dz = positions[i*3+2] - positions[j*3+2];
      const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
      if(dist < 7) {
        linesPos.push(positions[i*3], positions[i*3+1], positions[i*3+2]);
        linesPos.push(positions[j*3], positions[j*3+1], positions[j*3+2]);
      }
    }
  }
  const linesGeo = new THREE.BufferGeometry();
  linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linesPos, 3));
  const linesMat = new THREE.LineBasicMaterial({ color: 0x0088cc, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
  const lines = new THREE.LineSegments(linesGeo, linesMat);
  contentGroup.add(lines);

  const coreGeo = new THREE.OctahedronGeometry(2.5, 0);
  const coreMat = new THREE.MeshPhysicalMaterial({ color: 0x00ffcc, emissive: 0x00aaaa, wireframe: true, wireframeLinewidth: 2 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  contentGroup.add(core);

  // Data Movers (particles that travel along paths)
  const moverCount = 30;
  const moversGeo = new THREE.BufferGeometry();
  const mPos = new Float32Array(moverCount * 3);
  const mVel = new Float32Array(moverCount); // stores progress
  for(let i=0; i<moverCount; i++) {
    const idx = Math.floor(Math.random() * nodeCount);
    mPos[i*3] = positions[idx*3];
    mPos[i*3+1] = positions[idx*3+1];
    mPos[i*3+2] = positions[idx*3+2];
    mVel[i] = Math.random();
  }
  moversGeo.setAttribute('position', new THREE.BufferAttribute(mPos, 3));
  const moversMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.6, map: getCircleTexture(), transparent: true, blending: THREE.AdditiveBlending });
  const movers = new THREE.Points(moversGeo, moversMat);
  contentGroup.add(movers);

  group.userData = { 
    type: 'skills', 
    wireframe: lines, 
    core, 
    movers, 
    nodesPos: positions,
    rotationSpeed: 0.003 
  };
  scene.add(group);
  return group;
};

export const createProjectsUniverse = (scene: THREE.Scene, position: THREE.Vector3) => {
  const group = new THREE.Group();
  group.position.copy(position);

  const contentGroup = new THREE.Group();
  contentGroup.position.z = -15; // Push back
  group.add(contentGroup);

  const particleCount = 5000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const arms = 3;
  
  for (let i = 0; i < particleCount; i++) {
    const radius = Math.random() * 12;
    const spinAngle = radius * 1.5;
    const branchAngle = ((i % arms) / arms) * Math.PI * 2;
    
    const randomX = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 0.8;
    const randomY = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 0.8;
    const randomZ = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 0.8;

    positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i * 3 + 1] = randomY * (12 - radius) * 0.1;
    positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
    
    const color = new THREE.Color(0x3a86ff).lerp(new THREE.Color(0xffbe0b), radius / 12);
    colors[i * 3] = color.r; colors[i * 3 + 1] = color.g; colors[i * 3 + 2] = color.b;
  }
  
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const mat = new THREE.PointsMaterial({ 
    size: 0.2, vertexColors: true, blending: THREE.AdditiveBlending, map: getCircleTexture(), transparent: true, alphaTest: 0.01 
  });
  const galaxy = new THREE.Points(geo, mat);
  contentGroup.add(galaxy);

  group.userData = { type: 'projects', rotationSpeed: 0.005 };
  scene.add(group);
  return group;
};

export const createExperienceUniverse = (scene: THREE.Scene, position: THREE.Vector3) => {
  const group = new THREE.Group();
  group.position.copy(position);

  const contentGroup = new THREE.Group();
  contentGroup.position.z = -20; // Push back
  group.add(contentGroup);

  const starGeo = new THREE.SphereGeometry(1.2, 32, 32);
  const star1Mat = new THREE.MeshBasicMaterial({ color: 0xff5500 });
  const star2Mat = new THREE.MeshBasicMaterial({ color: 0x0088ff });
  
  const star1 = new THREE.Mesh(starGeo, star1Mat);
  star1.position.x = -3;
  const star2 = new THREE.Mesh(starGeo, star2Mat);
  star2.position.x = 3;
  
  contentGroup.add(star1);
  contentGroup.add(star2);

  group.userData = { type: 'experience', star1, star2, orbitSpeed: 0.01, angle: 0 };
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
  contentGroup.position.z = -15; // Push back slightly
  group.add(contentGroup);

  const planetGeo = new THREE.SphereGeometry(25, 64, 64);
  const planetMat = new THREE.MeshPhysicalMaterial({
    color: 0x0055ff, emissive: 0x001133, roughness: 0.6, metalness: 0.1, clearcoat: 0.5
  });
  const planet = new THREE.Mesh(planetGeo, planetMat);
  planet.position.y = -32;
  planet.position.z = -10;
  contentGroup.add(planet);

  const haloGeo = new THREE.SphereGeometry(26, 64, 64);
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0x00aaff, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, side: THREE.BackSide
  });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  halo.position.copy(planet.position);
  contentGroup.add(halo);

  const station = new THREE.Group();
  
  const coreMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.8, roughness: 0.2 });
  const core1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 8, 16), coreMat);
  core1.rotation.z = Math.PI / 2;
  station.add(core1);

  const core2 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 4, 16), coreMat);
  station.add(core2);

  const panelMat = new THREE.MeshPhysicalMaterial({ 
    color: 0x0033cc, metalness: 0.9, roughness: 0.1, clearcoat: 1.0, side: THREE.DoubleSide
  });
  for(let i of [-1, 1]) {
    for(let j of [-1, 1]) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 2), panelMat);
      panel.position.set(j * 3, 0, i * 1.8);
      station.add(panel);
    }
  }
  
  const node1 = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 32), coreMat);
  station.add(node1);

  const ringGeo = new THREE.TorusGeometry(3.5, 0.4, 16, 64);
  const ring = new THREE.Mesh(ringGeo, coreMat);
  ring.rotation.x = Math.PI / 2;
  const ringPivot = new THREE.Group();
  ringPivot.add(ring);
  station.add(ringPivot);

  station.position.set(0, 0, 0);
  station.rotation.x = 0.2;
  station.rotation.z = -0.15;
  contentGroup.add(station);

  group.userData = { type: 'station', stationRing: ringPivot, planet, rotationSpeed: 0.005 };
  scene.add(group);
  return group;
};
