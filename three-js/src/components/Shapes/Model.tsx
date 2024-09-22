import { useGLTF } from "@react-three/drei";
import { Float } from "@react-three/drei";
import { useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";

export default function Model({ mouse }) {
  const { nodes } = useGLTF("/medias/balloons.gltf");
  const random = Math.floor(Math.random() * 10) + 1;

  return (
    <Float>
      <group>
        {Array.from(
          { length: 75 },
          (_, index) =>
            index !== 0 && index !== 74 && (
              <Mesh
                key={index}
                node={nodes[`Balloon_${index}`]}
                mouse={mouse}
                multiplier={random}
              />
            )
        )}
      </group>
    </Float>
  );
}

function Mesh({ node, mouse, multiplier }) {
  const {
    castShadow,
    receiveShadow,
    geometry,
    material,
    position,
    rotation,
    scale,
  } = node;

  const rotationX = useTransform(
    mouse.x,
    [0, 1],
    [rotation.x - multiplier, rotation.x + multiplier]
  );

  return (
    <motion.mesh
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation}
      scale={scale}
      rotation-x={rotationX}
    ></motion.mesh>
  );
}

useGLTF.preload("/medias/balloons.gltf");
