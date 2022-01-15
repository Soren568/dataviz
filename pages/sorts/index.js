import { useState } from "react"
import SortingVisualizer from "../../components/visualizers/SortingVisualizer"

const index = () => {
    const [userReset, setUserReset] = useState(false)
    const [title, setTitle] = useState("Sorting visualizer")
    const [isPlaying, setIsPlaying] = useState(true);
    return (
        <div className="w-full h-full">
            <div className="flex w-3/4 mx-auto mt-5 mb-1 items-center">
                <h1 className="uppercase font-semibold tracking-wider mr-auto">{title}</h1>
                <button onClick={() => setUserReset(prev => !prev)} className="px-4 py-1 bg-blue-500 text-xs tracking-widest uppercase text-gray-200 hover:bg-blue-600 rounded-lg transition-all ease-in-out">New Array</button>
                {isPlaying ? <button onClick={() => setIsPlaying(false)} className="px-4 py-1 ml-2 bg-red-400 text-xs tracking-widest uppercase text-white hover:bg-rose-600 rounded-lg transition-all ease-in-out">Stop</button> : null}
            </div>
            <SortingVisualizer userReset={userReset} setTitle={setTitle} />
        </div>
    )
}

export default index
