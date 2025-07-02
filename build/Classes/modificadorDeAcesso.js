class Person {
    age;
    constructor(age) {
        this.age = age;
    }
    getAge() {
        return this.age;
    }
    intro() {
        this.getAge();
    }
}
class Employee extends Person {
    name;
    constructor(name, age) {
        super(age);
        this.name = name;
    }
    introduce() {
        console.log(`Eu sou ${this.name} e eu tenho ${this.getAge()} anos`);
    }
}
class CEO extends Employee {
    invest() {
        this.getAge();
    }
}
const emp = new Employee("Ramon", 20);
emp.introduce();
export {};
