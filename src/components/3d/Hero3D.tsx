"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Float, Text } from "@react-three/drei"
import { Suspense } from "react"

function Scene() {
  return (
    <>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff87" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#00d4ff" />
      <spotLight position={[0, 10, 0]} intensity={2} angle={0.5} penumbra={1} color="#ffffff" />
      
      {/* Central Core Structure */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <group>
          {/* Main Crystal */}
          <mesh position={[0, 0, 0]}>
            <icosahedronGeometry args={[2, 1]} />
            <meshStandardMaterial 
              color="#ffffff" 
              wireframe 
              transparent 
              opacity={0.1} 
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.8, 0]} />
            <meshStandardMaterial 
              color="#00d4ff" 
              emissive="#00d4ff" 
              emissiveIntensity={0.5} 
              transparent 
              opacity={0.2}
            />
          </mesh>
          
          {/* Orbiting Tech Rings */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3, 0.01, 16, 100]} />
            <meshStandardMaterial color="#00ff87" emissive="#00ff87" emissiveIntensity={2} />
          </mesh>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <torusGeometry args={[3.5, 0.005, 16, 100]} />
            <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1} />
          </mesh>
        </group>
      </Float>

      {/* Floating Data Nodes */}
      {[...Array(20)].map((_, i) => (
        <Float key={i} speed={Math.random() * 2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10 - 5
          ]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#00ff87" : "#00d4ff"} emissive={i % 2 === 0 ? "#00ff87" : "#00d4ff"} emissiveIntensity={2} />
          </mesh>
        </Float>
      ))}
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
