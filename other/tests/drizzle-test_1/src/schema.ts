
//DrizzleORM postgres schema...

import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
 
// export const users = pgTable('users', {
//   id: serial('id').primaryKey(),
//   fullName: text('full_name'),
//   phone: varchar('phone', { length: 256 }),
// });

//this might not be 100% true to the correct schema. I am guessing it here based on the table definition not autogenerating
export const encryptedMessages = pgTable('encrypted_chat_message', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    messageData: text('message_data'),
    roomId: text("room_id"),
})

