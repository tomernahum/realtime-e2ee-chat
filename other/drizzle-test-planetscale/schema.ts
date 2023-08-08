


import { index, int, mysqlEnum, mysqlTable, serial, text, uniqueIndex, varchar, datetime } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm' 
// Example Code from Drizzle
/* 
    export const countries = mysqlTable('countries', {
        id: serial('id').primaryKey(),
        name: varchar('name', { length: 256 }),
    }, (countries) => ({
        nameIndex: uniqueIndex('name_idx').on(countries.name),
    }));

    // same thing
    export const countries = mysqlTable('countries', 
        {
            id: serial('id').primaryKey(),
            name: varchar('name', { length: 256 }),
        }, 
        (countries) => ({
            nameIndex: uniqueIndex('name_idx').on(countries.name),
        })
    );

*/

export const encryptedMessages = mysqlTable('encrypted_chat_message', 
    {
        id: serial('id').primaryKey(),
        messageData: text('message_data'),
        roomId: varchar("room_id", {length: 255}),
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