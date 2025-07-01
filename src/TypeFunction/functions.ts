// tipando paramentros e retornos de funções

type Args = string | number | boolean
function boootstrap(dirname: string, args?: Args[]): boolean {
    return true;
}

// boootstrap(import.meta.dirname, [22, true, "Ramon"])

// criando um tipo que descreve uma função
type MainFunction = (args: string[]) => void;

const main: MainFunction = (args) => { }

// metodos dentro de interface

interface Functions {
    run(context: any): void;
    execute(): boolean;
    handle(req: Request, res: Response): void
}

// autocomplete do TS é muito bom...

const funcs: Functions = {
    execute() {
        return true
    },

    handle(req, res) {
        res.ok
    },

    run(context) {

    },
}

// parametros padroes e opcionais
function oldCustomLog(text: string, color: string = "green", time?: Date, author?: string) {
    console.log(color, text)
    if (time) console.log("At:", time.toString())
    if (author) console.log("By:", author.toString())

}

oldCustomLog("Hello world", "red", new Date(), "Ramon")

// melhores passagens de parametros

interface CustomLogOptions {
    color?: string
    time?: Date
    author?: string
}

function CustomLog(text: string, options: CustomLogOptions = {}) {
    const { color="green", author, time } = options;
    console.log(color, text)
    if (time) console.log("At:", time.toString())
    if (author) console.log("By:", author.toString())
}

CustomLog("texto", { time: new Date(), author: "Ramon" });