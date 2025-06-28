import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment } from "@react-three/drei";
import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import ReactDOM from "react-dom";
import styles from "./shapesStyles.module.scss";

const Shapes = () => {
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
            window.removeEventListener("mousemove", manageMouseMove);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const shapesCanvas = (
        <div className={styles.canvas_container}>
            <Canvas orthographic camera={{ position: [-374.745, -466.306, -48.471], zoom: 3 }}>
                <ambientLight intensity={0.3} />
                <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />
                <directionalLight position={[-5, 5, -5]} intensity={0.5} />
                <pointLight position={[0, 3, 0]} intensity={0.5} />
                <Model smoothMouse={smoothMouse} />
                <Environment preset="warehouse" />
            </Canvas>
        </div>
    );

    return ReactDOM.createPortal(shapesCanvas, document.body);
};

export default Shapes;
