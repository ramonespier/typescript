type UserWallet = {
    coins?: number;
    credits?: number
}

type User = { // paskal case
    name: string,
    createdAt: Date;
    wallet?: UserWallet;
}

type Admin = User & {
    ban(user: User): void;
    kick(user: User): void;
}


// type Input = string | number | string[];
type Input = string | User;

function prompt(input: Input) { }
// const admin: Admin = {  }

prompt('Ramon')


interface Dog {
    name: string
    breed: string
    bark(): string
}

interface Cat {
    name: string
    color: string
    miau(): string
}
interface Bird {
    name: string
    wingspan: number
    chirp(): string
}
interface Cow {
    name: string
    weight: number
    moo(): string
}

type Animal = Dog | Cat | Bird | Cow

function createAnimal(animal: Animal): void {}

createAnimal({
    name: 'Salém',
    color: 'Cinza',
    miau() {
        return 'miau'
    },
})