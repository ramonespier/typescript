type FindItemPredicate = (number) | ( (value: string, index: number) => boolean)

function findItem(array: string[], predicate: FindItemPredicate ) {
    if (typeof predicate === "number") {
        return array[predicate];
    }
    return array.find(predicate)
}

findItem(["Ramon", "Coelho", "Melo"], 1)