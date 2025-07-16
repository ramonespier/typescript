class Player {
    public name: string;
    public nickname: string;
    public health: number; 

    constructor(name: string, nickname: string)
    constructor(name: string, health: number)
    constructor(name: string, arg: string | number) {
        this.name = name
        if (typeof arg === "string") {
            this.nickname = arg;
            this.health = 20;
        } else {
            this.health = arg;
            this.nickname = name
        }
    }
}

const ramon = new Player("Ramon", "ramonespier")
const rachel = new Player("Rachel", 8)