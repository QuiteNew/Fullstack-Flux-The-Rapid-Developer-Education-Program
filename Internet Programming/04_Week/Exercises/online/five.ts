
function getFirstElement<T>(arr: T[]): T | undefined {
    if (arr.length === 0) {
        return undefined;
    }
    return arr[0];
}


// Example usage of getFirstElement function
const numbers = [1, 2, 3];
const firstNumber = getFirstElement(numbers);
console.log(firstNumber); // Output: 1

const strings = ["a", "b", "c"];
const firstStringFromArray = getFirstElement(strings);
console.log(firstStringFromArray); // Output: "a"

const emptyArray: string[] = [];
const firstString = getFirstElement(emptyArray);
console.log(firstString); // Output: undefined

// @ts-expect-error
getFirstElement("not-an-array");