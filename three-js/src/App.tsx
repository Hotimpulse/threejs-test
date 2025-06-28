import styles from "./index.module.css";
import { Canvas } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { Text } from "@react-three/drei";

const headings = [
    {
        text: "Welcome to 3D World",
        color: "#ff6f61",
        flyFrom: "left",
        description: "Experience immersive 3D headings as you scroll.",
    },
    {
        text: "Scroll for Magic",
        color: "#6b5b95",
        flyFrom: "right",
        description: "Each heading animates in with smooth transitions.",
    },
    {
        text: "Enjoy the Journey",
        color: "#88b04b",
        flyFrom: "bottom",
        description: "Text and 3D effects combine for a unique experience.",
    },
];

function Heading3D({ text, color }: { text: string; color: string }) {
    return (
        <Text position={[0, 0, 0]} fontSize={0.7} color={color} anchorX="center" anchorY="middle">
            {text}
        </Text>
    );
}

function AnimatedSection({
    heading,
    description,
    color,
    flyFrom,
    index,
}: {
    heading: string;
    description: string;
    color: string;
    flyFrom: "left" | "right" | "bottom";
    index: number;
}) {
    const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });
    const spring = useSpring({
        from:
            flyFrom === "left"
                ? { tx: -100, ty: 0, opacity: 0 }
                : flyFrom === "right"
                ? { tx: 100, ty: 0, opacity: 0 }
                : { tx: 0, ty: 100, opacity: 0 },
        to: inView
            ? { tx: 0, ty: 0, opacity: 1 }
            : flyFrom === "left"
            ? { tx: -100, ty: 0, opacity: 0 }
            : flyFrom === "right"
            ? { tx: 100, ty: 0, opacity: 0 }
            : { tx: 0, ty: 100, opacity: 0 },
        config: { tension: 120, friction: 20 },
    });

    return (
        <section ref={ref} className={`${styles.section} ${styles[`section${index}`]}`}>
            <div className={styles.canvasWrapper}>
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                    <ambientLight />
                    <directionalLight position={[0, 5, 5]} />
                    <Heading3D text={heading} color={color} />
                </Canvas>
            </div>
            <animated.div
                className={styles.text}
                style={{
                    transform:
                        flyFrom === "left" || flyFrom === "right"
                            ? spring.tx.to((x) => `translateX(${x}px)`)
                            : spring.ty.to((y) => `translateY(${y}px)`),
                    opacity: spring.opacity,
                }}
            >
                <p>{description}</p>
            </animated.div>
        </section>
    );
}

export default function App() {
    return (
        <div className={styles.main}>
            {headings.map((h, i) => (
                <AnimatedSection
                    key={i}
                    heading={h.text}
                    description={h.description}
                    color={h.color}
                    flyFrom={h.flyFrom as "left" | "right" | "bottom"}
                    index={i}
                />
            ))}
        </div>
    );
}
