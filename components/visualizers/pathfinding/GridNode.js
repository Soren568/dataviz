import { Icon } from '@iconify/react'


function GridNode({ row, col, isStart, isDestination }) {
    let additionalCSS = "";
    isStart ? additionalCSS = "bg-teal-300" : null
    isDestination ? additionalCSS = "bg-fuchsia-600" : null
    return (
        <div className={`w-4 h-4 border border-gray-800 ${additionalCSS}`} onClick={() => console.log(row, col)}>
        </div>
    )
}

export default GridNode
