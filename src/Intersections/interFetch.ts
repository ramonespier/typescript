interface MyFetchOptions {
    printInput?: boolean
    printTime?: boolean
}

type RequestOptions = MyFetchOptions & RequestInit

export function myFetch(input: string, options?: RequestOptions) {
    if(options?.printInput) {
        console.log('Input', input)
    }
    if(options?.printTime) {
        console.log('Horário', new Date().toLocaleDateString())
    }
    return fetch(input, options)
}

myFetch("http://localhost:3001/auth", {
    printTime: true,
    printInput: true,
});