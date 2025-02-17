
import { EncryptedTextObj } from "../../../shared-types";


export interface Persister {
    saveMessage(roomId: string, message: EncryptedTextObj): Promise<Boolean>;
    getMessages(roomId: string): Promise<EncryptedTextObj[]>;
    ping: () => Promise<void>;
}

export class SqlitePersister implements Persister {
    db: undefined;

    constructor() {
        // connect to the db
        this.db = undefined
    }
}