function main(value: string[] | Date) {
    if ("push" in value){
        value.push("Ramon")
        return
    }
    value.getDate()
}