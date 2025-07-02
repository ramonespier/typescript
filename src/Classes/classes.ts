// classes tem propriedades, metodos e construtor

export class Player {
    private static players: Player[] = []
    private name: string
    private health: number // private => modificador de acesso de uma prop ou método
    constructor(name: string) {
        this.name = name
        this.health = 20
        Player.players.push(this)
    }

    getName() {
        return this.name
    }

    public getHealth() {
        return this.health;
    }


    public damage(amount: number, damager?: Player) {
        const updatedHealth = this.health - amount;

        console.log(damager
            ? `${damager.getName()} deu ${amount} de dano em ${this.name}`
            : `${this.name} tomou ${amount} de dano`
        )

        if (updatedHealth <= 0) {
            this.health = 0;
            this.die()
            return;
        }

        this.health = updatedHealth;
    }
    private die(damager?: Player) {
        if (damager) {
            console.log(this.name, "foi morto(a) por", damager.getName())
            return;
        }
        console.log(this.name, "morreu")
    }
}

const ramon = new Player("Ramon");
const davi = new Player("Davi")

ramon.damage(22, davi)

class Animal {
    name: string;
    age: number

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    makeSound(): void {
        console.log(`${this.name} está fazendo um som`)
    }
}

// const cat = new Animal("Salém", 5);
// cat.makeSound()



// herança de classes com ts

class Cat extends Animal {
    color: string;
    constructor(name: string, age: number, color: string) {
        super(name, age)
        this.color = color
    }
    makeSound(): void {
        console.log(`${this.name} está miando`)
    }
}


const cat = new Cat("Bitelo", 6, "Encardidinha")
cat.makeSound()