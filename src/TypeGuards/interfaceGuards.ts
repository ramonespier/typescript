interface Fish {
    swim: () => void;
}

interface Bird {
    fly: () => void;
}

function move(animal: Fish | Bird) {
    if("swim" in animal) {
        animal.swim()
        return;
    }
    animal.fly()
}