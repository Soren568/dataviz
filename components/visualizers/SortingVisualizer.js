import React, { useState, useEffect, createRef } from 'react'
import randomNumber from '../../utils/random';
import sleep from '../../utils/sleep';

function SortingVisualizer({ }) {
    const [comparing, setComparing] = useState([]);
    const [array, setArray] = useState([])
    const [refArray, setRefArray] = useState([]);
    const [notes, setNotes] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [hoverVal, setHoverVal] = useState(0);
    const [userReset, setUserReset] = useState(false)
    const [title, setTitle] = useState("Sorting visualizer")


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
        console.log({ refArray })
        setTitle("Bubble Sort")
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                setComparing([j, j + 1])
                if (array[j + 1] < array[j]) {
                    let newHeightJ1 = (array[j] / 1000) * 384;
                    let newHeightJ2 = (array[j + 1] / 1000) * 384;
                    await swap(array, j, (j + 1), 0.2)
                    refArray[j + 1].style.height = `${newHeightJ1}px`
                    refArray[j].style.height = `${newHeightJ2}px`
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
            refArray[array.length - i - 1].style.height = `${heightMax}px`
            refArray[maxIndex].style.height = `${heightSwapped}px`
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
                refArray[j + 1].style.height = refArray[j].style.height
                refArray[j].style.height = `${tempHeight}px`
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
                refArray[pivotIdx].style.height = `${heightI}px`
                refArray[i].style.height = `${heightPivot}px`
                pivotIdx++
            }
        }
        let heightEnd = (array[end] / 1000) * 384;
        let heightPivot = (array[pivotIdx] / 1000) * 384;
        await swap(arr, pivotIdx, end)
        refArray[pivotIdx].style.height = `${heightEnd}px`
        refArray[end].style.height = `${heightPivot}px`
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
        const sortedLeft = await mergeSort(leftArr, leftRefArr)
        const sortedRight = await mergeSort(rightArr, rightRefArr)
        return await merge(sortedLeft, sortedRight, leftRefArr, rightRefArr)
    }
    const merge = async (left, right, leftRef, rightRef) => {
        let sorted = []
        let sortedRefs = []
        // console.log(left, right)
        let pointerL = 0
        let pointerR = 0;
        while (pointerL < left.length && pointerR < right.length) {
            await sleep(1)
            await animateCompare(leftRef[pointerL], rightRef[pointerR])
            if (left[pointerL] < right[pointerR]) {
                sortedRefs.push(leftRef[pointerL])
                sorted.push(left[pointerL])
                pointerL++
            } else {
                sortedRefs.push(rightRef[pointerR])
                sorted.push(right[pointerR])
                pointerR++
            }
        }
        while (pointerL < left.length) {
            sortedRefs.push(leftRef[pointerL])
            sorted.push(left[pointerL])
            pointerL++
        }
        while (pointerR < right.length) {
            sortedRefs.push(rightRef[pointerR])
            sorted.push(right[pointerR])
            pointerR++
        }
        console.log(sortedRefs.length)
        await animateAuxArr(sortedRefs, sorted)
        if (sortedRefs.length == 100) await animateFinalOrder(sortedRefs, sorted)
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

    async function animateCompare(leftIdx, rightIdx) {
        let bgColor = " bg-blue-300 "
        refArray[leftIdx].className = `array-bar mt-auto w-1 md:w-[4px] lg:w-[6px] xl:w-[8px] ${bgColor} hover:bg-red-500 `
        refArray[rightIdx].className = `array-bar mt-auto w-1 md:w-[4px] lg:w-[6px] xl:w-[8px] ${bgColor} hover:bg-red-500 `
        await sleep(3)
        bgColor = 'bg-blue-600'
        refArray[leftIdx].className = `array-bar mt-auto w-1 md:w-[4px] lg:w-[6px] xl:w-[8px] ${bgColor} hover:bg-red-500 `
        refArray[rightIdx].className = `array-bar mt-auto w-1 md:w-[4px] lg:w-[6px] xl:w-[8px] ${bgColor} hover:bg-red-500 `
    }

    async function animateAuxArr(sortedRefArr, sortedArr) {
        for (let i = 0; i < sortedRefArr.length; i++) {
            // console.log(i, sortedArr[i])
            await sleep(1)
            try {
                refArray[sortedRefArr[i]].style.height = `${(sortedArr[i] / 1000) * 384}px`
                refArray[sortedRefArr[i]].value = `${sortedArr[i]}`
            }
            catch {
                return
            }
            // console.log(refArray[sortedRefArr[i]].style.height, sortedArr[i])
        }
    }

    async function animateFinalOrder(sortedRefArr, sortedArr) {
        console.log(sortedRefArr)
        for (let i = 0; i < 100; i++) {
            let bgColor = " bg-green-300 "
            console.log(i)
            refArray[i].style.height = `${(sortedArr[i] / 1000) * 384}px`
            refArray[i].value = `${sortedArr[i]}`
            refArray[i].className = `array-bar mt-auto w-1 md:w-[4px] lg:w-[6px] xl:w-[8px] ${bgColor} hover:bg-red-500 `

            await sleep(5)
            bgColor = 'bg-blue-600'
            refArray[i].className = `array-bar mt-auto w-1 md:w-[4px] lg:w-[6px] xl:w-[8px] ${bgColor} hover:bg-red-500 `
        }
    }

    function divHeight(index) {
        console.log(refArray[index], index)
        return parseFloat(refArray[index].style.height.slice(0, -2))
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
        refArray[a].value = refArray[b].value
        refArray[b].value = temp.value
        // swap heights
        refArray[a].style.height = refArray[b].style.height
        refArray[b].style.height = temp.style.height
    }



    return (
        <div className="flex flex-col">
            <div className="flex w-3/4 mx-auto mt-5 mb-1 items-center">
                <h1 className="uppercase font-semibold tracking-wider mr-auto">{title}</h1>
                <button onClick={() => setUserReset(prev => !prev)} className="px-4 py-1 bg-blue-500 text-xs tracking-widest uppercase text-gray-200 hover:bg-blue-600 rounded-lg transition-all ease-in-out">New Array</button>
                {isPlaying ? <button onClick={() => setIsPlaying(false)} className="px-4 py-1 ml-2 bg-red-400 text-xs tracking-widest uppercase text-white hover:bg-rose-600 rounded-lg transition-all ease-in-out">Stop</button> : null}
            </div>
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
                        <div key={i} style={barStyle} ref={(ref) => { refArray[i] = ref; return true; }} value={`${value}`} className={`array-bar mt-auto w-1 md:w-[4px] lg:w-[6px] xl:w-[8px] ${bgColor} hover:bg-red-500 `} onClick={() => console.log(value)} onMouseEnter={() => setHoverVal(refArray[i].value || num)} onMouseLeave={() => setHoverVal()}></div>
                    )
                }
                )}
            </div>
            <div className="w-3/4 flex justify-between mx-auto flex-wrap">
                <p className="text-xs text-gray-500 tracking-wide">Hover Value: {hoverVal}</p>
                <p className="text-xs text-gray-500 tracking-wide">{notes}</p>
            </div>
            <div className="w-3/4 flex justify-between mx-auto flex-wrap ">
                <button onClick={() => mergeSort()} className="px-4 my-1 py-1 bg-blue-500 text-xs tracking-widest uppercase text-gray-200 hover:bg-blue-600 rounded-lg transition-all ease-in-out">Merge Sort</button>
                <button onClick={() => quickSort()} className="px-4 my-1 py-1 bg-blue-500 text-xs tracking-widest uppercase text-gray-200 hover:bg-blue-600 rounded-lg transition-all ease-in-out">Quick Sort</button>
                <button onClick={() => heapSort()} className="px-4 my-1 py-1 bg-gray-500 text-xs tracking-widest uppercase text-gray-200 hover:bg-blue-600 rounded-lg transition-all ease-in-out" >Heap Sort</button>
                <button onClick={() => { bubbleSort() }} className="px-4 my-1 py-1 bg-blue-500 text-xs tracking-widest uppercase text-gray-200 hover:bg-blue-600 rounded-lg transition-all ease-in-out">Bubble Sort</button>
                <button onClick={() => selectionSort()} className="px-4 my-1 py-1 bg-blue-500 text-xs tracking-widest uppercase text-gray-200 hover:bg-blue-600 rounded-lg transition-all ease-in-out">Selection Sort</button>
                <button onClick={() => insertionSort()} className="px-4 my-1 py-1 bg-blue-500 text-xs tracking-widest uppercase text-gray-200 hover:bg-blue-600 rounded-lg transition-all ease-in-out">Insertion Sort</button>
            </div>
        </div>
    )
}

// ======================================================================
// ========================== EXPORTS ============================
// ======================================================================



export default SortingVisualizer
