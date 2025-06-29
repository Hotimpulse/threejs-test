import styles from "./index.module.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { useRef, useState } from "react";
import { Mesh } from "three";

function SpinningShapes() {
    const sphereRef = useRef<Mesh>(null);
    const torusRef = useRef<Mesh>(null);
    const coneRef = useRef<Mesh>(null);

    useFrame((_, delta) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y += 0.18 * delta;
            sphereRef.current.rotation.x += 0.08 * delta;
        }
        if (torusRef.current) {
            torusRef.current.rotation.x += 0.12 * delta;
            torusRef.current.rotation.z += 0.09 * delta;
        }
        if (coneRef.current) {
            coneRef.current.rotation.y += 0.09 * delta;
            coneRef.current.rotation.x += 0.13 * delta;
        }
    });

    return (
        <>
            {/* 3D rectangle backdrop */}
            <mesh position={[0, -1.5, -2]} scale={[2.2, 2.2, 1]}>
                <boxGeometry args={[8, 4, 1]} />
                <meshStandardMaterial color="#e0eaff" transparent opacity={0.45} />
            </mesh>
            {/* Spinning shapes, subtle and balanced */}
            <mesh ref={sphereRef} position={[2.5, 2.2, -1.5]} scale={[1.5, 1.5, 1.5]}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshStandardMaterial color="#b3c6ff" opacity={0.6} transparent />
            </mesh>
            <mesh ref={torusRef} position={[-3, -2.2, -1.2]} scale={[1.2, 1.2, 1.2]}>
                <torusGeometry args={[0.7, 0.25, 16, 100]} />
                <meshStandardMaterial color="#ffd6e0" opacity={0.6} transparent />
            </mesh>
            <mesh ref={coneRef} position={[-2.5, 2.5, -1.8]} scale={[1.1, 1.1, 1.1]}>
                <coneGeometry args={[0.5, 1.4, 32]} />
                <meshStandardMaterial color="#d6ffe0" opacity={0.6} transparent />
            </mesh>
        </>
    );
}

function Heading3D({ text, color }: { text: string; color: string }) {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [pointer, setPointer] = useState({ x: 0, y: 0 });

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.x += (pointer.x - meshRef.current.position.x) * 0.08;
            meshRef.current.position.y += (pointer.y - meshRef.current.position.y) * 0.08;
        }
    });

    return (
        <group>
            {/* Large invisible plane for pointer events */}
            <mesh
                position={[0, 0, 0]}
                scale={[7, 2.5, 1]}
                onPointerMove={(e) => {
                    setPointer({ x: e.point.x * 0.5, y: e.point.y * 0.5 });
                    setHovered(true);
                }}
                onPointerOut={() => {
                    setPointer({ x: 0, y: 0 });
                    setHovered(false);
                }}
                visible={false}
            >
                <planeGeometry args={[7, 2.5]} />
            </mesh>
            <group ref={meshRef}>
                <Text3D
                    font={"/assets/helvetiker_regular.typeface.json"}
                    size={0.7}
                    height={0.25}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.04}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={[-2.5, 0, 0]}
                >
                    {text}
                    <meshStandardMaterial color={hovered ? "#fff" : color} />
                </Text3D>
            </group>
        </group>
    );
}

export default function App() {
    return (
        <div className={styles.main}>
            {/* Fullscreen 3D background */}
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 0 }}
            >
                <ambientLight intensity={0.7} />
                <directionalLight position={[0, 5, 5]} intensity={0.7} />
                <SpinningShapes />
            </Canvas>
            {/* Centered overlay with 3D heading and description */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                    pointerEvents: "none",
                }}
            >
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 60 }}
                    style={{ background: "transparent", width: 700, height: 120, pointerEvents: "auto" }}
                >
                    <Heading3D text="Welcome to 3D World" color="#ff6f61" />
                </Canvas>
                <div
                    style={{
                        marginTop: 32,
                        color: "#222",
                        fontSize: 24,
                        background: "rgba(255,255,255,0.7)",
                        borderRadius: 12,
                        padding: "18px 36px",
                        fontWeight: 500,
                        boxShadow: "0 2px 16px #0001",
                        pointerEvents: "auto",
                    }}
                >
                    Experience immersive 3D headings and mesmerizing animated backgrounds.
                </div>
            </div>
        </div>
    );
}
