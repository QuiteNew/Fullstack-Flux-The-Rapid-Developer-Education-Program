const  checkTruth = (value) => {
    return !!value;
};

const showTruth = (value) => {
    console.log(`${value} is ${checkTruth(value)}`);
};

showTruth(true);
showTruth(false);
showTruth(0);
showTruth(1);
showTruth(""); 
showTruth("Hello"); 
showTruth(null); 
showTruth(undefined); 
showTruth([]); 
showTruth({});
showTruth(NaN);

console.log("---------------------------");

const condition = undefined ? "Same" : "Different";
console.log(`Condition is: ${condition}`);


const getWeko = () => {
    if (Math.random() > 0.5) {
        const weko= {
            name: "Weko",
            age: 0x31
        };
        return weko;
    } else {
        return null;
    }
};

const weko = getWeko();

console.log(`The logical value of weko is: ${!!weko}`);

if (!!weko) {
    console.log(`Weko is available: ${JSON.stringify(weko)}`);
} else {
    console.log("Weko is not available.");
}