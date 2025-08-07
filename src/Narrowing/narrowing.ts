// EXEMPLO DE REFINAMENTO #1

function printValue(value: string | number | boolean) {
    if (typeof value === "string") {
        value
        return;
    }
    if (typeof value === "number") {
        value
        return;
    }
    value;
}

// EXEMPLO DE REFINAMENTO #2
function printValue2(value: string | number | boolean) {
    if (typeof value === "string" || typeof value === "number") {
        value
        return;
    }
    value;
}

// EXEMPLO DE REFINAMENTO COM CLASSES #3
class Dog {
    bark() {
        console.log("Woof")
    }
}
class Cat {
    meow() {
        console.log("Miau")
    }
}

function makeSound(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark()
        return
    }
    animal.meow()
}

// EXEMPLO DE REFINAMENTO COM INTERFACES #4
interface Fish {
    swim: () => void;
}
interface Bird {
    fly: () => void;
}

function move(animal: Fish | Bird) {
    if ("swim" in animal) {
        animal.swim()
        return;
    }
    animal.fly()
}

// EXEMPLO DE REFINAMENTO #5
function main(value: string[] | Date) {
    if ("push" in value) {
        value.push() // todos metodos de array
        return;
    }
    value.getDate() // todos metodos de date;
}

// EXEMPLO DE REFINAMENTO #6
function handle(value: string | null | undefined) {
    if (!value) return;
    value.toUpperCase()
}

// EXEMPLO DE REFINAMENTO #7
interface User {
    id: string,
    name: string,
    nickname?: string;
}

function handle2(user?: User) {
    if (!user) return;

    user.id.toUpperCase()

    user.name.toUpperCase()

    if (!user.nickname) return;
    user.nickname.toUpperCase()

}

// EXEMPLO DE REFINAMENTO #8
interface Animal {
    name: string,
    age: number;
    follow(): void;
}

interface Human {
    name: string,
    age: number,
    pets?: Animal[]
}

interface Post {
    title: string,
    author: Human;
}

function handle3(value: Animal | Human | Post) {
    if("name" in value && "follow" in value)  {
        value
        return;
    }
    if("title" in value) {
        value
        return;
    }
    value;
}