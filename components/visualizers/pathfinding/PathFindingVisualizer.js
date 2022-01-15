import { useEffect, useState } from "react"
import GridNode from "../../GridNode";
import randomNumber from "../../../utils/random";

// Need to clarify if the node is the start node or the end node.
//      each node has a row, col property to track where it is.
//      useState(isStart, isFinish)

function PathFindingVisualizer({ userReset }) {
    const [nodes, setNodes] = useState([]);

    const NUM_ROWS = 61
    const NUM_COLS = 24

    let randomStartCoords = [randomNumber(0, NUM_ROWS / 2), randomNumber(0, NUM_COLS)];
    let randomDestinationCoords = [randomNumber(NUM_ROWS / 2, NUM_ROWS), randomNumber(0, NUM_COLS)];

    useEffect(() => {
        const nodeArr = [];
        for (let r = 0; r < NUM_ROWS; r++) {
            const currentRow = [];
            for (let c = 0; c < NUM_COLS; c++) {
                currentRow.push([r, c])
            }
            nodeArr.push(currentRow)
        }
        setNodes(nodeArr)
    }, [userReset])

    return (
        <div className="flex flex-col">
            <div className="h-96 w-fit mx-auto bg-gray-700 flex">
                {nodes.map((row, rowIdx) => {
                    return (
                        <div>
                            {row.map((node, i) => {
                                let isStart = false;
                                let isDestination = false;
                                console.log(node, randomStartCoords)
                                if (node[0] == randomStartCoords[0] && node[1] == randomStartCoords[1]) {
                                    isStart = true;
                                };
                                if (node[0] == randomDestinationCoords[0] && node[1] == randomDestinationCoords[1]) {
                                    isDestination = true;
                                };
                                return (<GridNode key={i} row={node[0]} col={node[1]} isStart={isStart} isDestination={isDestination} />)
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PathFindingVisualizer
