import { Icon } from '@iconify/react'

type Props = { row: number, col: number, index: number, ref: any, isStart: boolean, isDestination: boolean, isBlocked: boolean, hoverNode: number, visitedNodes: any }
const GridNode: React.FC<Props> = ({ row, col, index, ref, isStart, isDestination, isBlocked, hoverNode, visitedNodes }) => {
    let additionalCSS = "";
    isStart ? additionalCSS = "bg-teal-300" : null
    isDestination ? additionalCSS = "bg-fuchsia-600" : null
    isBlocked && (!isStart && !isDestination) ? additionalCSS = "bg-gray-500" : null
    hoverNode == index ? console.log(index) : null
    return (
        <div ref={ref} className={`w-4 h-4 border border-gray-800 ${additionalCSS}`} onClick={() => console.log(row, col, index, isBlocked)}>
        </div>
    )
}

export default GridNode
