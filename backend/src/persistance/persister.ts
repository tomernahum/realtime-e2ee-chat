import { EncryptedTextObj } from "../../../shared-types";

import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import 'dotenv/config'



export interface Persister {
    saveMessage(roomId:string, message:EncryptedTextObj): Boolean,
    getMessages(roomId:string): void
}

// PlanetScalePersister. If add more then put each persister in its own file maybe

export class PlanetScalePersister implements Persister{
    constructor() {
        

        // create the connection
        const connection = connect({
            host: process.env.DATABASE_HOST,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
        });
        
        const db = drizzle(connection);
    }

    saveMessage(roomId:string, message:EncryptedTextObj) {
        return false
    }
    
    
    getMessages(roomId:string) {
    
    }

} 

// class MongoDBPersistor implements Persister{}

// const {saveMessage, getMessages} = new SupabasePersister()
// export {saveMessage, getMessages}