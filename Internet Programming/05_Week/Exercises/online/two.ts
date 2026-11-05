const pOne = new Promise<number>((resolve, reject) => {
    resolve(3);
});

const pTwo = Promise.resolve(3);

// const pThree = new Promise((resolve, reject) => {
//     reject("Sorry");
// });

// const pFour = Promise.reject("Sorry");

const makeMeAPromise = (value: number) => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve(value);
            } else {
                reject("Sorry");
            }
        }, 2000);
    });
};


const promise = makeMeAPromise(5);
console.log(promise);
promise.then(result => {
    console.log("Resolved with:", result);
    console.log(promise);
}).catch(error => {
    console.log("Rejected with:", error);
    console.log(promise);
});
