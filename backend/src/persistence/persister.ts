
import { EncryptedTextObj } from "../../../shared-types";

import { DB_FILE_NAME } from '../../globals';

import { drizzle } from 'drizzle-orm/libsql';
import { encryptedMessages } from "./schema-sqlite";


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
        // await this.db.insert(encryptedMessages).values({
        //     roomId: roomId,
        //     cipher: message.cipher,
        //     iv: message.iv,
        // })
        // return true
    }

    async getMessages(roomId: string){
        
    }

    async ping() {
        

        
    }

    // async randomSeed(){
    //     await this.db.insert(encryptedMessages).values({
    //         "cipher": "",
    //         "iv": "",
    //         "roomId": "",
    //     })
    // }
}