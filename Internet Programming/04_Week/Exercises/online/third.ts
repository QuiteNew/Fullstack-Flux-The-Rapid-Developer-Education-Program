interface Animal {
    name: string;
    age: number;
}

interface Mammal extends Animal {
    hasFur: boolean;
}

type DogBreed = 
    | 'Labrador' 
    | 'Beagle' 
    | 'Bulldog' 
    | 'Poodle' 
    | 'Bichon Frise'
    | 'Other';

class Dog implements Mammal {
    breed: DogBreed;
    weight: number;

    bark() {
        if (isNaN(this.weight)) {
            console.log(`The dog ${this.name} is barking.`);
        } else if (this.weight < 10) {
            console.log(`The dog ${this.name} is barking softly.`);
        } else {
            console.log(`The dog ${this.name} is barking loudly.`);
        }
    }

    constructor(public name: string, public age: number, public hasFur: boolean) {
        this.breed = "Other";
        this.weight = Number.NaN;
    }
}

const lola = new Dog("Lola", 9, true);
lola.breed = "Bichon Frise";
lola.weight = 7;

lola.bark();