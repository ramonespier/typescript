# 📘 TypeScript

## 🚀 Por que usar TypeScript?

TypeScript é um superset do JavaScript que adiciona **tipagem estática** ao código. Isso ajuda a identificar erros ainda no desenvolvimento, resultando em aplicações mais robustas e fáceis de manter.

### ✅ Vantagens

- 📌 **Baseado em JavaScript**, com melhorias de tipagem
- 💡 **Código mais robusto** e **fácil de manter**
- 🏗️ **Build** transpila `.ts` em `.js`
- 🔐 **Mais segurança** em produção
- 🧠 **Melhora a produtividade** do desenvolvedor com autocompletar e validação
- 🔄 `ts === js`: tudo que é JS também é válido em TS

---

## 📂 Arquivos de exemplo

### `testeComplete.ts`

```ts
interface ShowInfoOptions { // TIPAR para evitar erros
    displayDay?: boolean;
    displayMonth?: boolean;
    displayYear?: boolean;
}

function showInfo(date: Date, options: ShowInfoOptions = {}) {
    console.log(date.toLocaleDateString());
    
    if (options.displayDay) {
        console.log("dia", date.getDay());
    }
    if (options.displayMonth) {
        console.log("mês", date.getMonth());
    }
    if (options.displayYear) {
        console.log("ano", date.getFullYear());
    }
}

showInfo(new Date(), { displayDay: true });
```

### `typeAnnotations.ts`
```ts 
// Type annotations - Anotações de tipo em variáveis e funções

// Tipos primitivos
const myString: string = "Ramon";
const myNumber: number = 5;
const variavel: any = 'qualquer tipo'; // ⚠️ Evite usar 'any' sempre que possível

// Inferência de tipo com literais
const myName = 'Ramon Coelho';

const animal = {
    name: 'gato',
    age: 3
};

// Arrow function com tipo
const filter = (value: number) => value < 0;

const numbers = [1, 2, 3, -4, -5, -6];
numbers.filter(filter);

// Função com tipos definidos
function soma(a: number, b: number): number {
    return a + b;
}

// Parâmetro opcional com '?'
function greet(name: string, age?: number) {
    // Parâmetro 'age' é opcional
}

greet(myString, myNumber);
```

### `interface.ts`
As `interfaces` em TypeScript funcionam como um contrato para a estrutura de objetos. Elas garantem que um objeto tenha certas propriedades e métodos, definindo um tipo customizado. Este exemplo mostra como:
- **Definir interfaces** para objetos (`User` e `UserWallet`).
- **Mesclar interfaces** (*declaration merging*), adicionando o método `talk` à interface `User` já existente.
- **Estender interfaces** com a palavra-chave `extends` para criar tipos mais específicos (como `Admin` que herda de `User`).
- **Usar interfaces** como tipos em parâmetros e retornos de funções.

```ts
// interfaces define tipos e "contratos"

interface UserWallet {
    coins?: number;
    credits?: number;
}

interface User { // PaskalCase é a convenção para nomes de tipos
    name: string,
    createdAt: Date;
    wallet?: UserWallet;
}

// A interface User é "mesclada" com a definição anterior, adicionando novas propriedades
interface User {
    talk(): void;
}

// Quando criamos um objeto do tipo User, precisamos seguir as "regras" da interface
function createUser(name: string): User { // a interface se torna um "tipo"
    return {
        name,
        createdAt: new Date(),
        talk() {
            console.log('Eu sou o', name);
        },
    }
}

function updateWallet(user: User, wallet: UserWallet) {
    user.wallet = { ...user.wallet, ...wallet };
}

const ramon = createUser('Ramon Coelho');
ramon.talk(); // Output: 'Eu sou o Ramon Coelho'

updateWallet(ramon, { coins: 15 });

// 'Admin' herda todas as propriedades e métodos de 'User' e adiciona os seus próprios
interface Admin extends User {
    ban(user: User): void;
    kick(user: User): void;
}

function promoteUser(user: User): Admin {
    return {
        ...user,
        ban(userToBan) {
            console.log(userToBan.name, 'foi banido por', this.name);
        },
        kick(userToKick) {
            console.log(userToKick.name, 'foi expulso por', this.name);
        }
    };
}

const admRamon = promoteUser(ramon);
const outroUser = createUser('Outro User');
admRamon.ban(outroUser); // Output: Outro User foi banido por Ramon Coelho

function admActions(admin: Admin) {
    // Esta função só aceita objetos que cumprem o contrato de 'Admin'
    console.log(admin.name, 'pode executar ações de admin.');
}

admActions(admRamon);
```

