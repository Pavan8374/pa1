// components/SpaceBackground.tsx
"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";

interface SpaceBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ children, className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const frameRef = useRef<number>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // 3D Objects refs
  const cosmicStructureRef = useRef<THREE.Group>(null);
  const planetsRef = useRef<THREE.Mesh[]>([]);
  const lightsRef = useRef<THREE.PointLight[]>([]);
  const texturesRef = useRef<THREE.Texture[]>([]);

  // Create realistic cosmic structure with enhanced ring system
  const createCosmicStructure = useCallback((scene: THREE.Scene) => {
    // Core icosahedron
    const coreGeometry = new THREE.IcosahedronGeometry(1.5, 3);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4a00e0,
      emissive: 0x8e2de2,
      emissiveIntensity: 1.2,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);

    // Create realistic ring system with multiple layers
    const ringGroup = new THREE.Group();
    
    // Main ring with particles
    const createRingLayer = (radius: number, thickness: number, particleCount: number, color: number, opacity: number) => {
      const ringGeometry = new THREE.RingGeometry(radius - thickness/2, radius + thickness/2, 64, 8);
      
      // Create ring material with realistic properties
      const ringMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.3,
        metalness: 0.1,
        roughness: 0.8,
        transparent: true,
        opacity: opacity,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
      });

      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;

      // Add particle system for ring debris/dust
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);
      const particleSizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const ringRadius = radius + (Math.random() - 0.5) * thickness;
        const height = (Math.random() - 0.5) * 0.2;

        particlePositions[i * 3] = Math.cos(angle) * ringRadius;
        particlePositions[i * 3 + 1] = height;
        particlePositions[i * 3 + 2] = Math.sin(angle) * ringRadius;

        const particleColor = new THREE.Color(color);
        particleColor.offsetHSL(0, 0, Math.random() * 0.3 - 0.15);
        
        particleColors[i * 3] = particleColor.r;
        particleColors[i * 3 + 1] = particleColor.g;
        particleColors[i * 3 + 2] = particleColor.b;

        particleSizes[i] = Math.random() * 0.05 + 0.02;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: opacity * 1.5,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);

      const layerGroup = new THREE.Group();
      layerGroup.add(ring);
      layerGroup.add(particles);
      layerGroup.userData = {
        rotationSpeed: 0.001 + Math.random() * 0.002,
        particleRotationSpeed: 0.0005 + Math.random() * 0.001,
      };

      return layerGroup;
    };

    // Create multiple ring layers for depth and realism
    const innerRing = createRingLayer(2.8, 0.3, 300, 0x00ffff, 0.4);
    const middleRing = createRingLayer(3.2, 0.4, 400, 0x0088ff, 0.3);
    const outerRing = createRingLayer(3.7, 0.5, 500, 0x4400ff, 0.25);
    
    // Add slight tilts to each ring for more realistic appearance
    innerRing.rotation.z = Math.PI * 0.02;
    middleRing.rotation.z = -Math.PI * 0.015;
    outerRing.rotation.z = Math.PI * 0.01;

    ringGroup.add(innerRing);
    ringGroup.add(middleRing);
    ringGroup.add(outerRing);

    // Create energy streams connecting rings
    const createEnergyStream = (startRadius: number, endRadius: number) => {
      const streamGeometry = new THREE.CylinderGeometry(0.02, 0.02, Math.abs(endRadius - startRadius), 8);
      const streamMaterial = new THREE.MeshBasicMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.6,
      });

      const stream = new THREE.Mesh(streamGeometry, streamMaterial);
      stream.rotation.z = Math.PI / 2;
      stream.position.x = (startRadius + endRadius) / 2;
      stream.position.y = Math.sin(Math.random() * Math.PI * 2) * 0.1;
      stream.position.z = Math.cos(Math.random() * Math.PI * 2) * 0.1;

      return stream;
    };

    // Add energy streams
    for (let i = 0; i < 8; i++) {
      const stream1 = createEnergyStream(2.8, 3.2);
      const stream2 = createEnergyStream(3.2, 3.7);
      
      stream1.rotation.y = (i / 8) * Math.PI * 2;
      stream2.rotation.y = ((i + 0.5) / 8) * Math.PI * 2;
      
      ringGroup.add(stream1);
      ringGroup.add(stream2);
    }

    // Create the main cosmic structure group
    const cosmicStructure = new THREE.Group();
    cosmicStructure.add(core);
    cosmicStructure.add(ringGroup);
    cosmicStructure.position.set(0, 0, 0);

    // Store references for animation
    cosmicStructure.userData = {
      core: core,
      ringLayers: [innerRing, middleRing, outerRing],
    };

    scene.add(cosmicStructure);
    return cosmicStructure;
  }, []);

  // Create realistic planet textures
  const createPlanetTexture = (color: THREE.Color, size = 512) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d")!;

    // Base gradient
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    gradient.addColorStop(0, color.clone().offsetHSL(0, 0.1, 0.3).getStyle());
    gradient.addColorStop(1, color.clone().offsetHSL(0, 0.1, -0.2).getStyle());

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    // Add surface details (craters/mountains)
    context.fillStyle = color.clone().offsetHSL(0, 0.05, -0.15).getStyle();
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = Math.random() * 15 + 3;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }

    // Add specular highlights
    context.fillStyle = "rgba(255, 255, 255, 0.3)";
    context.beginPath();
    context.arc(size * 0.7, size * 0.3, size * 0.1, 0, Math.PI * 2);
    context.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texturesRef.current.push(texture);
    return texture;
  };

  // Create planet systems
  const createPlanetSystems = useCallback((scene: THREE.Scene) => {
    const planets: THREE.Mesh[] = [];
    const colors = [
      0xff6b6b, 0x4ecdc4, 0xffbe0b, 0xfb5607, 0x8338ec, 0x3a86ff, 0x06d6a0,
      0x118ab2,
    ];

    // Create gas giant at center
    const gasGiantGeometry = new THREE.SphereGeometry(1.8, 64, 64);
    const gasGiantTexture = createPlanetTexture(new THREE.Color(0xff9e00));
    const gasGiantMaterial = new THREE.MeshPhysicalMaterial({
      map: gasGiantTexture,
      bumpMap: gasGiantTexture,
      bumpScale: 0.05,
      metalness: 0.4,
      roughness: 0.7,
      clearcoat: 0.2,
    });

    const gasGiant = new THREE.Mesh(gasGiantGeometry, gasGiantMaterial);
    gasGiant.position.set(0, 0, 0);
    gasGiant.rotation.y = Math.PI / 4;
    scene.add(gasGiant);
    planets.push(gasGiant);

    // Create orbiting planets
    for (let i = 0; i < 7; i++) {
      const planetSize = 0.5 + Math.random() * 0.4;
      const geometry = new THREE.SphereGeometry(planetSize, 64, 64);

      const texture = createPlanetTexture(
        new THREE.Color(colors[i % colors.length]),
      );
      const material = new THREE.MeshPhysicalMaterial({
        map: texture,
        bumpMap: texture,
        bumpScale: 0.03,
        metalness: 0.3,
        roughness: 0.8,
        clearcoat: 0.1,
      });

      const planet = new THREE.Mesh(geometry, material);

      // Position planets in orbital systems
      const systemAngle = (i / 7) * Math.PI * 2;
      const systemRadius = 5 + Math.random() * 3;
      const orbitRadius = 1.5 + Math.random() * 1;

      planet.position.x = Math.cos(systemAngle) * systemRadius;
      planet.position.y = (Math.random() - 0.5) * 2;
      planet.position.z = Math.sin(systemAngle) * systemRadius;

      planet.userData = {
        systemAngle: systemAngle,
        systemRadius: systemRadius,
        orbitRadius: orbitRadius,
        orbitSpeed: 0.2 + Math.random() * 0.4,
        rotationSpeed: 0.01 + Math.random() * 0.02,
        initialPosition: planet.position.clone(),
      };

      // Add moons to some planets
      if (i % 3 === 0) {
        const moonGeometry = new THREE.SphereGeometry(planetSize * 0.4, 32, 32);
        const moonMaterial = new THREE.MeshStandardMaterial({
          color: 0xdddddd,
          roughness: 0.9,
          metalness: 0.1,
        });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);

        moon.position.x = orbitRadius * 0.8;
        moon.userData = {
          orbitSpeed: 0.5 + Math.random() * 0.5,
          rotationSpeed: 0.02 + Math.random() * 0.03,
        };

        planet.add(moon);
      }

      scene.add(planet);
      planets.push(planet);
    }

    return planets;
  }, []);

  // Create dynamic lighting system
  const createLights = useCallback((scene: THREE.Scene) => {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Main directional light (sun)
    const sunLight = new THREE.DirectionalLight(0xfff7d6, 1.5);
    sunLight.position.set(10, 10, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // Point lights (stars)
    const lights: THREE.PointLight[] = [];
    const lightColors = [0x00ffff, 0xff55ff, 0x55ff55, 0xffff00];

    for (let i = 0; i < 20; i++) {
      const intensity = 0.5 + Math.random() * 1;
      const distance = 30 + Math.random() * 50;
      const light = new THREE.PointLight(
        lightColors[i % lightColors.length],
        intensity,
        distance,
      );

      light.position.x = (Math.random() - 0.5) * 100;
      light.position.y = (Math.random() - 0.5) * 100;
      light.position.z = (Math.random() - 0.5) * 100;

      light.userData = {
        baseIntensity: intensity,
        pulseSpeed: 0.5 + Math.random() * 1,
      };

      scene.add(light);
      lights.push(light);
    }

    return lights;
  }, []);

  // Create starfield background
  const createStarField = useCallback((scene: THREE.Scene) => {
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;

      // Position
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 100 - 50;

      // Color
      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.2, 0.7 + Math.random() * 0.3);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Size
      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    return stars;
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    const time = Date.now() * 0.001;

    // Animate cosmic structure
    if (cosmicStructureRef.current) {
      // Animate the core
      if (cosmicStructureRef.current.userData.core) {
        cosmicStructureRef.current.userData.core.rotation.x = time * 0.05;
        cosmicStructureRef.current.userData.core.rotation.y = time * 0.1;
        cosmicStructureRef.current.userData.core.rotation.z = time * 0.03;
      }

      // Animate ring layers with different speeds and directions
      if (cosmicStructureRef.current.userData.ringLayers) {
        cosmicStructureRef.current.userData.ringLayers.forEach((layer: THREE.Group, index: number) => {
          const baseSpeed = layer.userData.rotationSpeed;
          const direction = index % 2 === 0 ? 1 : -1;
          
          layer.rotation.y += baseSpeed * direction;
          layer.rotation.x = Math.sin(time * 0.1 + index) * 0.02;
          layer.rotation.z += baseSpeed * 0.5 * direction;
          
          // Animate individual particles within each layer
          layer.children.forEach((child) => {
            if (child instanceof THREE.Points) {
              child.rotation.y += layer.userData.particleRotationSpeed * direction;
            }
          });
        });
      }
    }

    // Animate planets and their moons
    planetsRef.current.forEach((planet) => {
      // Planet orbit
      if (planet.userData.systemAngle !== undefined) {
        planet.userData.systemAngle += planet.userData.orbitSpeed * 0.01;
        planet.position.x =
          Math.cos(planet.userData.systemAngle) * planet.userData.systemRadius;
        planet.position.z =
          Math.sin(planet.userData.systemAngle) * planet.userData.systemRadius;
      }

      // Planet rotation
      planet.rotation.y += planet.userData.rotationSpeed || 0.01;
      planet.rotation.x += (planet.userData.rotationSpeed || 0.01) * 0.3;

      // Animate moons
      planet.children.forEach((moon) => {
        moon.rotation.y += moon.userData.rotationSpeed || 0.02;
        moon.position.x =
          Math.cos(time * moon.userData.orbitSpeed) *
          planet.userData.orbitRadius;
        moon.position.z =
          Math.sin(time * moon.userData.orbitSpeed) *
          planet.userData.orbitRadius;
      });
    });

    // Animate lights (pulsing stars)
    lightsRef.current.forEach((light) => {
      light.intensity =
        light.userData.baseIntensity *
        (0.8 + Math.sin(time * light.userData.pulseSpeed) * 0.4);
    });

    // Camera movement with mouse
    if (cameraRef.current) {
      cameraRef.current.position.x +=
        (mouseRef.current.x * 3 - cameraRef.current.position.x) * 0.01;
      cameraRef.current.position.y +=
        (mouseRef.current.y * 2 - cameraRef.current.position.y) * 0.01;
      cameraRef.current.lookAt(0, 0, 0);
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  // Handle window resize
  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current || !mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000010);
    scene.fog = new THREE.Fog(0x000020, 20, 100);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 15;
    camera.position.y = 2;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    cosmicStructureRef.current = createCosmicStructure(scene);
    planetsRef.current = createPlanetSystems(scene);
    lightsRef.current = createLights(scene);
    createStarField(scene);

    handleResize();

    animate();
    setIsLoaded(true);

    window.addEventListener("mousemove", handleMouseMove);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mountRef.current);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current) {
        resizeObserver.unobserve(mountRef.current);
      }

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose of all resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      // Dispose textures
      texturesRef.current.forEach((texture) => texture.dispose());

      renderer.dispose();
    };
  }, [
    animate,
    createCosmicStructure,
    createPlanetSystems,
    createLights,
    createStarField,
    handleMouseMove,
    handleResize,
  ]);

  return (
    <div className={`relative ${className}`}>
      {/* Three.js Canvas Container - Fixed Background */}
      <div
        ref={mountRef}
        className="fixed inset-0 z-0"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
        }}
      />

      {/* Nebula overlay - Fixed */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: `radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, transparent 70%)`,
          opacity: 0.7,
        }}
      />

      {/* Content Container */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default SpaceBackground;