import { EncryptedTextObj } from "../../../shared-types";

import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import 'dotenv/config'
import { encryptedMessages } from "./schema-planetscale";
import { eq } from "drizzle-orm";



export interface Persister {
    saveMessage(roomId:string, message:EncryptedTextObj): Promise<Boolean>,
    getMessages(roomId:string): void
}

// PlanetScalePersister. If add more then put each persister in its own file maybe

export class PlanetScalePersister implements Persister{
    db:ReturnType<typeof drizzle>
    
    constructor() {

        // create the connection
        const connection = connect({
            host: process.env.DATABASE_HOST,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
        });
        
        this.db = drizzle(connection);
        
    }

    async saveMessage(roomId:string, message:EncryptedTextObj) {
        const startTime = performance.now()
        await this.db.insert(encryptedMessages).values({
            roomId: roomId,
            cipher: message.cipher,
            iv: message.iv,
        })
        const endTime = performance.now()
        console.log(`Insert Message call took ${endTime - startTime} milliseconds`)
        return true
    }
    
    
    async getMessages(roomId:string) {
        const startTime = performance.now()
        
        const data = await this.db.select().from(encryptedMessages).where(eq(encryptedMessages.roomId, roomId))
        
        const endTime = performance.now()
        
        // console.log(data)
        console.log(`Select Messages From Chatroom Call ${endTime - startTime} milliseconds`) //affected by whether I have vpn on since it is a network request after all. So its ideal if server is near database physically. i think database is in aws us-east-2 right now. Railway is all in gcp us-west. Maybe I should move the planetscale to keep the railway. That said the railway doesn't need too much speed
    }

} 

// class MongoDBPersistor implements Persister{}

// const {saveMessage, getMessages} = new SupabasePersister()
// export {saveMessage, getMessages}