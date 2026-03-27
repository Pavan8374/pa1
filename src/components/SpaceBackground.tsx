"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { useNavigation } from './NavigationContext';
import { 
  createHomeUniverse, createAboutUniverse, createSkillsUniverse, 
  createProjectsUniverse, createExperienceUniverse, createContactUniverse,
  createStationUniverse, getCircleTexture
} from "./CosmicBuilders";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

export const UNIVERSE_POSITIONS: Record<string, THREE.Vector3> = {
  home: new THREE.Vector3(0, 0, 0),
  about: new THREE.Vector3(5000, 0, 0),
  skills: new THREE.Vector3(0, 5000, 0),
  projects: new THREE.Vector3(0, 0, 5000),
  experience: new THREE.Vector3(-5000, 0, 0),
  contact: new THREE.Vector3(0, -5000, 0),
  station: new THREE.Vector3(5000, 5000, 0),
};

interface SpaceBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ children, className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const frameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const nebulaRef = useRef<THREE.Group | null>(null);

  const { isWarping, targetPage } = useNavigation();
  const isWarpingRef = useRef(false);
  const targetPageRef = useRef('home');
  const timeDataRef = useRef({ accumulatedTime: 0, lastNow: 0, warpFactor: 1 });
  const cameraBasePosRef = useRef(new THREE.Vector3(0, 0, 0));
  const warpStartPosRef = useRef(new THREE.Vector3(0, 0, 0));
  
  const universesRef = useRef<THREE.Group[]>([]);
  const lightsRef = useRef<THREE.PointLight[]>([]);

  const warpStartTimeRef = useRef(0);
  const localZRef = useRef(15);

  useEffect(() => {
    isWarpingRef.current = isWarping;
    if (isWarping) {
      warpStartPosRef.current.copy(cameraBasePosRef.current);
      warpStartTimeRef.current = Date.now();
    }
  }, [isWarping]);

  useEffect(() => {
    targetPageRef.current = targetPage;
  }, [targetPage]);

  // Create hyper starfield
  const createStarField = useCallback((scene: THREE.Scene) => {
    const starCount = 30000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 15000;
      positions[i3 + 1] = (Math.random() - 0.5) * 15000;
      positions[i3 + 2] = (Math.random() - 0.5) * 15000;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.2, 0.7 + Math.random() * 0.3);
      colors[i3] = color.r; colors[i3 + 1] = color.g; colors[i3 + 2] = color.b;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 1.2, vertexColors: true, sizeAttenuation: true, transparent: true, opacity: 0.9,
      map: getCircleTexture(), alphaTest: 0.01
    });
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
  }, []);

  const createNebula = useCallback((scene: THREE.Scene) => {
    const nebula = new THREE.Group();
    const count = 12;
    const colors = [0x4400aa, 0x0044aa, 0x6600aa, 0x003366];
    
    for (let i = 0; i < count; i++) {
      const geo = new THREE.PlaneGeometry(8000, 8000);
      const mat = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.05,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.BackSide,
      });
      const plane = new THREE.Mesh(geo, mat);
      
      const angle = (i / count) * Math.PI * 2;
      const radius = 10000;
      plane.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 5000,
        Math.sin(angle) * radius
      );
      plane.lookAt(0, 0, 0);
      nebula.add(plane);
    }
    scene.add(nebula);
    nebulaRef.current = nebula;
  }, []);

  const createLights = useCallback((scene: THREE.Scene) => {
    scene.add(new THREE.AmbientLight(0x202030, 0.4));
    const sunLight = new THREE.DirectionalLight(0xfff7d6, 1.2);
    sunLight.position.set(100, 100, 100);
    scene.add(sunLight);
    
    // Add glowing environmental lights that pulse
    const lights: THREE.PointLight[] = [];
    for (let i = 0; i < 30; i++) {
        const light = new THREE.PointLight(
            new THREE.Color().setHSL(Math.random(), 0.5, 0.7),
            0.8,
            8000
        );
        light.position.set(
            (Math.random() - 0.5) * 12000,
            (Math.random() - 0.5) * 12000,
            (Math.random() - 0.5) * 12000
        );
        light.userData = { 
            baseIntensity: 0.8, 
            pulseSpeed: 0.2 + Math.random() * 0.5 
        };
        scene.add(light);
        lights.push(light);
    }
    return lights;
  }, []);

  const createStreamers = useCallback((scene: THREE.Scene) => {
    const streamerCount = 50;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(streamerCount * 3);
    const vel = new Float32Array(streamerCount);
    for(let i=0; i<streamerCount; i++) {
        pos[i*3] = (Math.random() - 0.5) * 50;
        pos[i*3+1] = (Math.random() - 0.5) * 50;
        pos[i*3+2] = Math.random() * -1000;
        vel[i] = 10 + Math.random() * 20;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
    const points = new THREE.Points(geo, mat);
    scene.add(points);
    return { points, vel };
  }, []);

  // Animation loop
  const streamersRef = useRef<{ points: THREE.Points, vel: Float32Array } | null>(null);
  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    const now = Date.now() * 0.001;
    if (timeDataRef.current.lastNow === 0) timeDataRef.current.lastNow = now;
    const dt = now - timeDataRef.current.lastNow;
    timeDataRef.current.lastNow = now;

    // Warp logic
    const targetWarp = isWarpingRef.current ? 40 : 1;
    timeDataRef.current.warpFactor += (targetWarp - timeDataRef.current.warpFactor) * 0.03;
    const speedMult = timeDataRef.current.warpFactor;

    timeDataRef.current.accumulatedTime += dt * speedMult;
    const time = timeDataRef.current.accumulatedTime;

    // Transition camera base pos perfectly over 3000ms
    const targetPos = UNIVERSE_POSITIONS[targetPageRef.current] || UNIVERSE_POSITIONS['home'];
    if (isWarpingRef.current) {
      const elapsed = Date.now() - warpStartTimeRef.current;
      const t = Math.min(elapsed / 3000, 1);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      cameraBasePosRef.current.lerpVectors(warpStartPosRef.current, targetPos, ease);
    } else {
      cameraBasePosRef.current.copy(targetPos);
    }

    // Animate universes
    universesRef.current.forEach((univ) => {
      const uData = univ.userData;
      if (uData.type === 'home' && uData.core) {
        uData.core.rotation.x = time * 0.05;
        uData.core.rotation.y = time * 0.1;
        uData.ringLayers.forEach((layer: THREE.Group, idx: number) => {
          layer.rotation.y += layer.userData.rotationSpeed * (idx % 2 === 0 ? 1 : -1) * speedMult;
        });
      }
      if (uData.type === 'about') {
        const core = uData.core as THREE.Mesh;
        const clouds = uData.clouds as THREE.Group;
        const points = uData.points as THREE.Points;
        
        if (core) core.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
        if (clouds) {
          clouds.rotation.y += 0.001 * speedMult;
          clouds.children.forEach((c: any, i: number) => {
            c.rotation.z += 0.002 * (i % 2 === 0 ? 1 : -1) * speedMult;
          });
        }
        if (points) points.rotation.y -= 0.002 * speedMult;
      }
      if (uData.type === 'skills') {
        const pulsar = uData.pulsar as THREE.Mesh;
        const beamTop = uData.beamTop as THREE.Points;
        const beamBot = uData.beamBot as THREE.Points;
        const ringGroup = uData.ringGroup as THREE.Group;
        
        if (pulsar) pulsar.rotation.y += 0.5 * speedMult;
        if (beamTop) beamTop.rotation.y += 0.2 * speedMult;
        if (beamBot) beamBot.rotation.y += 0.2 * speedMult;
        if (ringGroup) {
          ringGroup.children.forEach((r: any, i: number) => {
            r.scale.setScalar(1 + Math.sin(time * 3 + i) * 0.1);
            r.rotation.z += 0.01 * speedMult;
          });
        }
      }
      if (uData.type === 'projects') {
        if (uData.disk) {
           uData.disk.rotation.y -= uData.rotationSpeed * speedMult;
        }
        if (uData.coreAnimation) {
           uData.coreAnimation.scale.setScalar(1 + Math.sin(time * 5) * 0.1);
        }
        if (uData.jets) {
           uData.jets.rotation.y += uData.rotationSpeed * 2 * speedMult;
           const positions = uData.jets.geometry.attributes.position.array;
           const velocities = uData.jets.geometry.attributes.aVelocity.array;
           
           for(let i=0; i<velocities.length; i++) {
               const yIdx = i * 3 + 1;
               positions[yIdx] += velocities[i] * speedMult * 0.1;
               
               const isTop = velocities[i] > 0;
               const absY = Math.abs(positions[yIdx]);
               
               if (absY > 35) {
                   positions[yIdx] = (Math.random() * 2) * (isTop ? 1 : -1);
                   const angle = Math.random() * Math.PI * 2;
                   const r = Math.pow(Math.random(), 2) * 0.2;
                   positions[i * 3] = Math.cos(angle) * r;
                   positions[i * 3 + 2] = Math.sin(angle) * r;
               } else {
                   positions[i*3] *= 1.005;
                   positions[i*3+2] *= 1.005;
               }
           }
           uData.jets.geometry.attributes.position.needsUpdate = true;
        }
      }
      if (uData.type === 'experience') {
        const tubes = uData.tubes as THREE.Group;
        const points = uData.points as THREE.Points;
        
        if (tubes) {
          tubes.children.forEach((t: any, i: number) => {
            t.position.z += 0.5 * speedMult;
            if (t.position.z > 20) t.position.z = -100;
          });
        }
        if (points) {
          points.rotation.z += 0.01 * speedMult;
          const pos = points.geometry.attributes.position.array as Float32Array;
          for(let i=0; i<pos.length/3; i++) {
            pos[i*3+2] += 1 * speedMult;
            if (pos[i*3+2] > 50) pos[i*3+2] = -150;
          }
          points.geometry.attributes.position.needsUpdate = true;
        }
      }
      if (uData.type === 'contact') {
        if (uData.disk) {
          uData.disk.rotation.y += uData.rotationSpeed * speedMult;
        }
      }
      if (uData.type === 'station') {
        if (uData.stationRing) uData.stationRing.rotation.y += uData.rotationSpeed * speedMult;
        if (uData.launcher1) {
            uData.launcher1.position.y = 25 + Math.sin(time * 2) * 0.5;
            uData.launcher1.rotation.y = Math.sin(time * 0.5) * 0.1;
        }
        if (uData.galaxies && uData.galaxies.length === 3) {
            // Very slow, majestic rotation for the diverse background galaxies
            uData.galaxies[0].rotation.y -= uData.rotationSpeed * 0.3 * speedMult;
            uData.galaxies[1].rotation.y += uData.rotationSpeed * 0.4 * speedMult;
            uData.galaxies[2].rotation.z += uData.rotationSpeed * 0.2 * speedMult;
        }
      }
    });

    if (nebulaRef.current) {
        nebulaRef.current.rotation.y += 0.0001 * speedMult;
        nebulaRef.current.rotation.x += 0.00005 * speedMult;
    }

    lightsRef.current.forEach((light) => {
      light.intensity = light.userData.baseIntensity * (0.7 + Math.sin(time * light.userData.pulseSpeed) * 0.3);
    });

    // Camera movement
    const targetFov = isWarpingRef.current ? 160 : 60;
    cameraRef.current.fov += (targetFov - cameraRef.current.fov) * 0.05;
    cameraRef.current.updateProjectionMatrix();

    const targetZ = isWarpingRef.current ? 2 : 15;
    localZRef.current += (targetZ - localZRef.current) * 0.05;

    cameraRef.current.position.x = cameraBasePosRef.current.x + mouseRef.current.x * 5;
    cameraRef.current.position.y = cameraBasePosRef.current.y + mouseRef.current.y * 5;
    cameraRef.current.position.z = cameraBasePosRef.current.z + localZRef.current;

    cameraRef.current.lookAt(cameraBasePosRef.current);

    if (streamersRef.current && isWarpingRef.current) {
        const pos = streamersRef.current.points.geometry.attributes.position.array as Float32Array;
        const count = pos.length / 3;
        for(let i=0; i<count; i++) {
            pos[i*3+2] += streamersRef.current.vel[i] * speedMult * 0.5;
            if (pos[i*3+2] > 100) {
                pos[i*3+2] = -1000;
                pos[i*3] = (Math.random() - 0.5) * 100;
                pos[i*3+1] = (Math.random() - 0.5) * 100;
            }
        }
        streamersRef.current.points.geometry.attributes.position.needsUpdate = true;
        streamersRef.current.points.visible = true;
    } else if (streamersRef.current) {
        streamersRef.current.points.visible = false;
    }

    if (composerRef.current) {
        composerRef.current.render();
    } else if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current || !mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000010);
    scene.fog = new THREE.Fog(0x000020, 20, 15000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 20000);
    camera.position.z = 15;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: false, // Turn off for bloom performance
        powerPreference: "high-performance" 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Setup Post-Processing Composer
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5, // slightly more strength for "Wow" factor
        0.5, // radius
        0.85 // threshold
    );
    composer.addPass(bloomPass);

    const gammaPass = new ShaderPass(GammaCorrectionShader);
    composer.addPass(gammaPass);
    composerRef.current = composer;

    universesRef.current.push(
      createHomeUniverse(scene, UNIVERSE_POSITIONS['home']),
      createAboutUniverse(scene, UNIVERSE_POSITIONS['about']),
      createSkillsUniverse(scene, UNIVERSE_POSITIONS['skills']),
      createProjectsUniverse(scene, UNIVERSE_POSITIONS['projects']),
      createExperienceUniverse(scene, UNIVERSE_POSITIONS['experience']),
      createContactUniverse(scene, UNIVERSE_POSITIONS['contact']),
      createStationUniverse(scene, UNIVERSE_POSITIONS['station'])
    );

    lightsRef.current = createLights(scene);
    createStarField(scene);
    createNebula(scene);
    streamersRef.current = createStreamers(scene);
    handleResize();
    animate();
    setIsLoaded(true);

    window.addEventListener("mousemove", handleMouseMove);
    const resizeObserver = new ResizeObserver(() => {
        handleResize();
        if (composerRef.current) {
            composerRef.current.setSize(mountRef.current?.clientWidth || window.innerWidth, mountRef.current?.clientHeight || window.innerHeight);
        }
    });
    resizeObserver.observe(mountRef.current);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current) resizeObserver.unobserve(mountRef.current);
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, [animate, createLights, createStarField, handleMouseMove, handleResize]);

  return (
    <div className={`relative pointer-events-none ${className}`}>
        {/* Loading Overlay */}
        {!isLoaded && (
            <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black pointer-events-auto">
                <div className="relative h-2 w-48 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-full origin-left animate-[loading_2s_ease-in-out_infinite] bg-gradient-to-r from-blue-500 to-purple-500" />
                </div>
                <p className="mt-4 text-xs font-medium tracking-widest text-blue-400 uppercase animate-pulse">
                    Initializing Multiverse
                </p>
            </div>
        )}

      <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 1.5s ease-in-out" }} />
      <div className="pointer-events-none fixed inset-0 z-10" style={{ background: `radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, transparent 70%)`, opacity: 0.7 }} />
      <div className="relative z-20 pointer-events-auto">
        {children}
      </div>
      <style jsx global>{`
        @keyframes loading {
            0% { transform: scaleX(0); transform-origin: left; }
            45% { transform: scaleX(1); transform-origin: left; }
            50% { transform: scaleX(1); transform-origin: right; }
            100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  );
};

export default SpaceBackground;