import { useState } from "react"
import PathFindingVisualizer from '../../components/visualizers/pathfinding/PathFindingVisualizer'

const index = () => {
    const [userReset, setUserReset] = useState(false)
    const [title, setTitle] = useState('Pathfinding')
    return (
        <div className="w-full h-full">
            <div className="flex flex-col justify-between w-fit mx-auto mt-5 mb-1 items-center">

                <PathFindingVisualizer />
            </div>
        </div>
    )
}

export default index
