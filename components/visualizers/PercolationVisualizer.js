import { useEffect, useState, createRef, useRef } from "react"

import sleep from '../../utils/sleep'

function PercolationVisualizer({ }) {
    const [title, setTitle] = useState("Percolation")
    const [nodes, setNodes] = useState([]);
    const [userReset, setUserReset] = useState(false)
    const [nodeRefs, setNodeRefs] = useState([]);
    const [hoverIdx, setHoverIdx] = useState();
    const [visitedNodes, setVisitedNodes] = useState(new Map());

    const NUM_ROWS = 24
    const NUM_COLS = 24
    const PERC_PROB = .6



    useEffect(() => {
        setTitle("percolation")
        setGrid()
    }, [userReset])

    async function setGrid() {
        let tempRefArr = Array(NUM_ROWS * NUM_COLS).fill().map(() => createRef())
        const nodeArr = [];
        let i = 0
        for (let r = 0; r < NUM_ROWS; r++) {
            const currentRow = [];
            for (let c = 0; c < NUM_COLS; c++) {
                let isBlocked = Math.random() > PERC_PROB;
                animateReset([r, c, i, isBlocked])
                currentRow.push([r, c, i, isBlocked])
                i++
            }
            nodeArr.push(currentRow)
        }
        setVisitedNodes(new Map())
        setNodeRefs(tempRefArr)
        setNodes(nodeArr)
    }

    const runPercolation = async (nodes) => {
        let failed = {}
        let visited = {}
        for (let i = 0; i < NUM_COLS; i++) {
            if (nodes[0][i][3] == false) {
                var percolates = await explore(nodes, 0, i, visited, failed)
                if (percolates) {
                    await animateResult(visited, true)
                    break
                } else {
                    failed = { ...failed, ...visited }
                    visited = {}
                    await animateResult(failed, false)
                }
            }
        }
        if (percolates) {
            setTitle("percolates")
        } else {
            setTitle("does not percolate")
        }
    }
    async function animateReset(visitedNode) {
        if (nodeRefs[visitedNode[2]] != undefined && !visitedNode[3]) {
            nodeRefs[visitedNode[2]].className = "w-4 h-4 border border-gray-800 bg-gray-700"
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

    async function explore(nodes, row, col, visited, failed) {
        let queue = [nodes[row][col]]

        while (queue.length > 0) {
            let current = queue.shift();
            await animateVisit(current)
            if (current[0] == 23) {
                visited[current[2]] = true
                return true
            };
            console.log(failed)
            if (!visited[current[2]] && !failed[current[2]]) {
                // if in bounds && open && not visited
                if (current[0] - 1 > -1 && nodes[current[0] - 1][current[1]][3] == false && !visited[nodes[current[0] - 1][current[1]][2]]) {
                    queue.push(nodes[current[0] - 1][current[1]])
                }
                if (current[0] + 1 < 24 && nodes[current[0] + 1][current[1]][3] == false && !visited[nodes[current[0] + 1][current[1]][2]]) {
                    queue.push(nodes[current[0] + 1][current[1]])
                }
                if (current[1] - 1 > -1 && nodes[current[0]][current[1] - 1][3] == false && !visited[nodes[current[0]][current[1] - 1][2]]) {
                    queue.push(nodes[current[0]][current[1] - 1])
                }
                if (current[1] + 1 < 24 && nodes[current[0]][current[1] + 1][3] == false && !visited[nodes[current[0]][current[1] + 1][2]]) {
                    queue.push(nodes[current[0]][current[1] + 1])
                }

            }
            visited[current[2]] = true;
        }

        return false
    }

    let titleCSS = "uppercase font-semibold tracking-wider"
    if (title == "does not percolate") {
        titleCSS = "uppercase font-semibold tracking-wider text-red-600"
    } else if (title == "percolates") {
        titleCSS = "uppercase font-semibold tracking-wider text-green-600"
    }

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center mb-1">
                <h1 className={titleCSS}>{title}</h1>
                <div className="flex text-xs space-x-2">
                    <button className="p-1 bg-blue-500 text-white rounded-lg px-2 " onClick={() => runPercolation(nodes)}> Start</button>
                    <button className="p-1 bg-blue-500 text-white rounded-lg px-2 " onClick={async () => { setUserReset(prev => !prev) }}> Reset</button>
                </div>
            </div>
            <div className="h-96 w-fit mx-auto bg-gray-700 flex flex-col">
                {nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx} className="flex">
                            {row.map((node, i) => {
                                let bg = node[3] ? " bg-slate-500 " : " bg-slate-700 "
                                // let border = node[2] == hoverIdx ? " border-gray-400 " : " border-gray-800 "
                                let css = `w-4 h-4 border border-gray-800 ${bg}`
                                return (
                                    <div ref={(ref) => { nodeRefs[node[2]] = ref; return true; }} visited="false" className={css} key={i} onMouseEnter={() => { setHoverIdx(node[2]) }} onMouseLeave={() => { setHoverIdx() }}>
                                    </div>)
                            })}
                        </div>
                    )
                })}
            </div>
            <div className="flex text-xs text-slate-600 uppercase justify-between w-full mt-1">
                <div className="flex space-x-4">
                    <div className="flex items-center space-x-1">
                        <p>Open</p>
                        <div className="w-4 h-4 bg-slate-600 border-slate-600 border-[1px] rounded-sm"></div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <p>Blocked</p>
                        <div className="w-4 h-4 bg-slate-400 border-slate-600 border-[1px] rounded-sm"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PercolationVisualizer