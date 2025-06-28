import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import { useCursor, useThree } from "@react-three/fiber";
// import { Mesh } from "three";
// import { GLTF } from "three-stdlib";
import screenTexture from "../assets/Cart.png";

type Props = {
    onLaptopClick: () => void;
};

export default function Desk({ onLaptopClick }: Props) {
    const { scene } = useGLTF("/src/assets/desk.gltf");
    const texture = useTexture(screenTexture);
    const { gl, camera, scene: threeScene } = useThree();

    useEffect(() => {
        scene.traverse((child: any) => {
            // Apply texture to the screen
            if (child.name.toLowerCase().includes("screen")) {
                child.material.map = texture;
                child.material.needsUpdate = true;

                // Enable click on laptop screen
                child.userData.clickable = true;
            }
        });
    }, [scene, texture]);

    // Raycasting to detect clicks
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const mouse = {
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1,
            };

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                const firstHit = intersects[0].object;
                if (firstHit.userData.clickable) {
                    onLaptopClick();
                }
            }
        };

        gl.domElement.addEventListener("click", handleClick);
        return () => gl.domElement.removeEventListener("click", handleClick);
    }, [scene, camera, gl, onLaptopClick]);

    return (
        <>
            <primitive object={scene} position={[0, 0, 0]} scale={1} />
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#eeeeee" />
            </mesh>
        </>
    );
}
