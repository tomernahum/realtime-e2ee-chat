
export type EncryptedTextObj = {
    cipher: string; //base64 encoded
    iv: string; //base64 encoded
}

export type ExportedKey = string

export class EncryptionHelper {
    key:CryptoKey

    private constructor(key:CryptoKey) {
        this.key = key
        //constructors can't even be async lol


        this.exportKeyAsText().then((keyText)=>{
            console.log("Initializing encryption, key is", key, 
                        "exported key is", keyText )
        })
    }

    static async getObj(keyText:ExportedKey){
        let key:CryptoKey
        try {
            key = await importKeyFromTextJwk(keyText)
        }
        catch (err) {
            throw (`error importing key, maybe the key is invalid?   ${err}`)
        }
        
        return new EncryptionHelper(key)
    }

    static async getObjWithNewKey() {
        const key = await generateRandomKey()
        return new EncryptionHelper(key)
    }

    async encryptText(plaintext:string){
        return encryptText(plaintext, this.key)
    }

    async decryptText({cipher, iv}:EncryptedTextObj){
        return decryptText({cipher, iv}, this.key)
    }

    async exportKeyAsText(): Promise<ExportedKey>{
        return exportKeyAsTextJwk(this.key)
    }

}

export async function generateExportedEncryptionKey():Promise<ExportedKey>{
    return await exportKeyAsTextJwk(await generateRandomKey())
}


async function encryptText(plainText:string, key:CryptoKey):Promise<EncryptedTextObj> {
    const encryptedText = await _encryptText(plainText, key)
    const base64EncodedEncryptedText = {
        cipher: base64Encode(encryptedText.cipher),
        iv: base64Encode(encryptedText.iv)
    }
    return base64EncodedEncryptedText
}
async function decryptText({cipher, iv}:EncryptedTextObj, key:CryptoKey) {
    const decoded = {
        cipher: base64Decode(cipher),
        iv: base64Decode(iv)
    }
    return await _decryptText(decoded.cipher, decoded.iv, key)
}



async function testttt() {
    const encryption = await EncryptionHelper.getObjWithNewKey()
    const y = await encryption.encryptText("Hello")
    console.log(await encryption.decryptText(y))
    
    const key = await encryption.exportKeyAsText()

    console.log("--------")

    const encryption2 = await EncryptionHelper.getObj(key)
    console.log(
        await encryption2.decryptText(await encryption2.encryptText("Hello Again"))
    )
}




//---------------

// Symmetric key encryption - 1 key to encrypt/decrypt - will be shared via url hash

/* 
    much of this code copied from
    https://davidmyers.dev/blog/a-practical-guide-to-the-web-cryptography-api

    cipher means encrypted text/data


    Flow: (see demo() function at bottom)
*/

// async function encryptText(plainText:string, key:string) {
// }

function generateRandomKey() {
    return crypto.subtle.generateKey(
        {
            name: 'AES-GCM',
            // length: 256,
            length: 128,
        }, 
        true, // extractable=true: it will be possible to export the key and look at in in js
        ['encrypt', 'decrypt']
    )
}

/*
    IV is used as a random number so encrypted data doesn't come out the same every time from the same input.
    don't use the same IV twice with the same key. IV is not secret
    you need to store the iv and use it to decrypt text
*/
function generateIv(){
    // https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams
    return crypto.getRandomValues(new Uint8Array(12))
}

/*
    Encrypt text using a CryptoKey (from generateRandomKey())
    this returns a cipher and an iv
*/
async function _encryptText(text:string, key:CryptoKey){
    
    const paddedText = padText(text)

    const encodedText = encodeStringToBinary(paddedText)
    // TODO: add padding to the text so its not clear how long the text was
    // Probably like 100 chars then 300 then 1000 chars then whatever (or could have max message size). Maybe i need to do more security research too
    
    const iv = generateIv()
    const cipher = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        }, 
        key, 
        encodedText
    )

    return {
        cipher,
        iv
    }
}

async function _decryptText(cipher:BufferSource, iv:Uint8Array, key:CryptoKey) {
    const encodedText = await crypto.subtle.decrypt({
        name: "AES-GCM",
        iv:iv
    }, key, cipher)

    const decodedText = decodeBinaryToString(encodedText)

    return unPadText(decodedText)
}



function padText(text:string) {
    text += "10"

    const PAD_CHECKPOINTS = [1000, 2500, 5000, 10_000] as const //max length on server side is 11_000

    for (const pad_length of PAD_CHECKPOINTS) {
        if (text.length < pad_length) {
            text += "0".repeat(pad_length - text.length)
            break;
        }
    }
    // if (text.length > PAD_CHECKPOINTS.at(-1)) {
        //Do nothing
    // }
    // console.log("padded text", text.length, text)

    return text
}

function unPadText(text:string) {
    return text.slice(0, text.lastIndexOf('1'))
}



async function exportKeyAsTextRaw(key:CryptoKey){
    const exportedKey = await crypto.subtle.exportKey("raw", key);
    const base64EncodedKey = base64Encode(exportedKey)
    return base64EncodedKey
}
async function importKeyFromTextRaw(exportedKey:string){
    return await crypto.subtle.importKey("raw", base64Decode(exportedKey), "AES-GCM", true, [ "encrypt", "decrypt",])
}

async function exportKeyAsTextJwk(key:CryptoKey){
    const exportedKey = await crypto.subtle.exportKey("jwk", key);
    return exportedKey.k as string
}
async function importKeyFromTextJwk(exportedKey:string){
    const jwkObj = {
        k: exportedKey,
        alg: "A128GCM",
        ext: true,
        key_ops: ["encrypt", "decrypt"],
        kty: "oct",
    }
    
    return await crypto.subtle.importKey("jwk", jwkObj, 
        {
            name: 'AES-GCM',
            length: 128,
        },
        true, 
        ['encrypt', 'decrypt']
    )
}

