function factorial(number) {
    if (typeof number !== "number") {
        return undefined;
    }
    if (number < 0) {
        return undefined;
    }

    if (number === 0 || number === 1) {
        return 1;
    }
    return number * factorial(number - 1);
}

function printFac(number) {
    console.log(`The factorial of ${number} is ${factorial(number)}`);
}

printFac(5);
printFac(0);
printFac(1);
printFac(12);

printFac(25);

printFac(-1);

printFac("eden");
printFac(true);
printFac([1, 2, 3]);
printFac({ x: 1 , y: 2 });

printFac(1.5);