import styles from "./index.module.css";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

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
        <mesh>
            <textGeometry args={[text, { size: 1, height: 0.2 }]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

function AnimatedSection({
    heading,
    description,
    color,
    flyFrom,
    index,
    inView,
    prevInView,
}: {
    heading: string;
    description: string;
    color: string;
    flyFrom: "left" | "right" | "bottom";
    index: number;
    inView: boolean;
    prevInView: boolean;
}) {
    // Animate in for current, fade out for previous
    const spring = useSpring({
        from:
            flyFrom === "left"
                ? { x: -100, opacity: 0 }
                : flyFrom === "right"
                ? { x: 100, opacity: 0 }
                : { y: 100, opacity: 0 },
        to: inView ? { x: 0, y: 0, opacity: 1 } : { x: 0, y: 0, opacity: 0 },
        config: { tension: 120, friction: 20 },
    });

    return (
        <section className={`${styles.section} ${styles[`section${index}`]}`}>
            <div className={styles.canvasWrapper}>
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                    <ambientLight />
                    <directionalLight position={[0, 5, 5]} />
                    <Html center>
                        <animated.h1
                            style={
                                flyFrom === "left" || flyFrom === "right"
                                    ? {
                                          transform: spring.x.to((x) => `translateX(${x}px)`),
                                          opacity: spring.opacity,
                                          color,
                                          fontSize: "3rem",
                                          margin: 0,
                                      }
                                    : {
                                          transform: spring.y.to((y) => `translateY(${y}px)`),
                                          opacity: spring.opacity,
                                          color,
                                          fontSize: "3rem",
                                          margin: 0,
                                      }
                            }
                        >
                            {heading}
                        </animated.h1>
                    </Html>
                </Canvas>
            </div>
            <animated.div
                className={styles.text}
                style={
                    flyFrom === "left" || flyFrom === "right"
                        ? { transform: spring.x.to((x) => `translateX(${x}px)`), opacity: spring.opacity }
                        : { transform: spring.y.to((y) => `translateY(${y}px)`), opacity: spring.opacity }
                }
            >
                <p>{description}</p>
            </animated.div>
        </section>
    );
}

export default function App() {
    const [refs, inViews] = headings.map(() => useInView({ triggerOnce: false, threshold: 0.5 }));

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
                    inView={inViews[i]}
                    prevInView={i > 0 ? inViews[i - 1] : false}
                />
            ))}
        </div>
    );
}
