import { useGLTF } from '@react-three/drei';
import { Float } from '@react-three/drei';
import { MotionValue, useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

type ModelProps = {
  smoothMouse: { x: MotionValue<number>; y: MotionValue<number> };
};

type TMeshProps = {
  node: THREE.Mesh;
  mouse: { x: MotionValue<number>; y: MotionValue<number> };
  multiplier: number;
};

export default function Model({ smoothMouse }: ModelProps) {
  const { nodes } = useGLTF('/medias/balloons.gltf', true);

  return (
    <Float>
      <group>
        {Object.keys(nodes).map((key, index) => {
          const node = nodes[key] as THREE.Mesh;

          if (!node.isMesh) return null;

          const randomMultiplier = Math.random() * 10 + 1;
          
          return <Mesh key={index} node={node} mouse={smoothMouse} multiplier={randomMultiplier} />;
        })}
      </group>
    </Float>
  );
}

function Mesh({ node, mouse, multiplier }: TMeshProps) {
  const { castShadow, receiveShadow, geometry, material, position, rotation, scale } = node;

  const rotationX = useTransform(mouse.x, [0, 1], [rotation.x - multiplier / 2, rotation.x + multiplier / 2]);
  const rotationY = useTransform(mouse.y, [0, 1], [rotation.y - multiplier / 2, rotation.y + multiplier / 2]);

  const positionX = useTransform(mouse.x, [0, 1], [position.x - multiplier / 2, position.x + multiplier / 2]);
  const positionY = useTransform(mouse.y, [0, 1], [position.y - multiplier, position.y + multiplier]);

  return (
    <motion.mesh
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation}
      scale={scale}
      rotation-x={rotationY}
      rotation-y={rotationX}
      position-x={positionX}
      position-y={positionY}
    ></motion.mesh>
  );
}

useGLTF.preload('/medias/balloons.gltf');
