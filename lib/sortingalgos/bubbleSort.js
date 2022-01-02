function bubbleSort(array) {
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j<array.length - i -1; j++){
            if(array[j] > array[j+1]){
                swap(array, j, j+1)
            }
        }
    }
    return array
}

function swap(arr, j, jPlus) {
    let temp = arr[j]
    arr[j] = arr[jPlus]
    arr[jPlus] = temp
}
console.log(bubbleSort([10, 9, 8, 7, 6, 4, 5, 1, 3, 2]))