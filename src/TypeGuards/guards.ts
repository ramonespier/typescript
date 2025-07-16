function printValue(value: string | number) {
    if (typeof value === "string") {
        console.log(value.toUpperCase())
        return;
    }
    value.toFixed(2);
}