import Link from 'next/link'
import { Icon } from '@iconify/react'
const Navbar = () => {
    return (
        <nav className="h-20 py-4 px-20 shadow-xl shadow-blue-50 flex items-center justify-between">
            <Link href="/"><a className="text-4xl font-bold">DataViz</a></Link>
            <div>
                <Icon icon="bx:bx-menu-alt-right" className="md:hidden text-4xl p-1 rounded-lg hover:bg-gray-500 hover:text-white transition-all ease-in-out" />
            </div>
            <div className="hidden md:flex space-x-5 md:visible">
                <Link href="/sorts"><a>Sorts</a></Link>
                <Link href="/pathfinding"><a>Path Finding</a></Link>
                <Link href="/datastructures"><a>Data Structures</a></Link>
            </div>
        </nav>
    )
}

export default Navbar
