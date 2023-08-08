import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, varchar, index, serial, text } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const chatRoom = mysqlTable("chatRoom", {
	id: varchar("id", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }),
},
(table) => {
	return {
		chatRoomId: primaryKey(table.id)
	}
});

export const encryptedChatMessage = mysqlTable("encrypted_chat_message", {
	id: serial("id").notNull(),
	messageData: text("message_data"),
	roomId: varchar("room_id", { length: 255 }),
},
(table) => {
	return {
		nameIdx: index("name_idx").on(table.roomId),
		encryptedChatMessageId: primaryKey(table.id)
	}
});