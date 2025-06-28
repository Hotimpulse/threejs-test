import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Desk from "./Desk.tsx";
import { Suspense, useRef, useState } from "react";
import CameraZoom from "./CameraZoom";
import styles from "./styles.module.scss";

export default function Scene() {
    const [zoomedIn, setZoomedIn] = useState(false);
    const orbitRef = useRef(null);

    return (
        <div className={styles.canvas_container}>
            <Canvas
                shadows
                camera={{ position: [2, 2, 5], fov: 50 }}
                onCreated={({ gl }) => {
                    gl.setClearColor("#f0f0f0");
                }}
            >
                <ambientLight intensity={0.3} />
                <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />
                <directionalLight position={[-5, 5, -5]} intensity={0.5} />
                <pointLight position={[0, 3, 0]} intensity={0.5} />

                <Desk onLaptopClick={() => setZoomedIn(true)} />
                {/* <Suspense fallback={null}>
                </Suspense> */}

                <OrbitControls
                    ref={orbitRef}
                    enablePan={false}
                    enableZoom={!zoomedIn}
                    enableRotate={!zoomedIn}
                    mouseButtons={{
                        LEFT: 0, // Disable left click rotate
                        RIGHT: 2,
                        MIDDLE: 1,
                    }}
                />
                {zoomedIn && (
                    <button
                        onClick={() => setZoomedIn(false)}
                        style={{
                            position: "absolute",
                            top: 20,
                            right: 20,
                            zIndex: 10,
                            padding: "8px 16px",
                            background: "#333",
                            color: "#fff",
                            borderRadius: "4px",
                            border: "none",
                        }}
                    >
                        Exit Zoom
                    </button>
                )}

                <CameraZoom zoomedIn={zoomedIn} />
            </Canvas>
        </div>
    );
}
