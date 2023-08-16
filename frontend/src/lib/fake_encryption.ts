
// For testing

// export type EncryptedTextObj = {
//     cipher: string; //base64 encoded
//     iv: string; //base64 encoded
// }

// export type ExportedKey = string

import type { EncryptedTextObj, ExportedKey, EncryptionHelper } from "./encryption"

export class FakeEncryptionHelper {
    key:string

    private constructor(key:string) {
        this.key = key
        //constructors can't even be async lol


        // this.exportKeyAsText().then((keyText)=>{
        //     console.log("Initializing encryption, key is", key, 
        //                 "exported key is", keyText )
        // })
    }

    static async getObj(keyText:ExportedKey){
        let key:string
        try {
            // key = await importKeyFromTextJwk(keyText)
            key = keyText
        }
        catch (err) {
            throw (`error importing key, maybe the key is invalid?   ${err}`)
        }
        
        return new FakeEncryptionHelper(key)
    }

    static async getObjWithNewKey() {
        // const key = await generateRandomKey()
        const key = "1111"
        return new FakeEncryptionHelper(key)
    }

    async encryptText(plaintext:string):Promise<EncryptedTextObj>{
        // return encryptText(plaintext, this.key)
        return {cipher: plaintext, iv: ""}
    }

    async decryptText({cipher, iv}:EncryptedTextObj){
        // return decryptText({cipher, iv}, this.key)
        console.log("parsed fake", cipher)
        return cipher
    }

    async exportKeyAsText(): Promise<ExportedKey>{
        // return exportKeyAsTextJwk(this.key)
        return this.key
    }

}