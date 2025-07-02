export function myFetch(input, options) {
    if (options?.printInput) {
        console.log('Input', input);
    }
    if (options?.printTime) {
        console.log('Horário', new Date().toLocaleDateString());
    }
    return fetch(input, options);
}
myFetch("http://localhost:3001/auth", {
    printTime: true,
    printInput: true,
});