//JUST FOR REFERENCE NOT ACTUALLY USED (copy paste in 2 places to use). didn't use because typescript is stupid and im lazy
const KEY_PARAMS:[{ name: string; length: number; }, boolean, [string, string]] = [
    {
        name: 'AES-GCM',
        length: 128, //shortest option for shortest string (probably an option because its secure though)
    },
    true, // extractable=true: it will be possible to export the key and look at in in js
    ['encrypt', 'decrypt'] //permissions
]


function encodeStringToBinary(text:string) {
    return new TextEncoder().encode(text)
}
function decodeBinaryToString(text:BufferSource) {
    return new TextDecoder().decode(text)
}

//the normal btoa() (also btoa(String.fromCharCode()) maybe?) function is very confusing and doesn't actually work for arbitrary data
//Code copied from here: https://developer.mozilla.org/en-US/docs/Glossary/Base64#converting_arbitrary_binary_data (June 2023)
function base64Encode(bytes:Uint8Array|ArrayBuffer) {
    const realBytes = ('buffer' in bytes)? bytes : new Uint8Array(bytes)

    const binString = Array.from(realBytes, (x) => String.fromCodePoint(x)).join("");
    return btoa(binString);
}
function base64Decode(base64:string){
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0) as number); 
    //POTENTIAL BUG: I'm assuming the `as number` part is correct. I copied this from mdn they said it worked for arbitrary binary data (see above for link). Also atob returns ascii encoded text I think which I'm assuming codepointat works for...
}

async function testing1(){
    const key = await generateRandomKey()
    console.log("key", key)

    console.log("----")

    const y = await _encryptText("Hello", key)
    console.log("encrypted text", y)
    y.cipher

    console.log("----")

    console.log(y.iv.buffer)
    console.log(y.iv)
    console.log(y.iv.toString())
    console.log(decodeBinaryToString(y.iv))
    

    console.log("----")

    const e = base64Encode(y.iv)
    console.log(e)
    console.log(base64Decode(e))
    console.log(base64Decode(e).buffer)


    console.log("--------")
    console.log("--------")
    
    const x = base64Encode(new Uint8Array(y.cipher))
    console.log(x)
    console.log(base64Decode(x))

}



async function demo1(plainText:string, key:CryptoKey){
    // const key = await generateRandomKey()
    console.log("key", key)

    console.log()
    
    //
    //const plainText = plainText
    console.log("Plain text:", plainText)
    
    const encryptedText = await _encryptText(plainText, key)
    console.log("encrypted Text: ", encryptedText)

    const base64EncodedEncryptedText = {
        cipher: base64Encode(encryptedText.cipher),
        iv: base64Encode(encryptedText.iv)
    }
    console.log("base64 encoded encrypted text", base64EncodedEncryptedText)
    

    console.log("")
    console.log("sending to server lah lah lah")
    await new Promise(res => setTimeout(res, 100))
    console.log("getting from server lah lah lah")
    await new Promise(res => setTimeout(res, 100))
    console.log("")


    key;
    base64EncodedEncryptedText;
    const decodedEncryptedText = {
        cipher: base64Decode(base64EncodedEncryptedText.cipher),
        iv: base64Decode(base64EncodedEncryptedText.iv)
    }
    console.log("de-base-64-encoded text", decodedEncryptedText)

    const decryptedText = await _decryptText(decodedEncryptedText.cipher, decodedEncryptedText.iv, key)
    console.log("decrypted text:", decryptedText)
}

async function quiteDemo1(plainText:string, key:CryptoKey) {
    const encryptedText = await _encryptText(plainText, key)
    const base64EncodedEncryptedText = {
        cipher: base64Encode(encryptedText.cipher),
        iv: base64Encode(encryptedText.iv)
    }
    
    //This part is still WIP/Undecided how I will export key
    const exportedKey = await exportKeyAsTextJwk(key)

    // Send to server... Elsewhere... Get back from server

    const importedKey = await importKeyFromTextJwk(exportedKey)

    const decodedEncryptedText = {
        cipher: base64Decode(base64EncodedEncryptedText.cipher),
        iv: base64Decode(base64EncodedEncryptedText.iv)
    }

    const decryptedText = await _decryptText(decodedEncryptedText.cipher, decodedEncryptedText.iv, importedKey)
    

    console.log("exportedKey:", exportedKey)
    console.log()
    console.log("original text:", plainText)
    console.log("encrypted&encoded:", base64EncodedEncryptedText)
    console.log("decrypted & decoded:", decryptedText)

}

async function main() {
    const key = await generateRandomKey()

    console.log(key)

    // const exportedKeyRaw = await exportKeyAsTextRaw(key)
    const exportedKeyJwk = await exportKeyAsTextJwk(key)
    // console.log("exportedKey RAW:", exportedKeyRaw)
    console.log("exportedKey JWK:", exportedKeyJwk)
    // console.log("exportedKey JWK:", exportedKeyJwk.k)

    const importedKey = await importKeyFromTextJwk(exportedKeyJwk)


    const plainTextList = [
        "Hello", "Hello", "Hello",
        "Hello there world", "there hello piece",
        ""," ",
        JSON.stringify({messageText:"Oh hi there!", userName:"Bob Marley"})

    ]

    console.log("----")
    for (const text of plainTextList) {
        await quiteDemo1(text, importedKey)
        // await demo1(text,key)
        console.log("----")
        // console.log("----")
        // console.log("----")
        // console.log("----")
        // console.log("----")
    }
}



// main()