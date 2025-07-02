import { readFile } from "fs/promises";
const jsonstring = await readFile("data.json", "utf-8");
const json = JSON.parse(jsonstring);
if (typeof json === "string") { }
if (Array.isArray(json)) {
    json.forEach(value => {
        if (typeof value === "number") {
        }
    });
}
