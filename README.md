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

~~~ts
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

~~~

### `tuplas.ts`
Tuplas são um tipo especial de array com um número fixo de elementos, onde o tipo de cada elemento em sua respectiva posição é conhecido. Diferente de um array comum (como `string[]`), que pode ter qualquer tamanho, uma tupla tem uma estrutura rígida, o que garante maior segurança e previsibilidade ao manipular conjuntos de dados com formato definido.

- **Estrutura Fixa:** Define o número exato de elementos e o tipo específico para cada posição.
- **Labels (Rótulos):** É possível adicionar rótulos (como `day: number`) para tornar o código mais legível e explícito, sem alterar o tipo ou a lógica.
- **Reutilização com `type`:** Criar um alias com `type` permite reutilizar a estrutura da tupla em várias partes do código.
- **Desestruturação:** A forma mais comum e limpa de acessar os valores de uma tupla é através da desestruturação.

```ts
// Um array comum: pode ter 0 ou N elementos do tipo string.
type NameList = string[];

// Uma Tupla: deve ter EXATAMENTE 3 elementos, na ordem: number, number, number.
type CalendarDate = [day: number, month: number, year: number];

const list: NameList = [];
list.push('Ramon'); // Válido

const date: CalendarDate = [30, 6, 2025]; // Válido
// const wrongDate: CalendarDate = [30, 6]; // Erro: Faltam elementos
// const anotherWrongDate: CalendarDate = ['30', '06', '2025']; // Erro: Tipos incorretos

// A forma ideal de usar uma tupla é desestruturando seus valores.
function createDate(date: CalendarDate) {
    const [day, month, year] = date;
    console.log(`A data é ${day}/${month}/${year}`);
}

createDate(date); // Output: A data é 30/6/2025
createDate([1, 1, 2030]); // Também é válido
```

### `enums.ts`
Enums (ou Enumerações) são uma maneira de criar um conjunto de constantes nomeadas. Elas são ideais para substituir "números mágicos" (valores hardcoded, como 1, 2, 3...) ou strings repetitivas, tornando o código muito mais legível, seguro e fácil de manter.

- **Legibilidade:** Em vez de usar um número como `1` em uma condição, você usa `Direction.North`, o que torna a intenção do código explícita e auto-documentada.
- **Segurança de Tipo:** TypeScript garante que apenas os membros do `enum` possam ser usados onde o tipo do `enum` é esperado. Isso previne que valores arbitrários (e potencialmente inválidos) sejam atribuídos em tempo de desenvolvimento.
- **Centralização:** Todas as constantes relacionadas ficam agrupadas. Se um valor precisar mudar, a alteração é feita em um único lugar.

Existem dois tipos principais de enums:
1.  **Numéricos:** Por padrão, associam as chaves a números que se auto-incrementam (começando em 0).
2.  **Baseados em String:** Associam as chaves a valores de string definidos explicitamente. São úteis quando o valor precisa ser uma string legível (por exemplo, para logs ou armazenamento).

```ts
// Enums criam um conjunto de constantes para tipagem segura.

// 1. Enum Numérico
enum Direction {
    North = 1, // Definimos o início como 1
    South,     // Será 2 (auto-incremento)
    East,      // Será 3
    West       // Será 4
}

const pos = {
    x: 100,
    y: 230,
    direction: Direction.North // Muito mais legível que 'direction: 1'
};

// Enums tornam o código mais legível e evitam "números mágicos" (hardcoded).

// 2. Enum de String
enum ClothingSize {
    ExtraSmall = "PP",
    Small = "P",
    Medium = "M",
    Large = "G",
    ExtraLarge = "GG"
}

const cloth = {
    color: 'red',
    size: ClothingSize.ExtraLarge // Previne erros de digitação como "G G" ou "gg"
};

console.log(`O tamanho da peça é ${cloth.size}`); // Output: O tamanho da peça é GG
```

## Intersection Types (`&`)

A **interseção de tipos** (`&`) é um recurso poderoso do TypeScript que permite combinar múltiplos tipos em um só. O tipo resultante terá **todas as propriedades** dos tipos que foram unidos, criando um "contrato" mais complexo e completo.

### 📂 `intersections.ts`

Este arquivo mostra um exemplo literal e simples de como criar uma interseção.

