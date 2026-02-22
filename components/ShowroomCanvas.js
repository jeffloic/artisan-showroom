"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, useGLTF } from "@react-three/drei";

/* ── GLB Model with dynamic color ── */
function Model({ productColor = "#8B4513", modelId = "puffy-chair" }) {
    const { scene } = useGLTF(`/models/${modelId}.glb`);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.color.set(productColor);
            }
        });
    }, [scene, productColor]);

    return <primitive object={scene} scale={1.5} castShadow receiveShadow />;
}

/* ── Floor plane ── */
function Floor() {
    return (
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
    );
}

/* ── Main canvas ── */
export default function ShowroomCanvas({ productColor = "#8B4513", modelId = "puffy-chair" }) {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 1.5, 4], fov: 45 }}
        >
            <Suspense fallback={null}>
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight
                    castShadow
                    position={[5, 8, 5]}
                    intensity={1.2}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={20}
                    shadow-camera-left={-5}
                    shadow-camera-right={5}
                    shadow-camera-top={5}
                    shadow-camera-bottom={-5}
                />

                {/* Environment for realistic reflections */}
                <Environment preset="studio" environmentIntensity={0.5} />

                {/* Controls — slow cinematic auto-rotation */}
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={0.5}
                    enablePan={false}
                    enableZoom={false}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2.2}
                />

                {/* Scene objects */}
                <Model key={modelId} productColor={productColor} modelId={modelId} />

                {/* Realistic contact shadows beneath the model */}
                <ContactShadows
                    position={[0, -0.8, 0]}
                    opacity={0.7}
                    scale={15}
                    blur={2}
                    far={4}
                />
            </Suspense>
        </Canvas>
    );
}
