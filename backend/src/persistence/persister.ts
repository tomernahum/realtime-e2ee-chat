
import { EncryptedTextObj } from "../../../shared-types";

import { DB_FILE_NAME } from '../../globals';

import { drizzle } from 'drizzle-orm/libsql';
import { encryptedMessages } from "./schema-sqlite";
import { desc, eq } from "drizzle-orm";


export interface Persister {
    saveMessage(roomId: string, message: EncryptedTextObj): Promise<Boolean>;
    getMessages(roomId: string): Promise<EncryptedTextObj[]>;
    ping: () => Promise<void>;
}

export class SqlitePersister implements Persister {
    db: ReturnType<typeof drizzle>;

    constructor() {
        const db = drizzle(DB_FILE_NAME);
        this.db = db;
    

    }

    async saveMessage(roomId: string, message: EncryptedTextObj){

        if (!roomId) {
            console.error("NO ROOM ID");
            return false;
        }
        const startTime = performance.now();
        await this.db.insert(encryptedMessages).values({
            roomId: roomId,
            cipher: message.cipher,
            iv: message.iv,
        });
        const endTime = performance.now();
        console.log(`Insert Message call took ${endTime - startTime} milliseconds`);

        
        return true; //this is supposed to be if the opp was successful or not
    }

    async getMessages(roomId: string){

        // gets the most recent 1000 messages
        //TODO: pagination


        const startTime = performance.now();

        const data = (
          await this.db
            .select()
            .from(encryptedMessages)
            .where(eq(encryptedMessages.roomId, roomId))
            .orderBy(desc(encryptedMessages.id))
            .limit(100)
        ).reverse();

        // clean and convert data into encrypted text objects
        const clean_data = data.reduce(
          (accumulator: EncryptedTextObj[], item) => {
            //skip over corrupted items (todo maybe: set up a process for cleaning these rows)
            if (!item.cipher || !item.iv) {
                return accumulator;
            }
            const x = {
                cipher: item.cipher,
                iv: item.iv,
            };
            // accumulator
            accumulator.push(x);
            return accumulator;
          },
          []
        );


        const endTime = performance.now();
        console.log(
            `Select Messages From Chatroom Call took ${
                endTime - startTime
            } milliseconds`
        );

        //TODO: schedule removal of messages older than X most recent messages...
        //this.cleanUpRoom();

        //return cleaned data
        return clean_data;
    }

    async ping() {
        await this.db.select().from(encryptedMessages).limit(1);
    }

    // async randomSeed(){
    //     await this.db.insert(encryptedMessages).values({
    //         "cipher": "",
    //         "iv": "",
    //         "roomId": "",
    //     })
    // }
}