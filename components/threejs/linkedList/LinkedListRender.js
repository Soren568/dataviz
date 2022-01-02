import { Html, OrbitControls, OrthographicCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Box2, BoxBufferGeometry, Light, Mesh } from "three"

const NodeModel = ({ position, rotationSpeed }) => {
    const testRef = useRef()
    useFrame(() =>
        (testRef.current.rotation.x = testRef.current.rotation.y = testRef.current.rotation.z += rotationSpeed)
    )
    return (
        <mesh position={position} ref={testRef}>
            <octahedronGeometry args={[.5, 3]} />
            <meshStandardMaterial emissive="0x0000" roughness={.1} shininess={100} color={0xffffff} flatShading={true} />
            <Html position={[0, 0, 0]}>
                <p className="bg-gray-800 text-gray-50 text-xs p-1 rounded-lg opacity-50 h-10 w-16">
                    Value: 10 <br />
                    Next:
                </p>
            </Html>
        </mesh>
    )
}


function LinkedListRender() {

    return (
        <Canvas camera={{ position: [0, 2, 7], fov: 10 }} >
            {/* <OrthographicCamera makeDefault position={[0, 2, 3]} zoom={80} /> */}
            <gridHelper args={[20, 10]} />
            <pointLight intensity={1} color={0x9333ea} position={[-2, 0, 1]} />
            <pointLight intensity={.5} color={0x00ff00} position={[0, 0, 2]} />
            <pointLight intensity={.5} color={0x0000ff} position={[2, 0, 5]} />
            <group>
                <NodeModel position={[-2.25, 2, 0]} rotationSpeed={.01} />
                <NodeModel position={[-.75, 2, 0]} rotationSpeed={.0075} />
                <NodeModel position={[.75, 2, 0]} rotationSpeed={.005} />
                <NodeModel position={[2.25, 2, 0]} rotationSpeed={.005} />
            </group>

            <OrbitControls target={[0, 2, 0]} enabled={false} />
        </Canvas>
    )
}

export default LinkedListRender
