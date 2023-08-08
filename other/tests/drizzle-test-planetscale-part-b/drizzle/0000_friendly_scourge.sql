-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `chatRoom` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	CONSTRAINT `chatRoom_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `encrypted_chat_message` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`message_data` text,
	`room_id` varchar(255),
	CONSTRAINT `encrypted_chat_message_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `encrypted_chat_message` (`room_id`);
*/