import { Canvas } from "@react-three/fiber";

export default function RippleEffect() {
  return (
    <Canvas>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </Canvas>
  );
}