- **Conceito:** Duas interfaces (`Robot` e `Human`) são combinadas para formar um novo tipo (`Cyborg`).
- **Resultado:** Qualquer variável do tipo `Cyborg` deve obrigatoriamente ter todas as propriedades definidas tanto em `Robot` quanto em `Human`.

```ts
// exemplo literaL de interseção

interface Robot {
    material: string
    fuel: string
}

interface Human {
    name: string
    age: number
}

type Cyborg = Robot & Human

const cyborg: Cyborg = {
    name: 'Ramon',
    material: 'Lata',
    age: 20,
    fuel: "refrigerante"
}
```

### 📂 `interFetch.ts`

Este arquivo demonstra um caso de uso prático: estender tipos nativos do TypeScript para criar funções mais flexíveis e seguras.

- **Conceito:** Criamos uma função "wrapper" chamada `myFetch` que adiciona funcionalidades à API `fetch` nativa.
- **Implementação:** Combinamos nossa própria interface de opções (`MyFetchOptions`) com a interface nativa do TypeScript, `RequestInit`.
- **Vantagem:** O tipo resultante `RequestOptions` aceita tanto as opções-padrão da `fetch` (`method`, `headers`, `body`, etc.) quanto as que criamos (`printInput`, `printTime`), tudo com o suporte completo de tipagem e autocompletar do editor.

```ts
interface MyFetchOptions {
    printInput?: boolean
    printTime?: boolean
}

// 'RequestOptions' agora possui TODAS as opções de 'MyFetchOptions' E 'RequestInit'
type RequestOptions = MyFetchOptions & RequestInit

export function myFetch(input: string, options?: RequestOptions) {
    if(options?.printInput) {
        console.log('Input', input)
    }
    if(options?.printTime) {
        console.log('Horário', new Date().toLocaleDateString())
    }
    // Todas as opções, incluindo as nativas, são repassadas para a fetch original
    return fetch(input, options)
}

// Exemplo de uso com opções customizadas e nativas
myFetch("http://localhost:3001/auth", {
    printTime: true,
    printInput: true,
    method: "POST", // opção nativa do fetch
});
```

## Union Types (`|`)

**Union Types** (`|`) são uma maneira de declarar que uma variável, parâmetro ou retorno de função pode ter **um de vários tipos possíveis**. Diferente da interseção (`&`) que exige *todos* os tipos, a união permite *qualquer um* dos tipos especificados. Isso torna o código extremamente flexível e descritivo.

### 📂 `union.ts`

Este arquivo mostra a união mais básica, combinando tipos primitivos.

- **Conceito:** A `type Primitive` pode armazenar um valor que seja `string`, `number` ou `boolean`.
- **Uso:** Usando `typeof`, podemos verificar qual tipo a variável possui em tempo de execução e o TypeScript irá "entender" o contexto, liberando as operações específicas daquele tipo (um processo chamado de *narrowing* ou "estreitamento").

```ts
type Primitive = string | number | boolean

export function main(value: Primitive) {
    if(typeof value === 'string') {
        // Agora, TS sabe que 'value' é uma string aqui dentro.
        console.log(value.toUpperCase());
        return;
    }
    if(typeof value === 'number') {
        // E aqui, sabe que é um número.
        console.log(value.toFixed(2));
        return;
    }
    // E aqui, por eliminação, sabe que só pode ser boolean.
    console.log("É um booleano:", value);
}
```

### 📂 `literalUnion.ts`

A união não se limita a tipos primitivos, ela também pode ser feita com **valores literais**, criando um conjunto restrito de constantes permitidas.

- **Conceito:** A `type Action` só pode receber as strings `"create"`, `"update"`, ou `"delete"`. O mesmo acontece com `ImageSize`, que só aceita os números específicos na lista.
- **Vantagem:** Previne erros de digitação e o uso de valores inválidos (as "magic strings/numbers"), oferecendo autocompletar no editor.

```ts
// União de strings literais
type Action = "create" | "update" | "delete"

function manage(action: Action) { /*...*/ }
manage("create") // Válido
// manage("read")  // Erro: "read" não é um valor permitido

// União de números literais
type ImageSize = 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048

interface Image {
    name: string;
    size: ImageSize
}

const image: Image = {
    name: 'Ramon',
    size: 1024 // Válido
}
```

### 📂 `enumUnion.ts` (Discriminated Unions)

Este arquivo demonstra um dos padrões mais poderosos em TypeScript: **Uniões Discriminadas** (ou *Tagged Unions*).

