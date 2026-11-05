export {};

const delay = (ms: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

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

async function doWork(first: VoidFunction, second: VoidFunction) {
    // execute the first function after a second
    // and then execute the second function after one additional second
    console.log(`Starting work at: ${time()}`);
    await delay(1000);
    console.log(`About to call the first function: ${time()}`);
    first();
    await delay(1000);
    console.log(`About to call the second function: ${time()}`);
    second();
}

doWork(one, two);

const makeMeAPromise = async (value: number) => {
    await delay(2000);
    if (Math.random() > 0.5) {
        return value;
    } else {
        throw "Sorry";
    }
};

async function handlePromise() {
    try {
        const result = await makeMeAPromise(5);
        console.log("Result:", result);
    } catch (error) {
        console.log("Caught error:", error);
    }
}

handlePromise();