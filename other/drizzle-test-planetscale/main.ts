
import 'dotenv/config'

import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
 

// create the connection
const connection = connect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
});
 
const db = drizzle(connection);

console.log("hi")

import { encryptedMessages, testTable } from './schema';
await db.insert(encryptedMessages).values({
    messageData: "TEST",
    roomId: "test-room",
})

const result = await db.select().from(encryptedMessages);
console.log(result)

await db.insert(testTable).values({
    text: "hello from code",
})
await db.insert(testTable).values({
    text: "hello from code2",
})

