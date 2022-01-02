const mergeSort = async (arr = array) => {
    const length = arr.length;
    if (length == 1) return arr;

    const mid = Math.floor(length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)

    const sortedLeft = await mergeSort(left)
    const sortedRight = await mergeSort(right)
    return merge(sortedLeft, sortedRight)
}

const merge = async (leftArr, rightArr) => {
    const sorted = []
    let countLeft = 0;
    let countRight = 0;

    while (countLeft < leftArr.length && countRight < rightArr.length) {
        await sleep(10)
        if (leftArr[countLeft] < rightArr[countRight]) {
            sorted.push(leftArr[countLeft]);
            countLeft++;
        } else {
            sorted.push(rightArr[countRight]);
            countRight++;
        }
    }
    while (countLeft < leftArr.length) {
        await sleep(10)
        sorted.push(leftArr[countLeft])
        countLeft++
    }
    while (countRight < rightArr[countRight]) {
        await sleep(10)
        sorted.push(rightArr[countRight])
        countRight++
    }
    console.log(sorted)
    return sorted
}