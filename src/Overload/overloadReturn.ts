interface Triangle {
    sideA: number
    sideB: number
    sideC: number
}

interface Equilateral extends Triangle {
    type: "equilateral"
}
interface Isoceles extends Triangle {
    type: "isosceles"
}
interface Scalene extends Triangle {
    type: "scalene"
}

type Triangles = Equilateral | Isoceles | Scalene

function triangle(sides: number): Equilateral
function triangle(sideA: number, sideBC: number): Isoceles
function triangle(sideA: number, sideB: number, sideC: number): Scalene
function triangle(A: number, B?: number, C?: number) {
    if( B && C ){
        return {
            type: "scalene",
            sideA: A, sideB: B, sideC: C
        }
    }

    if (B && !C) {
        return {
            type: "isoceles",
            sideA: A, sideB: B, sideC: B
        }
    }

    return {
        type: "equilateral",
        sideA: A, sideB: A, sideC: A
    }
}

const myEquilateral = triangle(10)
const myIsoceles = triangle(10, 20)
const myScalene = triangle(10, 20, 30)