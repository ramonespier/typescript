import { readFile } from "fs/promises"

type JSONValue = string | number | boolean | JSONValue[] | {
    [key: string]: JSONValue
}

const jsonstring = await readFile("data.json", "utf-8")
const json: JSONValue = JSON.parse(jsonstring)

if (typeof json === "string") {}

if (Array.isArray(json)) {
    json.forEach(value => {
        if (typeof value === "number") {
            
        }
    })
}