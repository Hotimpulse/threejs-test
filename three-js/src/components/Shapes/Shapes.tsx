import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment } from "@react-three/drei";
import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export default function Shapes() {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 75, damping: 100, mass: 3 }),
    y: useSpring(mouse.y, { stiffness: 75, damping: 100, mass: 3 }),
  };

  const manageMouseMove = (e: { clientX: number; clientY: number }) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX / innerWidth;
    const y = clientY / innerHeight;
    mouse.x.set(x);
    mouse.y.set(y);
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.addEventListener("mousemove", manageMouseMove);
    };
  }, []);

  return (
    <Canvas
      orthographic
      camera={{ position: [-374.745, -466.306, -48.471], zoom: 3 }}
      style={{ background: "#019999" }}
    >
      <Model mouse={smoothMouse} />
      <Environment preset="warehouse" />
    </Canvas>
  );
}
