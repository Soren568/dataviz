import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/fiber'
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Model_BST from './Model_BST';
import { OrbitControls, Shadow } from '@react-three/drei';
import { AxesHelper, GridHelper, PlaneBufferGeometry, SpotLight } from 'three';
const Render = () => {
    return (
        <>
            <Canvas
                camera={{
                    fov: 100,
                    position: [-10, 5, -5],
                }}
            >
                <mesh>
                    {/* <gridHelper args={[20, 10]} /> */}

                </mesh>
                <pointLight intensity={.5} color={0x9333ea} position={[-5, 0, 5]} />
                <pointLight intensity={.2} color={0x00ff00} position={[0, 0, 5]} />
                <pointLight intensity={.5} color={0x0000ff} position={[5, 0, 5]} />
                {/* <rectAreaLight args={[0x4338ca, 20, 10, 10]} position={[0, 0, 0]} /> */}
                <Model_BST />
                <OrbitControls maxDistance={20} minDistance={10} maxPolarAngle={180} />
                {/* <pointLight color="green" position={[-0, 10, 0]} />
                <pointLight color="indianred" position={[-20, 10, 50]} /> */}
            </Canvas>
        </>
    )
}

export default Render
