"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Float, Text } from "@react-three/drei"
import { Suspense } from "react"

function Scene() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff87" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#00d4ff" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[2, 0]} />
          <meshStandardMaterial color="#00ff87" wireframe />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[4, 2, -2]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={2} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={3}>
        <mesh position={[-5, -2, -1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ffd700" wireframe />
        </mesh>
      </Float>
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
