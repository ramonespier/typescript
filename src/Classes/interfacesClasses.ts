interface Drivable {
    startEngine(): void;
    drive(): void
}

class Car implements Drivable {
    startEngine(): void {
        console.log("Engine stated")
    }
    drive(): void {
        console.log("Carro está sendo dirigido")
    }

}