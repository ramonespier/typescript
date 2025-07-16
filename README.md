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

## Funções em TypeScript

Tipar funções é uma das atividades centrais ao usar TypeScript. Garante que as funções sejam chamadas com os argumentos corretos e que seus retornos sejam tratados como esperado. Isso elimina uma vasta classe de bugs comuns em JavaScript. O arquivo `functions.ts` explora desde o básico até padrões mais avançados e recomendados.

### 📂 `functions.ts`

Este arquivo cobre como tipar parâmetros, retornos, criar tipos de função e o padrão recomendado para passar múltiplos argumentos opcionais.

#### 1. Tipagem Básica: Parâmetros e Retornos

A forma mais fundamental de tipagem é anotar os parâmetros de entrada e o valor de saída da função.

- **Parâmetros:** Cada parâmetro recebe um tipo. Pode-se usar `?` para torná-lo opcional.
- **Retorno:** O tipo do valor que a função retorna é declarado após a lista de parâmetros. Se a função não retorna nada, usa-se `void`.

```ts
type Args = string | number | boolean;

// 'dirname' é uma string obrigatória.
// 'args' é um array opcional (?) de 'Args'.
// A função DEVE retornar um 'boolean'.
function bootstrap(dirname: string, args?: Args[]): boolean {
    // ... lógica da função ...
    return true;
}
```

#### 2. Criando um Tipo de Função (`Function Type`)

Podemos criar um `type` para descrever a "assinatura" de uma função. Isso é útil para garantir que diferentes funções mantenham o mesmo "contrato" ou para tipar callbacks.

```ts
// 'MainFunction' é um tipo que descreve uma função
// que recebe um array de strings e não retorna nada (void).
type MainFunction = (args: string[]) => void;

// 'main' é uma constante que recebe uma função.
// Ao tipá-la com 'MainFunction', garantimos que sua implementação
// siga a assinatura definida.
const main: MainFunction = (args) => {
    console.log("Argumentos:", args);
};
```

#### 3. Métodos Dentro de Interfaces

Interfaces são perfeitas para definir a "forma" de um objeto, incluindo os métodos que ele deve conter.

```ts
interface Functions {
    run(context: any): void;
    execute(): boolean;
    handle(req: Request, res: Response): void;
}

// O objeto 'funcs' DEVE implementar todos os métodos
// definidos na interface 'Functions', com as assinaturas corretas.
// O autocomplete do editor aqui é extremamente útil.
const funcs: Functions = {
    execute() {
        return true;
    },
    handle(req, res) {
        // ...
    },
    run(context) {
        // ...
    },
};
```

#### 4. Padrão "Options Object" (A Melhor Forma para Parâmetros Opcionais)

Passar uma longa lista de parâmetros opcionais pode tornar o código confuso e difícil de usar.

**A abordagem problemática:**

```ts
// PROBLEMA: Para passar 'author', eu sou obrigado a passar 'color' e 'time' também,
// mesmo que eu queira usar seus valores padrão. (ex: oldCustomLog("Hello", "green", undefined, "Ramon"))
function oldCustomLog(text: string, color: string = "green", time?: Date, author?: string) {
    // ...
}
```

**A solução recomendada: o padrão "Options Object"**

Criei uma `interface` para agrupar todos os parâmetros opcionais em um único objeto. Isso torna a chamada da função muito mais limpa, legível e flexível.

- **Legibilidade:** Os parâmetros são nomeados, tornando claro o que cada valor significa.
- **Flexibilidade:** A ordem dos parâmetros no objeto não importa.
- **Manutenção:** Adicionar novos parâmetros opcionais no futuro é trivial: basta adicionar uma nova propriedade na interface.

```ts
interface CustomLogOptions {
    color?: string;
    time?: Date;
    author?: string;
}

function CustomLog(text: string, options: CustomLogOptions = {}) {
    // Usamos desestruturação para extrair as propriedades
    // e definir valores padrão de forma limpa.
    const { color = "green", author, time } = options;

    console.log(color, text);
    if (time) console.log("At:", time.toString());
    if (author) console.log("By:", author.toString());
}

// A chamada fica muito mais clara e podemos passar apenas as opções que nos interessam.
CustomLog("Texto com opções", { time: new Date(), author: "Ramon" });
CustomLog("Texto com outra cor", { color: "blue" });
```

## Classes em TypeScript

TypeScript traz os conceitos de Programação Orientada a Objetos (OOP) para o JavaScript de uma forma robusta e segura. Classes funcionam como "plantas" ou "moldes" para a criação de objetos, encapsulando dados (propriedades) e comportamentos (métodos) relacionados.

