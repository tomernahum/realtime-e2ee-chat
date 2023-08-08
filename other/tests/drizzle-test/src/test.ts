import { drizzle } from '../../../other/drizzle-test_1/node_modules/drizzle-orm/postgres-js'
import postgres from '../../../other/drizzle-test_1/node_modules/postgres/types'

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
