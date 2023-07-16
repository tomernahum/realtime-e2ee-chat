
type ItemId = string

type ItemType = "bullet" | "to-do"
type ItemContentProperties = {
    type: ItemType,

    textContent?: string,
    checked?: string
}

type Item = {
    id: ItemId,

    parentId: ItemId | "root",
    childrenIds: ItemId[], //ItemIds or items themselves...

    //this might be the encrypted part
    content_properties: ItemContentProperties
}


const exampleItem: Item = {
    id: "qwerty",

    parentId: "root",
    childrenIds: [],

    content_properties: {
        type: "bullet",
        textContent: "I am an example bullet. YAY"
    },
}




import { arrayInsertAfterValue, arrayRemoveByValue, getId } from "./utils"

//TODO: more propper error handling
//MAYBE: have something it goes through (reducer? (not sure what that is)) everytime it makes a change so it makes a transaction we can send to peers. like CRDT
//MAYBE, optional option to pass in ID
// This may be all wrong lol. Do i take item or itemid. its inconsistent

function addItemToBottomOfList(
    parentItem: Item, 
    newItemContent: ItemContentProperties, 
    registerItem: (item: Item) => void
) {
    const newItem: Item = {
        id: getId(),
        parentId: parentItem.id,
        childrenIds: [],

        content_properties: newItemContent,
    }

    registerItem(newItem)
    parentItem.childrenIds.push(newItem.id)
    
    return newItem.id
}

function addItemAfterAnItem(
    parentItem: Item,
    itemToAddAfterId: ItemId,
    newItemContent: ItemContentProperties,
    registerItem: (item: Item) => void
) {
    const newItem: Item = {
        id: getId(),

        parentId: parentItem.id,
        childrenIds: [],

        content_properties: newItemContent,
    }
    registerItem(newItem)

    //insert into list after old item
    arrayInsertAfterValue(parentItem.childrenIds, itemToAddAfterId, newItem.id, "the item we are trying to add an item after does not seem to exist on the root item")

    return newItem.id
}


function moveItem(
    itemToMove:Item,
    // itemToMoveParent: Item,
    itemToMoveInto:Item,
    itemToMoveAfterId: ItemId,
    itemToMoveOriginalParent: Item
    // getItem:(id:ItemId)=>Item
) {
    // const itemToMoveOriginalParent = getItem(itemToMove.parentId)
    // const itemToMoveUnder = getItem((getItem(itemToMoveAfterId).parentId))

    arrayRemoveByValue(itemToMoveOriginalParent.childrenIds, itemToMove.id)
    
    itemToMove.parentId = itemToMoveInto.id
    
    //insert into list after itemToMoveAfterId
    arrayInsertAfterValue(itemToMoveInto.childrenIds, itemToMoveAfterId, itemToMove.id, "the item we are trying to add an item after does not seem to exist on the root item")


}


function indentItem(
    parentItem: Item,
    itemToIndent: Item,
    getItem:(id:ItemId)=>Item
) {

    const itemToIndentIdIndex = _getIndexOfId(parentItem.childrenIds, itemToIndent.id)
    
    const newParentIdIndex = itemToIndentIdIndex - 1
    if (newParentIdIndex <= -1) {
        throw "can not indent as there is no previous bullet (can't double indent)"
    }
   
    const newParent = getItem(parentItem.childrenIds[newParentIdIndex])
    arrayRemoveByValue(parentItem.childrenIds, itemToIndent.id)
    newParent.childrenIds.push(itemToIndent.id)

    itemToIndent.parentId = newParent.id

    return itemToIndent
}


function _unIndentItem(
    grandParentItem: Item,
    parentItem: Item,
    itemToUnIndent: Item,
    getItem:(id:ItemId)=>Item
) {

    // const itemToUnIndentIdIndex = _getIndexOfId(parentItem.childrenIds, itemToUnIndentId)


    arrayRemoveByValue(parentItem.childrenIds, itemToUnIndent.id)
    moveItem(itemToUnIndent, grandParentItem, parentItem.id, parentItem)

}


function _getIndexOfId(childrenIds:ItemId[], id:ItemId) { //not used
    const i = childrenIds.indexOf(id)
    if (i === -1) {
        throw new Error("item id doesn't exist in (rootItem's) children ids...")
    }
    return i
}



function printTree(rootItem:Item, getItem:(id:ItemId)=>Item, indentCount=0) {
    
    console.log(` ${" ".repeat(indentCount)} - ${rootItem.content_properties?.textContent || "empty"}` )
    for (const childId of rootItem.childrenIds) {
        const childItem = getItem(childId)
        printTree(childItem, getItem, indentCount + 4)
    }
}




function ItemStoreThing() {
    const store: Item[] = []

    function registerItem(item: Item) {
        store.push(item)
    }

    function getItem(itemId: ItemId) {
        const x = store.find((item) => itemId === item.id)
        if (x === undefined) {
            throw "that item doesn't exist in the store"
        }
        return x
    }

    function updateItem(itemID: ItemId, newItem: Item) {
        //... might be covered by modifying reference from getItem
        //or might need to pass in function to modify, i will decide later and stuff
    }

    function subscribeToChanges(callback: Function) {
        //... maybe
    }

    //can eventually involve syncing and caching!

    return { registerItem, getItem, _store: store}
}


//temp
import * as readline from 'node:readline/promises'; 
import { stdin, stdout } from 'process'
const rl = readline.createInterface({ input: stdin, output: stdout })
async function main() {

    //rootItem is just data, rather than a class which is data + helper methods. IDK which is better. right now I have helper methods above
    const store = ItemStoreThing()
    let rootItem: Item = {
        id: getId(),
        childrenIds: [],
        parentId: "root",

        content_properties: { type: "bullet", textContent: "Root Bullet" },
    }
    store.registerItem(rootItem)

    // maybe should use classes and bind whatever that is to not have to reference store
    function printTreee(){
        console.log("------")
        // console.log(store._store)
        printTree(rootItem, store.getItem)
    }

    printTreee()
    addItemToBottomOfList(rootItem, {type: "bullet", textContent: "Second Bullet"}, store.registerItem)
    const thridBulletId = addItemToBottomOfList(rootItem, {type: "bullet", textContent: "Third Bullet"}, store.registerItem)
    const fourthBulletId = addItemToBottomOfList(rootItem, {type: "bullet", textContent: "Fourth Bullet"}, store.registerItem)
    printTreee()

    indentItem(rootItem, store.getItem(fourthBulletId), store.getItem)


    printTreee()
    
    


    // console.log("********\n", store._store, thridBulletId)
    // console.log(store.getItem(thridBulletId))


    // while (true) {
    //     const command = await readline.question("Enter Command >  ")
    //     if (command == "add new item")
    // }

}

main()