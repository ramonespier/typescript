abstract class Shape {
    abstract area(): number;

    describe(): void {
        console.log("Isso é uma forma")
    }
}

class Circle extends Shape {
    radius: number;
    constructor(radius:number) {
        super();
        this.radius = radius
    }

    area(): number {
        return Math.PI * this.radius ** 2
    }
    describe(): void {
        console.log("Isso é um circulo")
    }
}

const circle = new Circle(7);
circle.area()
circle.describe()