### 📂 `classes.ts`: Classes, Construtores e Herança

Este arquivo demonstra os fundamentos da criação de classes.

- **Estrutura:** Uma classe agrupa propriedades (variáveis) e métodos (funções).
- **Construtor (`constructor`):** Um método especial executado no momento em que um objeto é criado (`new Player(...)`). É usado para inicializar as propriedades do objeto.
- **Modificadores (`private`):** Controlam o acesso a propriedades/métodos. Uma propriedade `private` só pode ser acessada de dentro da própria classe. (Ver mais em `modificadorDeAcesso.ts`).
- **Métodos `static`:** Pertencem à classe em si, e não a uma instância individual. `Player.players` é um array compartilhado por todos os objetos `Player`.
- **Herança (`extends`):** Uma classe pode herdar propriedades e métodos de outra classe (a "classe pai"). No exemplo, `Cat` herda de `Animal`.
- **`super()`:** Dentro de uma classe filha, `super()` é usado para chamar o construtor da classe pai, garantindo que a inicialização da classe pai seja executada.
- **Sobrescrita de Método (Method Overriding):** Uma classe filha pode fornecer sua própria implementação para um método que ela herdou, como `Cat` fazendo com `makeSound`.

```ts
export class Player {
    // static: esta propriedade pertence à CLASSE Player, não a uma instância.
    private static players: Player[] = []
    
    // Propriedades da instância
    private name: string
    private health: number

    constructor(name: string) {
        this.name = name;
        this.health = 20;
        Player.players.push(this); // Adiciona a nova instância ao array estático
    }

    public damage(amount: number, damager?: Player) {
        // ...lógica
    }

    private die() {
        // ...lógica
    }
}

// Classe base (pai)
class Animal {
    name: string;
    age: number

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    makeSound(): void {
        console.log(`${this.name} está fazendo um som`);
    }
}

// Classe filha que herda de Animal
class Cat extends Animal {
    color: string;
    constructor(name: string, age: number, color: string) {
        super(name, age); // Chama o construtor da classe Animal
        this.color = color;
    }

    // Sobrescreve o método da classe pai
    makeSound(): void {
        console.log(`${this.name} está miando`);
    }
}
```

### 📂 `interfacesClasses.ts`: Implementando Interfaces

Enquanto a herança (`extends`) é sobre herdar implementação, usar `implements` é sobre seguir um **contrato**. Uma classe que implementa uma interface é forçada a fornecer uma implementação para todos os métodos e propriedades definidos nessa interface.

- **Contrato:** A interface `Drivable` define que qualquer coisa "dirigível" deve obrigatoriamente ter os métodos `startEngine` e `drive`.
- **Implementação:** A classe `Car`, ao declarar `implements Drivable`, assume a responsabilidade de implementar esses dois métodos.

```ts
interface Drivable {
    startEngine(): void;
    drive(): void;
}

// A classe Car promete cumprir o contrato definido por Drivable.
class Car implements Drivable {
    startEngine(): void {
        console.log("Engine started");
    }
    drive(): void {
        console.log("Carro está sendo dirigido");
    }
}
```

### 📂 `abstractClass.ts`: Classes Abstratas

Classes abstratas são um meio-termo entre uma interface e uma classe. Elas servem como uma "classe base" que **não pode ser instanciada diretamente**. Elas são projetadas para serem herdadas.

- **Classe Abstrata:** Marcada com a palavra-chave `abstract`, `Shape` define um modelo para outras classes.
- **Método Abstrato:** `abstract area()`: um método que é declarado, mas não tem corpo (implementação). Qualquer classe que herdar de `Shape` será **obrigada** a fornecer uma implementação concreta para `area()`.
- **Método Concreto:** Uma classe abstrata também pode ter métodos totalmente implementados (como `describe`), que são herdados normalmente.

```ts
abstract class Shape {
    // Um método abstrato: deve ser implementado pelas classes filhas.
    abstract area(): number;

    // Um método concreto: é herdado como está.
    describe(): void {
        console.log("Isso é uma forma genérica.");
    }
}

class Circle extends Shape {
    radius: number;
    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    // Implementação obrigatória do método abstrato 'area'.
    area(): number {
        return Math.PI * this.radius ** 2;
    }
    
    // Sobrescrita opcional do método concreto.
    describe(): void {
        console.log("Isso é um círculo.");
    }
}

// const shape = new Shape(); // ERRO: Não se pode instanciar uma classe abstrata.
const circle = new Circle(7);
circle.area();
```

