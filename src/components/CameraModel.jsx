import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

function MovingLight() {
  const lightRef = useRef();

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = clock.getElapsedTime();
      lightRef.current.position.x = Math.sin(t) * 3;
      lightRef.current.position.z = Math.cos(t) * 3;
    }
  });

  return <directionalLight ref={lightRef} position={[2, 2, 2]} intensity={1} />;
}

function RotatingModel() {
  const { scene } = useGLTF("public/assets/originFixedCameraNew.glb");
  const modelRef = useRef();
  const mousePointerLocation = useMousePositionTracker();

  useFrame(({ camera }) => {
    if (modelRef.current) {
      const modelPosition = new THREE.Vector3();
      modelRef.current.getWorldPosition(modelPosition);

      // Convert screen-space mouse position to normalized device coordinates (-1 to 1)
      const mouse = new THREE.Vector3(
        (mousePointerLocation.x / window.innerWidth) * 2 - 1,
        -(mousePointerLocation.y / window.innerHeight) * 2 + 1,
        0.5 // Mid-depth for projection
      );

      // Convert mouse position to world coordinates
      mouse.unproject(camera);

      // Get direction from model to target
      const direction = new THREE.Vector3().subVectors(mouse, modelPosition).normalize();

      // Adjust the forward direction to match model orientation
      const forward = new THREE.Vector3(0, 0, 1);
      const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(forward, direction);

      // Reduce sensitivity by lowering slerp factor
      modelRef.current.quaternion.slerp(targetQuaternion, 0.08);
    }
  });

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={1.0} position={[0, -0.04, 0]} />
    </group>
  );
}

const useMousePositionTracker = () => {
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (event) => {i
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
};

export default function CameraModel(props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 14 }}
      className="w-full h-screen flex items-center justify-center"
    >
      {/* Ambient light */}
      <ambientLight intensity={0.3} />

      {/* Directional Light */}
      <MovingLight />

      {/* Environment for reflections */}
      {props.lighting ? <Environment preset="studio" /> : <></>}
      

      {/* Properly Rotating Model */}
      <RotatingModel />
    </Canvas>
  );
}
