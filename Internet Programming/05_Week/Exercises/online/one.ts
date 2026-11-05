type VoidFunction = () => void;

function one() {
    console.log("One");
}

function two() {
    console.log("Two");
}

function time(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const millis = String(now.getMilliseconds()).padStart(3, "0");
    return `${hours}:${minutes}:${seconds}.${millis}`;
}

function doWork(first: VoidFunction, second: VoidFunction) {
    // execute the first function after a second
    // and then execute the second function after one additional second
    console.log(`Starting work at: ${time()}`);
    setTimeout(() => {
        console.log(`About to call the first function: ${time()}`);
        first();
        setTimeout(() => {
            console.log(`About to call the second function: ${time()}`);
            second();
        }, 1000);
    }, 1000);
}

doWork(one, two);