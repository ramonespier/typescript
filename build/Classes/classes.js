// classes tem propriedades, metodos e construtor
export class Player {
    static players = [];
    name;
    health; // private => modificador de acesso de uma prop ou método
    constructor(name) {
        this.name = name;
        this.health = 20;
        Player.players.push(this);
    }
    getName() {
        return this.name;
    }
    getHealth() {
        return this.health;
    }
    damage(amount, damager) {
        const updatedHealth = this.health - amount;
        console.log(damager
            ? `${damager.getName()} deu ${amount} de dano em ${this.name}`
            : `${this.name} tomou ${amount} de dano`);
        if (updatedHealth <= 0) {
            this.health = 0;
            this.die();
            return;
        }
        this.health = updatedHealth;
    }
    die(damager) {
        if (damager) {
            console.log(this.name, "foi morto(a) por", damager.getName());
            return;
        }
        console.log(this.name, "morreu");
    }
}
const ramon = new Player("Ramon");
const davi = new Player("Davi");
ramon.damage(22, davi);
class Animal {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    makeSound() {
        console.log(`${this.name} está fazendo um som`);
    }
}
// const cat = new Animal("Salém", 5);
// cat.makeSound()
// herança de classes com ts
class Cat extends Animal {
    color;
    constructor(name, age, color) {
        super(name, age);
        this.color = color;
    }
    makeSound() {
        console.log(`${this.name} está miando`);
    }
}
const cat = new Cat("Bitelo", 6, "Encardidinha");
cat.makeSound();
