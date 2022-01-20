
import { useEffect, useState, createRef, useRef } from "react"
import randomNumber from "../../../utils/random";

// Need to clarify if the node is the start node or the end node.
//      each node has a row, col property to track where it is.
//      useState(isStart, isFinish)

function PathFindingVisualizer({ }) {
    const [title, setTitle] = useState("PathFinding")
    const [nodes, setNodes] = useState([]);
    const [userReset, setUserReset] = useState(false)
    const [nodeRefs, setNodeRefs] = useState([]);
    const [hoverIdx, setHoverIdx] = useState();
    const [visitedNodes, setVisitedNodes] = useState(new Map());

    const NUM_ROWS = 61
    const NUM_COLS = 24
    let randomStartCoords = [0, 0];
    let randomDestinationCoords = [23, 60];

    useEffect(() => {
        setGrid()
    }, [userReset])

    async function setGrid() {
        randomStartCoords = [randomNumber(0, NUM_ROWS / 4), randomNumber(0, NUM_COLS)];
        randomDestinationCoords = [randomNumber(NUM_ROWS / 2, NUM_ROWS), randomNumber(0, NUM_COLS)];
        let tempRefArr = Array(NUM_ROWS * NUM_COLS).fill().map(() => createRef())
        const nodeArr = [];
        let i = 0
        for (let r = 0; r < NUM_ROWS; r++) {
            const currentRow = [];
            for (let c = 0; c < NUM_COLS; c++) {
                let isStart = false;
                let isDest = false;
                let isBlocked = Math.random() > .7;
                if (r == randomStartCoords[0] && c == randomStartCoords[1]) {
                    isStart = true
                    isBlocked = false
                }
                if (r == randomDestinationCoords[0] && c == randomDestinationCoords[1]) {
                    isDest = true
                    isBlocked = false
                }
                animateReset([r, c, i, isBlocked, isStart, isDest])
                currentRow.push([r, c, i, isBlocked, isStart, isDest])
                i++
            }
            nodeArr.push(currentRow)
        }
        setVisitedNodes(new Map())
        setNodeRefs(tempRefArr)
        setNodes(nodeArr)
    }

    async function animateReset(visitedNode) {
        if (nodeRefs[visitedNode[2]] != undefined && !visitedNode[3]) {
            nodeRefs[visitedNode[2]].className = "w-4 h-4 border border-gray-800 bg-slate-700"
            nodeRefs[visitedNode[2]].visited = "false"
        } else {
            return visitedNode
        }
    }
    async function animateVisit(visitedNode) {
        await sleep(4)
        nodeRefs[visitedNode[2]].visited = "true"
        return nodeRefs[visitedNode[2]].className = "w-4 h-4 border border-gray-800 bg-[#1C6CCC]"
    }
    async function animateResult(component, percolates) {
        if (percolates == true) {
            for (let nodeIdx in component) {
                nodeRefs[nodeIdx].className = 'w-4 h-4 border border-gray-800 bg-[#17A7FF]'
            }

        } else {
            for (let nodeIdx in component) {
                nodeRefs[nodeIdx].className = 'w-4 h-4 border border-gray-800 bg-[#1E4EB3]'
            }
        }
    }

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center mb-1">
                <h1 className="uppercase font-semibold tracking-wider">{title}</h1>
                <div className="flex space-x-4 text-xs text-slate-600 uppercase items-center">
                    <div className="flex items-center space-x-1">
                        <p>Start</p>
                        <div className="w-4 h-4 bg-green-300 border-slate-600 border-[1px] rounded-sm"></div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <p>Destination</p>
                        <div className="w-4 h-4 bg-red-300 border-slate-600 border-[1px] rounded-sm"></div>
                    </div>
                    <button className="p-1 bg-blue-500 text-white rounded-lg px-2 " onClick={() => setUserReset(prev => !prev)}> Reset</button>
                </div>
            </div>
            <div className="h-96 w-fit mx-auto bg-gray-700 flex">
                {nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, i) => {
                                let bg;
                                if (node[4] == true) {
                                    bg = "bg-green-300"
                                } else if (node[5] == true) {
                                    bg = 'bg-red-300'
                                } else {
                                    bg = node[3] ? " bg-slate-500 " : " bg-slate-700 "
                                }
                                // let border = node[2] == hoverIdx ? " border-gray-400 " : " border-gray-800 "
                                let css = `w-4 h-4 border border-gray-800 ${bg}`
                                return (
                                    <div key={i} ref={(ref) => { nodeRefs[node[2]] = ref; return true; }} visited="false" className={css} onMouseEnter={() => { setHoverIdx(node[2]) }} onMouseLeave={() => { setHoverIdx() }}>
                                    </div>)
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PathFindingVisualizer
