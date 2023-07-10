

const itemsContent = {
    "ID": {
        //parent
        textContent: "Yada Yada"
    }
}

const itemStructure = {
    "ID": {
        parent: "ID2",
        children: []
    }
}

const items = {
    //same thing right
    "ID" : {
        parent: "ID2",
        children: [],
        content: {
            textContent: "Yada Yada "
        }
    }
}

//parent/reparent items:

// change itemStructure.parent
// find parent and change children...
