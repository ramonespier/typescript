// overload que muda o retorno da função


interface Person {
    name: string
    age: number
}

interface Dog {
    name: string
    breed: string
}

interface House {
    address: string
    size: number
}

function generate(type: "person"): Person;
function generate(type: "house"): House;
function generate(type: "dog"): Dog;

function generate(type: "dog" | "house" | "person") {
    switch (type) {
        case "person": return {
            name: "Ramon", age: 20
        }
        case "dog": return {
            name: "Cachorro", breed: "vira-lata"
        }
        case "house": return {
            address: "Minha rua", size: 100
        }

    }
}

const house = generate("house")
console.log(house)