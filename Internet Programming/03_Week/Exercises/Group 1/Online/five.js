const weko = {
    name: "Weko",
    lastName: "Stefanovski",
    age: 0x31,
    address: {
        city: "Skopje",
        country: "Macedonia"
    }
};

function printPerson(person) {
    console.log(`Name: ${person.name}`);
    console.log(`Last Name: ${person.lastName}`);
    console.log(`Age: ${person.age}`);

    console.log(`City: ${person.address.city}`);
    console.log(`Country: ${person.address.country}`);
}

printPerson(weko);