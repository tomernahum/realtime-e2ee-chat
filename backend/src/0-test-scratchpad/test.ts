
// Dependency Injection With Functions

export type SaveMessage = (message:string)=>boolean
export type RetrieveMessages = ()=>string[]

export const saveMessageSupabase = ((message) => {              // Can't do with `function` syntax for some reason nor without ugly parenthesis 
    console.log(`saved message ${message}`)
    return true
}) satisfies SaveMessage

export const retrieveMessagesSupabase = (()=>{
    internalOrSomething()
    return ["message1", "message2"]
}) satisfies RetrieveMessages

const internalOrSomething = () => {
    console.log("internal")
}


//USE

function myFunction1(saveMessage:SaveMessage, retrieveMessages:RetrieveMessages) {
    const message = "oejrpejrq 1"
    saveMessage(message)
    console.log(retrieveMessages())
}

// import {saveMessageSupabase, retrieveMessagesSupabase} from 'Persistor-supabase' //could also just call it the same and essentially use the file system as classes and to identify which persisting method it is, i kind of dont like duplicate functionality like that tbh
myFunction1(saveMessageSupabase, retrieveMessagesSupabase)




//------------------------
//------------------------
//------------------------



// Dependency Injection with classes

export type Persister = {
    saveMessage: (message:string)=>boolean,
    retrieveMessages: ()=>string[]
}

class SupabasePersister implements Persister {
    saveMessage(message:string) {                                       //(needs `:string` for some reason)
        console.log(`saved message ${message}`)
        return true
    } 

    retrieveMessages(){
        return ["message1", "message2"]
    }

    internalOrSomething(){
        console.log("internal")
    }
}

//USE

function myFunction2(persistor:Persister) {
    const message = "oejrpejrq 2"
    persistor.saveMessage(message)
    console.log(persistor.retrieveMessages())
}

// import SupabasePersister
const persistor = new SupabasePersister() //could add config in here
myFunction2(persistor)


//------------------------
//------------------------
//------------------------



// Dependency Injection with POJOs (plain old javascript objects)

export type Persister1 = {
    saveMessage: (message:string)=>boolean,
    retrieveMessages: ()=>string[]
}

const supabasePersister:Persister1 = {
    saveMessage(message) {                                       //(needs `:string` for some reason)
        console.log(`saved message ${message}`)
        return true
    },

    retrieveMessages(){
        internalOrSomething1()
        return ["message1", "message2"]
    },

    // internalOrSomething(){ //not allowed like this, probably would be if we said satisfies or something
    // }
}
function internalOrSomething1(){
    console.log("internal")
}

const supabasePersister2 = {
    saveMessage(message) {                                       //(needs `:string` for some reason)
        console.log(`saved message ${message}`)
        return true
    },

    retrieveMessages(){
        return ["message1", "message2"]
    },

    //internalOrSomething1(){}, //still not allowed
} satisfies Persister1

//There might be better ways of doing this too, what with satisfies, implements, :, 


//USE
function myFunction3(persistor:Persister1) {
    const message = "oejrpejrq 2"
    persistor.saveMessage(message)
    console.log(persistor.retrieveMessages()) 
}

// import supabasePersister
myFunction3(supabasePersister)




/* 

Two+ ways to group functions: 
1) files and `import`, group functions in files
2) classes and myInstance = new MyClass(config/dependency injection), group functions in classes, some boilerplate to create the class

3) (I assume ) static classes and import MyClass, MyClass.doSomething(), group functions in classes
4) global objects without using the class keyword: MyClass = {function1:()=>{}, function2:()=>{}}



*/


//test

function printLabel(labeledObj: { label: string }) {
    console.log(labeledObj.label);
}
   
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);