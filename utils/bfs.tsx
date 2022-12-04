
import animateRes
type Props = { startCell: number | boolean[], }
export default const BFS: React.FC<Props> = async () => {
    let visited = new Set()
    let queue = [startCell]
    let i = 0
    while (queue.length > 0) {
        i++
        let current = queue.shift()
        if (current[5] == true) return animateShortestPathResult(current)
        // console.log({ current })
        // console.log({ queue })
        let [curRow, curCol, curRefIdx, isBlocked] = current
        if (!isBlocked) {
            visited.has(curRow + ',' + curCol) ? null : visited.add(curRow + ',' + curCol)
            if (!current[4]) {
                await animateVisit(current)
            }
            let distance = current[6]
            if (curRow - 1 >= 0 && visited.has((curRow - 1) + ',' + curCol) != true) {
                nodes[curRow - 1][curCol][6] = distance + 1
                queue.push(nodes[curRow - 1][curCol])
                visited.add((curRow - 1) + ',' + curCol)
            }
            if (curRow + 1 < nodes.length && visited.has((curRow + 1) + ',' + curCol) != true) {
                nodes[curRow + 1][curCol][6] = distance + 1
                queue.push(nodes[curRow + 1][curCol])
                visited.add((curRow + 1) + ',' + curCol)
            }
            if (curCol + 1 < nodes[0].length && visited.has(curRow + ',' + (curCol + 1)) != true) {
                nodes[curRow][curCol + 1][6] = distance + 1
                queue.push(nodes[curRow][curCol + 1])
                visited.add(curRow + ',' + (curCol + 1))
            }
            if (curCol - 1 >= 0 && visited.has(curRow + ',' + (curCol - 1)) != true) {
                nodes[curRow][curCol - 1][6] = distance + 1
                queue.push(nodes[curRow][curCol - 1])
                visited.add(curRow + ',' + (curCol - 1))
            }
        }
    }
}