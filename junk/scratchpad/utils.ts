export function getId() {
    return crypto.randomUUID();
}

export function arrayRemoveByValue<T>(array:T[], value:T) { //should pass arrays by reference
    var index = array.indexOf(value);
    if (index !== -1) {
        array.splice(index, 1);
    }
    else {
        console.error("does not exist in the array")
    }
}

export function arrayInsertAfterValue<T>(array:T[], value:T, valueToInsert:T, errorMessage="") {
    const itemToAddBelowIdIndex = array.indexOf(value)
    if (value == -1) {
        throw errorMessage
    }
    array.splice(itemToAddBelowIdIndex, 0, valueToInsert)
}