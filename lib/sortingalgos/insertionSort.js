function insertionSort(array) {
    for(let i =0; i< array.length; i++){
        for(let j = 0; j < i; j++){
            if(array[i] < array[j]){
                [array[i], array[j]] = [array[j], array[i]]
            }
        }
    }
    return array
}
console.log(insertionSort([1,23,12,451,123,1,23,5,7,8,24,10]))