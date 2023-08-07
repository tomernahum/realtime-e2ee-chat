import { EncryptedTextObj } from "../../shared-types";


export interface Persister {
    saveMessage(roomId:string, message:EncryptedTextObj): Boolean,
    getMessages(roomId:string): void
}


export class SupabasePersister implements Persister{
    saveMessage(roomId:string, message:EncryptedTextObj) {
        return false
    }
    
    
    getMessages(roomId:string) {
    
    }

} 

class PlanetScalePersister implements Persister{
    saveMessage(roomId:string, message:EncryptedTextObj) {
        return false
    }
    
    
    getMessages(roomId:string) {
    
    }

} 

// class MongoDBPersistor implements Persister{

// const {saveMessage, getMessages} = new SupabasePersister()
// export {saveMessage, getMessages}