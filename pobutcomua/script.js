function swapElements(arr) {
    for (let i = 0; i < arr.length - 1; i += 2) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
    return arr;
}


console.log(swapElements([1, 2, 3, 4, 5]));
console.log(swapElements([5, 4, 4, 3, 3, 2]));
console.log(swapElements([4, 9, 2, 5, 3, 9]));
console.log(swapElements([6]));