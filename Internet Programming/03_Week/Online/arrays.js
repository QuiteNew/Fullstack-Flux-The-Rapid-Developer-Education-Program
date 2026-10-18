const fruits = ["apple", "banana", "cherry"];

console.log(fruits);

fruits.push("date");
console.log(fruits);

fruits.pop();
console.log(fruits);

fruits.shift();
console.log(fruits);

fruits.unshift("apricot");
console.log(fruits);

const mixed = ["apple", 42, true, null, { name: "John" }];

for (const item of mixed) {
    console.log(item);
    console.log(typeof item);
}

console.log(mixed[100]);
console.log(typeof mixed[100]);

console.log(mixed[-1]);
console.log(typeof mixed[-1]);

console.log(mixed["weko"]);
console.log(typeof mixed["weko"]);


console.log("----------------------------");

fruits.push("date", "elderberry", "fig", "grape");
console.log(fruits);

const fruitLenghts = fruits.map(item => item.length);
console.log(fruitLenghts);

const longFruits = fruits.filter(item => item.length > 5);
console.log(longFruits);





