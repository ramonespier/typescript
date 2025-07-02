class Shape {
    describe() {
        console.log("Isso é uma forma");
    }
}
class Circle extends Shape {
    radius;
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius ** 2;
    }
    describe() {
        console.log("Isso é um circulo");
    }
}
const circle = new Circle(7);
circle.area();
circle.describe();
export {};
