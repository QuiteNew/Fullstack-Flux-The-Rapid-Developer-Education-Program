import { calculator } from "./calculator";

const first = 10;
const second = 2;

console.log(calculator.add(first, second));
console.log(calculator.subtract(first, second));
console.log(calculator.multiply(first, second));
console.log(calculator.divide(first, second));

// Using the operate method
console.log(calculator.operate(first, second, "add"));
console.log(calculator.operate(first, second, "subtract"));
console.log(calculator.operate(first, second, "multiply"));
console.log(calculator.operate(first, second, "divide"));
