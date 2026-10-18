const months = {
    purpose: "Defining months",
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
};

const date = Date.now();
const currentMonth = new Date(date).getMonth();
console.log(`The current month is: ${months[currentMonth]}`);

for (const key in months) {
    console.log(`Month ${key} is: ${months[key]}`);
}


for (const [key, value] of Object.entries(months)) {
    console.log(`Month ${key} is: ${value}`);
}