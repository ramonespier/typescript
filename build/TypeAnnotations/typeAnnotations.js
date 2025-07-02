//type annotations
// forma primitiva
const myString = "Ramon";
const myNumber = 5;
const variavel = 'qualquer tipo'; // não tem sentido usar any
// o ts faz a inferência dos tipos, identificando o seu valor e funciona com objetos literais
const myName = 'Ramon Coelho';
const animal = {
    name: 'gato',
    age: 3
};
// funciona com arrow function
const filter = (value) => value < 0;
const numbers = [1, 2, 3, -4, -5, -6];
numbers.filter(filter);
// exemplo simples
function soma(a, b) {
    return a + b;
}
function greet(name, age) {
}
greet(myString, myNumber);
export {};
