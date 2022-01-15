import { Icon } from '@iconify/react'


function GridNode({ row, col, index, ref, isStart, isDestination, isBlocked, hoverNode, visitedNodes }) {
    let additionalCSS = "";
    isStart ? additionalCSS = "bg-teal-300" : null
    isDestination ? additionalCSS = "bg-fuchsia-600" : null
    // hoverNode == index ? additionalCSS = " bg-slate-200 opacity-50" : null
    hoverNode == index ? console.log(index) : null
    return (
        <div ref={ref} className={`w-4 h-4 border border-gray-800 ${additionalCSS}`} onClick={() => console.log(row, col, index, isBlocked)}>
        </div>
    )
}

export default GridNode