### 📂 `modificadorDeAcesso.ts`: Modificadores de Acesso

Modificadores de acesso controlam a visibilidade e acessibilidade de membros de uma classe (propriedades e métodos).

- **`public` (padrão):** O membro pode ser acessado de qualquer lugar: de dentro da classe, de classes filhas e de fora da classe.
- **`private`:** O membro só pode ser acessado **de dentro da própria classe** que o definiu. Nem classes filhas podem acessá-lo. No exemplo, `name` é privado para `Employee`.
- **`protected`:** O membro pode ser acessado **de dentro da própria classe** e também **de qualquer classe que a herde (filhas)**. No exemplo, `age` e `getAge` são `protected` em `Person` e podem ser usados por `Employee` e `CEO`, mas não podem ser acessados de fora (`const emp = new Employee(...)`, `emp.getAge()` daria erro).

```ts
class Person {
    // protected: acessível a esta classe e classes filhas.
    protected age: number;
    constructor(age: number) {
        this.age = age;
    }
    protected getAge(): number {
        return this.age;
    }
}

class Employee extends Person {
    // private: acessível apenas dentro de Employee.
    private name: string;
    constructor(name: string, age: number) {
        super(age); // Chama construtor de Person
        this.name = name;
    }
    public introduce(): void {
        // Usa o método protected herdado.
        console.log(`Eu sou ${this.name} e eu tenho ${this.getAge()} anos.`);
    }
}

class CEO extends Employee {
    public invest() {
        // Também pode acessar o membro protected da classe "avó".
        const age = this.getAge();
        console.log(`Investindo com a sabedoria de ${age} anos.`);
    }
}

const emp = new Employee("Ramon", 20);
emp.introduce(); // OK

// emp.getAge(); // ERRO: getAge é 'protected' e não pode ser acessado de fora.
// emp.name;    // ERRO: name é 'private' e não pode ser acessado de fora.
```

## Function Overloads (Sobrecarga de Funções)

A **sobrecarga de funções** permite que uma única função tenha múltiplas "assinaturas" de tipo. Isso significa que a mesma função pode ser chamada de diferentes maneiras (com diferentes tipos ou número de argumentos) e o TypeScript saberá exatamente qual tipo de retorno esperar para cada caso de uso.

A estrutura consiste em:
1.  **Assinaturas de Sobrecarga:** Múltiplas declarações da função (sem corpo) que descrevem as diferentes formas de chamá-la.
2.  **Assinatura de Implementação:** Uma única declaração da função (com o corpo) cuja assinatura deve ser genérica o suficiente para ser compatível com todas as assinaturas de sobrecarga.

### 📂 `overload.ts`: Sobrecarga Básica por Tipo de Parâmetro

Este é o exemplo mais fundamental. A função `createDate` pode ser chamada com diferentes tipos de argumento (`Date`, `number`, `string`) e, em todos os casos, o TypeScript entende que o retorno será um objeto `Date`.

```ts
/**
 * Criar uma nova data a partir de outra
 */
function createDate(value: Date): Date;
/**
 * Criar uma nova data usando uma data numerica
 */
function createDate(value: number): Date;
/**
 * Criar uma nova data usando uma data por extenso
 */
function createDate(value: string): Date;
// Esta é a assinatura da implementação, que lida com todos os casos.
function createDate(value: Date | number | string): Date {
    return new Date(value);
}

createDate("2025-01-01"); // Válido
createDate(1735689600000); // Válido
createDate(new Date());  // Válido
```

### 📂 `overloadParams.ts`: Overloads Baseadas nos Parâmetros (Factory)

Aqui, a sobrecarga é usada para um padrão de *Factory*: dependendo do tipo do terceiro argumento, a função "fabrica" e retorna objetos de formas completamente diferentes (`Button`, `SelectMenu` ou `Input`). O TypeScript usa as assinaturas de sobrecarga para inferir perfeitamente o tipo do valor de retorno.

```ts
interface Component { id: string; label: string; }
interface Button extends Component { style: string; }
interface SelectMenu extends Component { options: string[]; }
enum InputType { String, Number, Date, Email, Password }
interface Input extends Component { type: InputType; }

// As assinaturas de sobrecarga
function buildComponent(id: string, label: string, style: string): Button;
function buildComponent(id: string, label: string, options: string[]): SelectMenu;
function buildComponent(id: string, label: string, type: InputType): Input;
// A implementação que lida com a lógica
function buildComponent(id: string, label: string, arg: string | string[] | InputType): Button | SelectMenu | Input {
    if(typeof arg === "string") {
        return { id, label, style: arg };
    }
    if (Array.isArray(arg)) {
        return { id, label, options: arg };
    }
    return { id, label, type: arg };
}

// Graças à sobrecarga, o TS sabe que 'button' é do tipo 'Button'
const button = buildComponent("myButton", "Clique aqui", "red");
```

