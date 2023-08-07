
//DrizzleORM postgres schema...

// source of truth for the database structure! Which I think branches like git idk

import { index, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const encryptedMessages = pgTable('encrypted_chat_message', {
    id: serial('id').primaryKey(),
    // createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    
    messageData: text('message_data'),
    roomId: text("room_id"),
}, (table) => {
    return {
        roomIndex: index("name_idx").on(table.roomId)
    }
})

export const chatRoom = pgTable('chat_room', {
    id: text('id').primaryKey(),
    name: text('name'),
})