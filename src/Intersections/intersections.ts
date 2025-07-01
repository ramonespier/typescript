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


