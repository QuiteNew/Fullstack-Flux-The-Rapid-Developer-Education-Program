const secret = "my-secret-value";

const secretFunction = () => {
    const localSecret = "my-local-secret-value";
    // do stuff with local secret
    return 3;
}


const secretAddition = (first, second) => {
    const secret = 7;
    // do stuff with local secret
    return first + second + secret;
};

console.log(secret);


console.log(secretFunction());

console.log(secretAddition(2, 3));


// const myWorkFunction = (function (){
//     // do some work, introduces variables
//     console.log("Doing some work");
// });

// myWorkFunction();

(function (){
    // do some work, introduces variables
    console.log("Doing some work");
})();