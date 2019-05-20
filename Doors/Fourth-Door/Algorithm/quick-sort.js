function quickSort(arr) {
    const l = arr.length;

    if (l <= 1) return arr;

    const pivotIndex = Math.floor(l / 2);
    const pivot = arr.splice(pivotIndex, 1)[0]

    const leftArr = [];
    const rightArr = [];

    for (let i = 0; i < l - 1; i++) {
        if (arr[i] <= pivot) {
            leftArr.push(arr[i]);
        } else{
            rightArr.push(arr[i]);
        }
    }

    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
    // return quickSort(leftArr).concat(pivot).concat(quickSort(rightArr));
}

console.time('运行时间')
console.log(quickSort([3,4,2,1,5,3,4,6,9,2]), 'quickSort');
console.timeEnd('运行时间') // 3.302ms


function quickSort2(arr) {
    return arr.length <= 1 
    ? arr 
    : [...quickSort2(arr.slice(1).filter(v => v <= arr[0])), arr[0], ...quickSort2(arr.slice(1).filter(v => v > arr[0]))]
    // : quickSort2(arr.slice(1).filter(v => v <= arr[0])).concat(arr[0], quickSort2(arr.slice(1).filter(v => v > arr[0])))
}

console.time('运行时间')
console.log(quickSort2([3,4,2,1,5,3,4,6,9,2]), 'quickSort2');
console.timeEnd('运行时间') // 0.631ms

const quickSort3 = arr => 
    arr.length <= 1 
    ? arr 
    : quickSort3(arr.filter(v => v < arr[0]))
        .concat(arr.filter(v => v === arr[0]))
        .concat(quickSort3(arr.filter(v => v > arr[0])))

console.time('运行时间')
console.log(quickSort3([3,4,2,1,5,3,4,6,9,2]), 'quickSort3');
console.timeEnd('运行时间')  // 0.278ms