### 📂 `overloadFunction.ts`: Overloads que Alteram o Tipo de Retorno

Este é um exemplo claro de como uma função *Factory* usa sobrecargas para retornar tipos diferentes com base em uma string literal de entrada. É um padrão muito comum para gerar dados de teste ou objetos de configuração.

```ts
interface Person { name: string; age: number; }
interface Dog { name: string; breed: string; }
interface House { address: string; size: number; }

function generate(type: "person"): Person;
function generate(type: "house"): House;
function generate(type: "dog"): Dog;
function generate(type: "dog" | "house" | "person"): Person | Dog | House {
    switch (type) {
        case "person": return { name: "Ramon", age: 20 };
        case "dog": return { name: "Cachorro", breed: "vira-lata" };
        case "house": return { address: "Minha rua", size: 100 };
    }
}

// O TypeScript infere corretamente que 'house' é do tipo 'House'
const house = generate("house");
// house.address; // Válido e com autocomplete!
```

### 📂 `overloadReturn.ts`: Overloads por Aridade (Número de Argumentos)

Aqui, o TypeScript distingue qual assinatura usar com base em **quantos** argumentos são fornecidos na chamada da função, um conceito conhecido como *aridade*.

- **1 argumento:** Retorna um `Equilateral`.
- **2 argumentos:** Retorna um `Isosceles`.
- **3 argumentos:** Retorna um `Scalene`.

```ts
interface Triangle { sideA: number; sideB: number; sideC: number; }
interface Equilateral extends Triangle { type: "equilateral"; }
interface Isoceles extends Triangle { type: "isosceles"; }
interface Scalene extends Triangle { type: "scalene"; }

function triangle(sides: number): Equilateral;
function triangle(sideA: number, sideBC: number): Isoceles;
function triangle(sideA: number, sideB: number, sideC: number): Scalene;
function triangle(A: number, B?: number, C?: number): Equilateral | Isoceles | Scalene {
    if( B && C ){
        return { type: "scalene", sideA: A, sideB: B, sideC: C };
    }
    if (B) {
        return { type: "isoceles", sideA: A, sideB: B, sideC: B };
    }
    return { type: "equilateral", sideA: A, sideB: A, sideC: A };
}

// Tipos inferidos corretamente com base no número de argumentos
const myEquilateral = triangle(10);
const myIsoceles = triangle(10, 20);
const myScalene = triangle(10, 20, 30);
```

### 📂 `overloadClass.ts`: Overloads no Construtor de Classe

A sobrecarga não se limita a funções autônomas; ela também pode ser aplicada a métodos de classe, sendo o `constructor` um caso de uso muito comum. Isso permite que uma classe seja instanciada de maneiras diferentes.

```ts
class Player {
    public name: string;
    public nickname: string;
    public health: number; 

    // Assinaturas do construtor
    constructor(name: string, nickname: string);
    constructor(name: string, health: number);
    // Implementação do construtor
    constructor(name: string, arg: string | number) {
        this.name = name;
        if (typeof arg === "string") {
            // Caso 'nickname' seja passado
            this.nickname = arg;
            this.health = 20;
        } else {
            // Caso 'health' seja passado
            this.health = arg;
            this.nickname = name;
        }
    }
}

// Ambas as instanciações são válidas graças à sobrecarga
const ramon = new Player("Ramon", "ramonespier");
const rachel = new Player("Rachel", 18);
```

## Type Guards (Estreitamento de Tipos)

**Type Guards** são expressões ou funções que realizam uma verificação de tipo em tempo de execução e garantem (ou "guardam") esse tipo dentro de um escopo condicional. Em outras palavras, quando usamos um *type guard* em um `if`, o TypeScript é inteligente o suficiente para saber que, dentro daquele bloco, a variável pertence a um tipo mais específico, liberando o acesso a suas propriedades e métodos. Este processo é chamado de **estreitamento de tipo** (Type Narrowing).

### 📂 `guards.ts`: O `typeof` Guard

O *type guard* mais básico. O operador `typeof` é usado para diferenciar tipos primitivos do JavaScript (`string`, `number`, `boolean`, `symbol`, etc.).

