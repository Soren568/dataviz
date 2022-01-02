import { useState } from "react"
import PathFindingVisualizer from '../../components/visualizers/pathfinding/PathFindingVisualizer'

const index = () => {
    const [userReset, setUserReset] = useState(false)
    const [title, setTitle] = useState('Pathfinding')
    return (
        <div className="w-full h-full">
            <div className="flex flex-col justify-between w-fit mx-auto mt-5 mb-1 items-center">
                <div className="w-full flex justify-between items-center mb-1">
                    <h1 className="uppercase font-semibold tracking-wider">{title}</h1>
                    <div className="flex space-x-4 text-xs text-slate-600 uppercase items-center">
                        <div className="flex items-center space-x-1">
                            <p>Start</p>
                            <div className="w-4 h-4 bg-teal-300 border-slate-600 border-[1px] rounded-sm"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <p>Destination</p>
                            <div className="w-4 h-4 bg-fuchsia-600 border-slate-600 border-[1px] rounded-sm"></div>
                        </div>
                        <button className="p-1 bg-blue-500 text-white rounded-lg px-2 " onClick={() => setUserReset(prev => !prev)}> Reset</button>
                    </div>
                </div>
                <PathFindingVisualizer userReset={userReset} />
            </div>
        </div>
    )
}

export default index
