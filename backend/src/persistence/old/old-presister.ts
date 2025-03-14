import { EncryptedTextObj } from "../../../shared-types";

import { drizzle } from "drizzle-orm/planetscale-serverless";
// import { connect } from "@planetscale/database";
import "dotenv/config";
import { encryptedMessages } from "./old-schema-planetscale";
import { desc, eq } from "drizzle-orm";
import { connect } from "@planetscale/database";
// import mysql from "mysql2/promise";

export interface Persister {
  saveMessage(roomId: string, message: EncryptedTextObj): Promise<Boolean>;
  getMessages(roomId: string): Promise<EncryptedTextObj[]>;
  ping: () => Promise<void>;
}

export class EmptyPersister implements Persister {
  db: ReturnType<typeof drizzle>;

  constructor() {}

  async saveMessage(roomId: string, message: EncryptedTextObj) {
    return true;
  }

  async getMessages(roomId: string) {
    return [];
  }

  async ping() {
    return;
  }
}

// PlanetScalePersister. If add more then put each persister in its own file maybe

export class PlanetScalePersister implements Persister {
  db: ReturnType<typeof drizzle>;

  constructor() {
    //constructers not supporting async is stupid btw. luckily this connect function is synchronous however that works

    // create the connection
    const connection = connect({
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    });

    this.db = drizzle(connection); //note i don't understand `this` properly
  }

  async saveMessage(roomId: string, message: EncryptedTextObj) {
    //todo: check if its possible to validate the message is legitimate? I guess you can't

    const startTime = performance.now();
    await this.db.insert(encryptedMessages).values({
      roomId: roomId,
      cipher: message.cipher,
      iv: message.iv,
    });
    const endTime = performance.now();
    console.log(`Insert Message call took ${endTime - startTime} milliseconds`);

    if (!roomId) {
      console.error("NO ROOM ID");
      return false;
    }
    return true; //this is supposed to be if the opp was successful or not
  }

  async getMessages(roomId: string) {
    //TODO maybe cache every 1 second?
    //Get data from db
    const startTime = performance.now();

    const data = (
      await this.db
        .select()
        .from(encryptedMessages)
        .where(eq(encryptedMessages.roomId, roomId))
        .orderBy(desc(encryptedMessages.id))
        .limit(500)
    ).reverse(); //needs the most recent 500 in reverse order. Seem to need subqueries to accomplish this, which I assume count as row reads so I'll just do it here
    //TODO: pagination

    const endTime = performance.now();
    console.log(
      `Select Messages From Chatroom Call took ${
        endTime - startTime
      } milliseconds`
    ); //affected by whether I have vpn on since it is a network request after all. So its ideal if server is near database physically. i think database is in aws us-east-2 right now. Railway is all in gcp us-west. Maybe I should move the planetscale to keep the railway. That said the railway doesn't need too much speed

    // clean and convert data into encrypted text objects
    const clean_data = data.reduce((accumulator: EncryptedTextObj[], item) => {
      if (!item.cipher || !item.iv) {
        // todo set up a process for cleaning these rows
        return accumulator;
      }
      const x = {
        cipher: item.cipher,
        iv: item.iv,
      };
      // accumulator
      accumulator.push(x);
      return accumulator;
    }, []);

    //Remove messages older than 200 most recent messages...
    // don't await this so it can go in the background if it wants
    this.cleanUpRoom();

    //return cleaned data
    return clean_data;
  }

  async cleanUpRoom() {
    //TODO
  }

  async ping() {
    await this.db.select().from(encryptedMessages).limit(1);
  }
}

export class SqLitePersister implements Persister {
    
}

// class MongoDBPersistor implements Persister{}

// const {saveMessage, getMessages} = new SupabasePersister()
// export {saveMessage, getMessages}
