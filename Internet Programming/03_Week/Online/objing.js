const weko = {
    name: "Weko",
    age: 25,
    add: (a, b) => a + b
}

console.log(weko.add(3, 4));


const wname = weko.name;
const addOnly = weko.add;

console.log(addOnly(3, 4));


const weko2 = {
    ...weko,
    address: "123 Main St"
}
