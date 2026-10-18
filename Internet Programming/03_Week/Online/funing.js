function addOne(first, second) {
    return first + second;
}

const five = addOne(2, 3);
console.log(five);

const addTwo = addOne;
const seven = addTwo(3, 4);
console.log(seven);

const addThree = function (first, second) {
    return first + second;
};

const nine = addThree(4, 5);
console.log(nine);


const addFour = (first, second) => first + second;
const eleven = addFour(5, 6);
console.log(eleven);

const square = x => x * x;

const sixteen = square(4);
console.log(sixteen);





