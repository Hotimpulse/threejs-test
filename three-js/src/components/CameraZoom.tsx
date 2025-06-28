import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useSpring, config } from "@react-spring/three";

type Props = {
    zoomedIn: boolean;
};

export default function CameraZoom({ zoomedIn }: Props) {
    const { camera } = useThree();

    const { position } = useSpring({
        position: zoomedIn ? [0, 1.3, 1.5] : [2, 2, 5], // adjust as needed
        config: config.slow,
        onChange: (props) => {
            camera.position.set(...props.value.position);
            camera.lookAt(0, 1.1, 0); // Focus on laptop screen
        },
    });

    useEffect(() => {
        camera.lookAt(0, 1.1, 0);
    }, [zoomedIn]);

    return null;
}
