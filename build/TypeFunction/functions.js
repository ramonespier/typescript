// tipando paramentros e retornos de funções
function boootstrap(dirname, args) {
    return true;
}
const main = (args) => { };
// autocomplete do TS é muito bom...
const funcs = {
    execute() {
        return true;
    },
    handle(req, res) {
        res.ok;
    },
    run(context) {
    },
};
// parametros padroes e opcionais
function oldCustomLog(text, color = "green", time, author) {
    console.log(color, text);
    if (time)
        console.log("At:", time.toString());
    if (author)
        console.log("By:", author.toString());
}
oldCustomLog("Hello world", "red", new Date(), "Ramon");
function CustomLog(text, options = {}) {
    const { color = "green", author, time } = options;
    console.log(color, text);
    if (time)
        console.log("At:", time.toString());
    if (author)
        console.log("By:", author.toString());
}
CustomLog("texto", { time: new Date(), author: "Ramon" });
export {};
