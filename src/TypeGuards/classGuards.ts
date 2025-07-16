class Cat {
    miau() {
        console.log("meow!")
    }
}

class Dog {
    bark() {
        console.log("Woof!")
    }
}

function makeSound (animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark()
        return;
    }
    animal.miau();
}