- **Conceito:** Usamos uma propriedade em comum (aqui, `type`) como um "discriminante" ou "tag". Cada interface na união tem a mesma propriedade `type`, mas com um valor literal diferente (neste caso, um membro do `enum TrafficLightType`).
- **Vantagem:** Quando verificamos o valor da propriedade `type`, o TypeScript consegue **discriminar** qual das interfaces está em uso e libera o acesso às suas propriedades e métodos específicos com total segurança de tipo. É um padrão excelente para modelar estados.

```ts
// Usar um Enum para as "tags" torna o código mais legível e seguro.
enum TrafficLightType {
    Green,
    Yellow,
    Red,
}

// Cada interface tem a propriedade 'type' como discriminante
interface GreenColor {
    type: TrafficLightType.Green
    drive(): void;
}
interface YellowColor {
    type: TrafficLightType.Yellow
    wait(): void;
}
interface RedColor {
    type: TrafficLightType.Red
    stop(): void;
}

type TrafficLight = GreenColor | YellowColor | RedColor;

function handleTrafficLight(light: TrafficLight) {
    // Ao verificar a propriedade 'type', TS sabe exatamente qual é a forma do objeto
    switch (light.type) {
        case TrafficLightType.Green:
            light.drive(); // 'drive' está disponível
            break;
        case TrafficLightType.Yellow:
            light.wait(); // 'wait' está disponível
            break;
        case TrafficLightType.Red:
            light.stop(); // 'stop' está disponível
            break;
    }
}
```

### 📂 `combinedUnion.ts`

Unions podem combinar tipos literais diferentes, como strings e números, em uma única definição.

- **Conceito:** O tipo `Status` pode representar o status de uma resposta tanto pela string descritiva (`"Ok"`) quanto pelo seu código numérico (`200`).

```ts
type Status = "notFound" | 404 | "Ok" | 200 | "forbidden" | 403;

function sendStatus(status: Status) {
    console.log("Enviando status:", status);
}

sendStatus("Ok");      // Válido
sendStatus(404);       // Válido
// sendStatus("error"); // Erro: valor não permitido
```

### 📂 `jsonUnion.ts`

Este exemplo mostra uma aplicação avançada de uniões: um **tipo recursivo** para validar qualquer estrutura JSON.

- **Conceito:** O tipo `JSONValue` define que um valor JSON pode ser um primitivo (`string`, `number`, `boolean`), ou um array de `JSONValue`s, ou um objeto onde cada chave aponta para um `JSONValue`.
- **Uso:** É extremamente útil ao fazer o `parse` de um JSON de uma fonte externa, pois permite navegar pela estrutura de forma segura.

```ts
import { readFile } from "fs/promises"

// O tipo 'JSONValue' se referencia a si mesmo, permitindo estruturas aninhadas.
type JSONValue = string | number | boolean | JSONValue[] | {
    [key: string]: JSONValue
}

async function parseJSON(filePath: string): Promise<JSONValue> {
    const jsonstring = await readFile(filePath, "utf-8");
    const json: JSONValue = JSON.parse(jsonstring);
    return json;
}
```

### 📂 `diffUnionTypes.ts`

Por fim, a união pode ser usada para criar sobrecargas de função de uma maneira mais flexível.

- **Conceito:** O tipo `FindItemPredicate` define que o "predicado" para encontrar um item pode ser duas coisas completamente diferentes: um `number` (para atuar como um índice de array) ou uma `função` (para uma busca mais complexa).
- **Vantagem:** Permite que a função `findItem` tenha dois comportamentos distintos, ambos com segurança de tipo, dependendo do tipo de argumento que ela recebe.

```ts
type FindItemPredicate = number | ( (value: string, index: number) => boolean );

function findItem(array: string[], predicate: FindItemPredicate ) {
    // Se o predicado for um número, usamos como índice.
    if (typeof predicate === "number") {
        return array[predicate];
    }
    // Caso contrário, TS sabe que é uma função e podemos usá-la no 'find'.
    return array.find(predicate)
}

// Uso com número
console.log( findItem(["Ramon", "Coelho", "Melo"], 1) ); // Output: Coelho

// Uso com função
console.log( findItem(["Ramon", "Coelho", "Melo"], (value) => value.startsWith("M")) ); // Output: Melo
```

**Esta documentação é uma referência para que eu me lembre de tudo o que já fiz e possa reutilizar no futuro.**
