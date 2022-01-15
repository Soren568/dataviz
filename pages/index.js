
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { Canvas } from '@react-three/fiber';
import Render from '../components/threejs/Render';
export default function Home() {
  return (
    <div className="w-full h-full">

      <div className="hero w-full h-full flex">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-2/3">
            <h1 className="text-7xl font-bold mb-8">Welcome to DataViz</h1>
            <p className="text-xl font-light">A place to learn more about algorithms, data structures, and visualization</p>
          </div>
        </div>
        <div className="w-2/3 h-full fixed right-0">
          <Render />
        </div>
      </div>
    </div>
  )
}
