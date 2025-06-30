declare global {
    interface Console {
        sayHello(): void
    }
}

Object.assign(console, {
    sayHello(){
        console.log("Hello")
    }
})

console.sayHello()

// é preciso ter cuidado ao extender tipagens já existentes
