import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { encryptedMessages } from './schema'
 
const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
        throw "Database connection string is invalid"
    }
    console.log(connectionString)
const client = postgres(connectionString)
const db = drizzle(client);



async function displayChats(){
    const allChats = await db.select().from(encryptedMessages)
    console.log(allChats)
}

await displayChats()
// ADD a chat
await db.insert(encryptedMessages).values({messageData:"Test"})
await displayChats()
