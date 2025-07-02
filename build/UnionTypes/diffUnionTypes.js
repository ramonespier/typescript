function findItem(array, predicate) {
    if (typeof predicate === "number") {
        return array[predicate];
    }
    return array.find(predicate);
}
findItem(["Ramon", "Coelho", "Melo"], 1);
export {};