### `extendedInterface.ts`
TypeScript permite a **extensão de interfaces globais**, um recurso poderoso conhecido como *declaration merging* ou *module augmentation*. Isso significa que podemos adicionar propriedades e métodos a tipos já existentes no ambiente, como o objeto `console`.
- O bloco `declare global` informa ao TypeScript que estamos modificando um tipo de escopo global.
- É uma prática que deve ser usada com cautela, pois modifica o comportamento de objetos nativos para toda a aplicação.

```ts
declare global {
    // Estende a interface global 'Console' para incluir um novo método
    interface Console {
        sayHello(): void
    }
}

// Adiciona a implementação real da função no objeto console
Object.assign(console, {
    sayHello() {
        console.log("Hello");
    }
})

// Agora o método está disponível e é reconhecido pelo TypeScript em todo o projeto
console.sayHello(); // Output: Hello

// ⚠️ É preciso ter cuidado ao extender tipagens e objetos já existentes!
```

### `types.ts`
A palavra-chave `type` cria um **alias** (um apelido) para um tipo. É extremamente flexível e pode ser usada para criar tipos complexos de forma declarativa. Enquanto `interface` é excelente para descrever a "forma" de objetos e classes, `type` brilha na composição de tipos usando operadores.

Os principais conceitos mostrados são:
- **Intersection Types (`&`)**: Combina múltiplos tipos em um só. O tipo resultante terá **todas** as propriedades dos tipos combinados.
- **Union Types (`|`)**: Cria um tipo que pode ser um de vários outros tipos. Uma variável desse tipo pode conter o valor de **qualquer um** dos tipos na união, mas apenas um de cada vez.

```ts
// Types para descrever a estrutura de objetos, similar a interfaces
type UserWallet = {
    coins?: number;
    credits?: number;
}

type User = { // PaskalCase é a convenção
    name: string;
    createdAt: Date;
    wallet?: UserWallet;
}

// INTERSECTION TYPE (&): Admin é um User E também tem os métodos ban/kick
type Admin = User & {
    ban(user: User): void;
    kick(user: User): void;
}


// UNION TYPE (|): A variável 'input' pode ser uma string OU um objeto User
type Input = string | User;

function prompt(input: Input) { 
    if (typeof input === 'string') {
        console.log("Recebido texto:", input);
    } else {
        console.log("Recebido usuário:", input.name);
    }
}

prompt('Olá, Ramon');
prompt({ name: 'Ramon User', createdAt: new Date() });


// Usando interfaces para definir as "formas" base dos animais
interface Dog {
    name: string;
    breed: string;
    bark(): string;
}

interface Cat {
    name: string;
    color: string;
    miau(): string;
}
interface Bird {
    name: string;
    wingspan: number;
    chirp(): string;
}
interface Cow {
    name: string;
    weight: number;
    moo(): string;
}

// UNION TYPE complexo: Um 'Animal' pode ser um Dog, OU um Cat, OU um Bird, OU uma Cow.
type Animal = Dog | Cat | Bird | Cow;

// A função aceita um objeto que corresponda a QUALQUER UMA das interfaces na união 'Animal'
function createAnimal(animal: Animal): void {
    console.log('Animal criado:', animal.name);
}

// Este objeto corresponde perfeitamente à interface 'Cat', então é um 'Animal' válido.
createAnimal({
    name: 'Salém',
    color: 'Cinza',
    miau() {
        return 'miau';
    },
});