import React, { useState, useEffect, createRef } from 'react'

function SortingVisualizer({ userReset, setTitle, isPlaying }) {
    const [comparing, setComparing] = useState([]);
    const [array, setArray] = useState([])
    const [refArray, setRefArray] = useState([]);
    const [notes, setNotes] = useState("");
    const [hoverVal, setHoverVal] = useState(0);


    useEffect(() => {
        let tempRefArr = Array(array.length).fill().map((num, i) => createRef())
        resetArray()
        setRefArray(tempRefArr)
        setTitle("Sorting Visualizer")
        setNotes("")
        setComparing([])
    }, [userReset])



    // ======================================================================
    // ========================== BUBBLE SORT ============================
    // ======================================================================
    const bubbleSort = async () => {
        setTitle("Bubble Sort")
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                setComparing([j, j + 1])
                if (array[j + 1] < array[j]) {
                    let newHeightJ1 = (array[j] / 1000) * 384;
                    let newHeightJ2 = (array[j + 1] / 1000) * 384;
                    await swap(array, j, (j + 1), 0.2)
                    refArray[j + 1].current.style.height = `${newHeightJ1}px`
                    refArray[j].current.style.height = `${newHeightJ2}px`
                }
            }
        }
        setComparing([])
        setNotes("")
    }


    // ======================================================================
    // ========================== SELECTION SORT ============================
    // ======================================================================
    // Iterate through the array, storing the largest value in maxIndex and then placing at the end. Can also be done in reverse order with minimum
    const selectionSort = async () => {
        setTitle("Selection Sort")
        setNotes("Finding the maximum value")
        for (let i = 0; i < array.length; i++) {
            let maxIndex = 0
            for (let j = 0; j < array.length - i; j++) {
                await sleep(.2)
                setComparing([maxIndex, j])
                if (array[j] > array[maxIndex]) {
                    maxIndex = j
                }
            }
            let heightMax = (array[maxIndex] / 1000) * 384;
            let heightSwapped = (array[array.length - i - 1] / 1000) * 384;
            await swap(array, (array.length - i - 1), maxIndex, .5)
            refArray[array.length - i - 1].current.style.height = `${heightMax}px`
            refArray[maxIndex].current.style.height = `${heightSwapped}px`
        }
        console.log(array)
        setComparing([])
        setNotes("")
    }

    // ======================================================================
    // ========================== INSERTION SORT ============================
    // ======================================================================
    // Move left through all items [0, i-1] until the array[i] is less than the value then continue.
    const insertionSort = async () => {
        setTitle("Insertion Sort")
        console.log(array)
        for (let i = 1; i < array.length; i++) {
            // setTimeout(() => {
            console.log(i)
            let temp = array[i]
            let tempHeight = divHeight(i)
            let j = i - 1;
            while (j >= 0 && array[j] > temp) {
                await sleep(5)
                setComparing([j])
                array[j + 1] = array[j]
                refArray[j + 1].current.style.height = refArray[j].current.style.height
                refArray[j].current.style.height = `${tempHeight}px`
                j--
            }
            array[j + 1] = temp;
            // }, 100 * i);
        }
        console.log(array)
        console.log(refArray)
        setComparing([])
        setNotes("")
    }

    // ======================================================================
    // ========================== QUICK SORT ============================
    // ======================================================================
    const quickSort = async (arr = array, start = 0, end = array.length - 1) => {
        setNotes("Lomuto Partition Method")
        setTitle("Quick Sort")
        if (start >= end) return;
        let index = await partition(arr, start, end);
        await quickSort(arr, start, index - 1)
        await quickSort(arr, index + 1, end)
        setComparing([])
        setNotes("")
    }
    const partition = async (arr, start, end) => {
        // to animate better put the sleep function in a swap helper function and replace at ES6 destructured swaps
        let pivotIdx = start
        let pivotVal = arr[end];
        for (let i = start; i < end; i++) {
            setComparing([end, i])
            await sleep(5)
            if (arr[i] < pivotVal) {
                let heightI = (array[i] / 1000) * 384;
                let heightPivot = (array[pivotIdx] / 1000) * 384;
                await swap(arr, i, pivotIdx, 10)
                refArray[pivotIdx].current.style.height = `${heightI}px`
                refArray[i].current.style.height = `${heightPivot}px`
                pivotIdx++
            }
        }
        let heightEnd = (array[end] / 1000) * 384;
        let heightPivot = (array[pivotIdx] / 1000) * 384;
        await swap(arr, pivotIdx, end)
        refArray[pivotIdx].current.style.height = `${heightEnd}px`
        refArray[end].current.style.height = `${heightPivot}px`
        // // console.log(end)
        // console.log(end, refArray[end])
        return pivotIdx
    }


    // ======================================================================
    // ========================== HEAP SORT ============================
    // ======================================================================
    const heapSort = () => {
        setTitle("Heap Sort")

    }

    // ======================================================================
    // ========================== MERGE SORT ============================
    // ======================================================================
    // 
    const refIdxArray = Array(array.length).fill().map((num, i) => i)
    console.log(refIdxArray)
    const mergeSort = async (arr = array, refs = refIdxArray) => {
        setTitle("Merge Sort")
        if (arr.length === 1) {
            return arr
        }
        // FORWARD PROGRESS
        const middleIndex = Math.floor(arr.length / 2)
        const leftArr = arr.slice(0, middleIndex)
        const rightArr = arr.slice(middleIndex)
        // VISUALIZATION ARRAY - the array should be the same (in terms of slicing) - it just stores the index as a value to change associated refs
        const leftRefArr = refs.slice(0, middleIndex)
        const rightRefArr = refs.slice(middleIndex)
        // RECURSIVE CALL
        // console.log(leftRefArr, rightRefArr)
        const sortedLeft = await mergeSort(leftArr, leftRefArr)
        const sortedRight = await mergeSort(rightArr, rightRefArr)
        return await merge(sortedLeft, sortedRight, leftRefArr, rightRefArr)
    }
    const merge = async (left, right, leftRef, rightRef) => {
        await sleep(50)
        let leftCount = 0;
        let rightCount = 0;
        let sorted = [];
        // Determine the heights of the current bars being compared
        let heightLeft = (left[leftCount] / 1000) * 384;
        let heightRight = (right[rightCount] / 1000) * 384;
        while (leftCount < left.length && rightCount < right.length) {
            if (left[leftCount] > right[rightCount]) {
                console.log([refArray[leftRef[leftCount]], leftRef[leftCount], left[leftCount], heightLeft], [refArray[rightRef[rightCount]], rightRef[rightCount], right[rightCount], heightRight])


                await swapAnimation(leftRef[leftCount], rightRef[rightCount], 1)
                await swap(array, left[leftCount], right[rightCount], 1)
                sorted.push(right[rightCount]);
                rightCount++;
            } else {
                // await swap(array, left[leftCount], right[rightCount], 1)
                sorted.push(left[leftCount]);
                leftCount++;
            }
        }
        while (rightCount < right.length) {
            sorted.push(right[rightCount]);
            rightCount++;
        }
        while (leftCount < left.length) {
            sorted.push(left[leftCount]);
            leftCount++;
        }
        // console.log(leftCount, rightCount, sorted)
        return sorted
    }

    // 
    // ======================================================================
    // ========================== HELPER FUNCTIONS ============================
    // ======================================================================
    // Reset array and helper function
    const resetArray = () => {
        let arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(randomNumber(5, 1000))
        }
        setArray(arr)
    }

    function divHeight(index) {
        console.log(refArray[index], index)
        return parseFloat(refArray[index].current.style.height.slice(0, -2))
    }
    async function swap(arr, j, jPlus, speed) {
        await sleep(speed)
        // setComparing([j, jPlus])
        let temp = arr[j]
        arr[j] = arr[jPlus]
        arr[jPlus] = temp
        return arr
    }
    async function swapAnimation(a, b, speed) {
        await sleep(speed)
        let temp = refArray[a]
        // swap values
        refArray[a].current.value = refArray[b].current.value
        refArray[b].current.value = temp.current.value
        // swap heights
        refArray[a].current.style.height = refArray[b].current.style.height
        refArray[b].current.style.height = temp.current.style.height
    }
    function sleep(ms) {
        return new Promise(res => setTimeout(res, ms))
    }


    return (
        <div className="flex flex-col">
            <div className="h-96 w-3/4 mx-auto bg-gray-700 flex justify-between">
                {array?.map((num, i) => {
                    // turn value into height percentage
                    let height = (num / 1000) * 384
                    let barStyle = {
                        height: `${height}px`,
                    }
                    let bgColor = (comparing.includes(i) ? 'bg-blue-400' : "bg-blue-600")
                    let value = num
                    return (
                        <div key={i} style={barStyle} ref={refArray[i]} value={value} className={`array-bar mt-auto w-1 md:w-[4px] lg:w-[6px] xl:w-[8px] ${bgColor} hover:bg-red-500 `} onClick={() => console.log(value)} onMouseEnter={() => setHoverVal(value)} onMouseLeave={() => setHoverVal()}></div>
                    )
                }
                )}
            </div>
            <div className="w-3/4 flex justify-between mx-auto flex-wrap">
                <p className="text-xs text-gray-500 tracking-wide">Hover Value: {hoverVal}</p>
                <p className="text-xs text-gray-500 tracking-wide">{notes}</p>
            </div>
            <div className="w-3/4 flex justify-between mx-auto flex-wrap ">
                <button onClick={() => mergeSort()} className="px-4 my-1 py-1 bg-gray-500 text-xs tracking-widest uppercase text-gray-300 hover:bg-blue-600 rounded-lg transition-all ease-in-out">Merge Sort</button>
                <button onClick={() => quickSort()} className="px-4 my-1 py-1 bg-blue-500 text-xs tracking-widest uppercase text-gray-300 hover:bg-blue-600 rounded-lg transition-all ease-in-out">Quick Sort</button>
                <button onClick={() => heapSort()} className="px-4 my-1 py-1 bg-gray-500 text-xs tracking-widest uppercase text-gray-300 hover:bg-blue-600 rounded-lg transition-all ease-in-out" >Heap Sort</button>
                <button onClick={() => bubbleSort()} className="px-4 my-1 py-1 bg-blue-500 text-xs tracking-widest uppercase text-gray-300 hover:bg-blue-600 rounded-lg transition-all ease-in-out">Bubble Sort</button>
                <button onClick={() => selectionSort()} className="px-4 my-1 py-1 bg-blue-500 text-xs tracking-widest uppercase text-gray-300 hover:bg-blue-600 rounded-lg transition-all ease-in-out">Selection Sort</button>
                <button onClick={() => insertionSort()} className="px-4 my-1 py-1 bg-blue-500 text-xs tracking-widest uppercase text-gray-300 hover:bg-blue-600 rounded-lg transition-all ease-in-out">Insertion Sort</button>
            </div>
        </div>
    )
}

// ======================================================================
// ========================== EXPORTS ============================
// ======================================================================

export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export default SortingVisualizer
