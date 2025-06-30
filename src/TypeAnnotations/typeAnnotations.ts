//type annotations

// forma primitiva

const myString: string = "Ramon"
const myNumber: number = 5
const variavel: any = 'qualquer tipo' // não tem sentido usar any

// o ts faz a inferência dos tipos, identificando o seu valor e funciona com objetos literais
const myName = 'Ramon Coelho'

const animal = {
    name: 'gato',
    age: 3
}

// funciona com arrow function
const filter = (value: number) => value < 0
const numbers = [1, 2, 3, -4, -5, -6]
numbers.filter(filter)


// exemplo simples
function soma(a: number, b: number): number {
    return a + b
}

function greet(name: string, age?: number) { // '?' no fim do param, o torna opcional (age?) // O param opcional sempre deve ser os ultimos parametros.

}

greet(myString, myNumber)