```ts
function printValue(value: string | number) {
    // Fora do 'if', 'value' é 'string | number'.

    if (typeof value === "string") {
        // Dentro deste bloco, o TS sabe que 'value' é uma 'string'.
        console.log(value.toUpperCase());
        return;
    }

    // Por eliminação, aqui o TS sabe que 'value' só pode ser 'number'.
    console.log(value.toFixed(2));
}
```

### 📂 `interfaceGuards.ts`: O `in` Operator Guard

O operador `in` verifica se um objeto possui uma determinada propriedade. É perfeito para diferenciar entre diferentes interfaces ou objetos que não são classes.

```ts
interface Fish {
    swim: () => void;
}
interface Bird {
    fly: () => void;
}

function move(animal: Fish | Bird) {
    // Se a propriedade "swim" existe em 'animal',
    // o TS estreita o tipo de 'animal' para 'Fish'.
    if("swim" in animal) {
        animal.swim();
        return;
    }

    // Se não, o tipo de 'animal' é estreitado para 'Bird'.
    animal.fly();
}
```

### 📂 `classGuards.ts`: O `instanceof` Guard

O operador `instanceof` é o *type guard* específico para classes. Ele verifica se um objeto é uma instância de uma determinada classe, checando sua cadeia de protótipos.

```ts
class Cat {
    miau() { console.log("meow!"); }
}
class Dog {
    bark() { console.log("Woof!"); }
}

function makeSound (animal: Dog | Cat) {
    // Se 'animal' é uma instância da classe 'Dog', o tipo é estreitado.
    if (animal instanceof Dog) {
        animal.bark();
        return;
    }
    // Caso contrário, será uma instância de 'Cat'.
    animal.miau();
}
```

### 📂 `interfaceProfessionals.ts`: Predicados de Tipo (User-Defined Type Guards)

E quando os operadores nativos não são suficientes? Podemos criar nossas próprias funções *type guard* usando **predicados de tipo**.

- **Sintaxe:** A função deve retornar um booleano, mas sua assinatura de retorno usa a sintaxe `value is Type`.
- **Funcionamento:** Se a função retorna `true`, o TypeScript entende que a variável testada assume o tipo especificado no predicado (`Type`) dentro dos blocos condicionais.
- **Utilidade:** Essencial para diferenciar interfaces, pois elas não existem em tempo de execução (então `instanceof` não funciona).

```ts
interface Chef { cook(): void; }
interface Teacher { teach(): void; }
interface Driver { drive(): void; }
type Professionals = Chef | Teacher | Driver;

// Esta função é um User-Defined Type Guard.
// O predicado 'value is Chef' sinaliza ao TS.
function isChef(value: Professionals): value is Chef  {
    return (value as Chef).cook !== undefined;
}

function execute(professional: Professionals) {
    // Ao chamar isChef(professional), se o retorno for 'true'...
    if(isChef(professional)) {
        // ...o TS sabe que 'professional' aqui dentro é um 'Chef'.
        professional.cook();
        return;
    }

    // ... e assim por diante para os outros guards.
}
```

### 📂 `classProfessionals.ts`: Type Guards como Métodos de Classe

Este é um padrão avançado e elegante que combina `instanceof` com os predicados de tipo, mas na forma de métodos de uma classe base.

- **Padrão:**
    1.  Cria-se uma classe base (`Professionals`).
    2.  Nela, definimos métodos que atuam como *type guards* (`isChef(): this is Chef`).
    3.  A lógica interna de cada método usa o `instanceof` para a verificação real.
- **Vantagem:** A verificação se torna muito mais limpa e orientada a objetos (`professional.isDriver()`).

```ts
class Professionals {
    // Este método é um type guard.
    isChef(): this is Chef {
        return this instanceof Chef;
    }
    isTeacher(): this is Teacher {
        return this instanceof Teacher;
    }
    isDriver(): this is Driver {
        return this instanceof Driver;
    }
}

class Chef extends Professionals {
    public cook(): void { /* ... */ }
}
class Teacher extends Professionals {
    public teach(): void { /* ... */ }
}
class Driver extends Professionals {
    public drive(): void { /* ... */ }
}

function execute(professional: Professionals) {
    // A checagem fica muito mais legível e idiomática.
    if (professional.isDriver()) {
        professional.drive();
    }
    
    if (professional.isChef()) {
        professional.cook();
    }
}
```

**Esta documentação é uma referência para que eu me lembre de tudo o que já fiz e possa reutilizar no futuro.**
