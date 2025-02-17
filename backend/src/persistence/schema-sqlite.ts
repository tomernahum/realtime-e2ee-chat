

import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core';


export const encryptedMessages = sqliteTable("encrypted_chat_message",{
    id: int().primaryKey({ autoIncrement: true }),
    roomId: text("room_id", {length: 255}),
    cipher: text("cipher"),
    iv: text("iv"),
}, (table) => [
    index("room_index").on(table.roomId)
])

export const chatRoom = sqliteTable("chatRoom",{
    id: text("id", {length: 255}).primaryKey(),
    name: text("name", {length: 255}),
}, (table) => [
    index("chat_room_id").on(table.id)
])