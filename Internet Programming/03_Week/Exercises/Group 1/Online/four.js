const numbers = [1, 3, 5, 7, 9, 11];

function sumSquares(array) {
    if (!Array.isArray(array)) {
        return NaN;
    }

    // let sum = 0;
    // for (let i = 0; i < array.length; i++) {
    //     sum += array[i] * array[i];
    // }

    // for (const item of array) {
    //     sum += item * item;
    // }

    const sum = array
        .map(item => item * item)
        .reduce((acc, curr) => acc + curr, 0);

    return sum;
}

console.log(sumSquares(numbers));

console.log(sumSquares(1));

console.log(sumSquares("1234"));