CREATE TABLE IF NOT EXISTS "chat_room" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "encrypted_chat_message" (
	"id" serial PRIMARY KEY NOT NULL,
	"message_data" text,
	"room_id" text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "encrypted_chat_message" ("room_id");