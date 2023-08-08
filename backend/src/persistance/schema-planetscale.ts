


import { index, int, mysqlEnum, mysqlTable, serial, text, uniqueIndex, varchar, datetime } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm' 

export const encryptedMessages = mysqlTable('encrypted_chat_message', 
    {
        id: serial('id').primaryKey(),
        // messageData: text('message_data'), //temp
        roomId: varchar("room_id", {length: 255}),
        cipher: text('cipher'),
        iv: text('iv'), //TODO optimize / make varchar ig
    }, 
    (thisTable) => ({
        roomIndex: index('name_idx').on(thisTable.roomId),
    })
);


export const chatRoom = mysqlTable('chatRoom', 
    {
        id: varchar("id", {length: 255}).primaryKey(),
        name: varchar("name", {length: 255}),
    }
)

export const testTable = mysqlTable('test_table', {
    id: serial("id").primaryKey(),
    text: varchar("test_row", {length: 255}),
    date: datetime("created_at").default(sql`UTC_TIMESTAMP`)
})