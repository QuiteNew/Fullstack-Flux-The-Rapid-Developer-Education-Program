const ages = {
    weko: 0x31,
    john: 28,
    jane: 26,
    alice: 24
};

ages.andrej = 21;

console.log(ages);

const agesMap = new Map(Object.entries(ages));
console.log(agesMap);

agesMap.set('maria', 22);
console.log(agesMap);

agesMap.delete('john');
console.log(agesMap);

agesMap.clear();
console.log(agesMap);