Object.assign(console, {
    sayHello() {
        console.log("Hello");
    }
});
console.sayHello();
export {};
// é preciso ter cuidado ao extender tipagens já existentes
