class Person {
    protected age: number;
    constructor(age: number) {
        this.age = age;
    }
    protected getAge(): number {
        return this.age
    }
    public intro() {
    this.getAge()
    }
}

class Employee extends Person {
    private name: string
    constructor(name: string, age: number) {
        super(age)
        this.name = name
    }
    public introduce(): void {
        console.log(`Eu sou ${this.name} e eu tenho ${this.getAge()} anos`)
    }
}

class CEO extends Employee {
    invest() {
        this.getAge()
    }
}


const emp = new Employee("Ramon", 20)
emp.introduce()