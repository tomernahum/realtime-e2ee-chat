
async function encryptTextt(text:string, key:CryptoKey){
    
    const encodedText = new TextEncoder().encode(text)
    // TODO: add padding to the text so its not clear how long the text was
    // Probably like 100 chars then 300 then 1000 chars then whatever (or could have max message size). Maybe i need to do more security research too
    
    const iv = crypto.getRandomValues(new Uint8Array(12))
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

async function mainn(){
    const key = await crypto.subtle.generateKey(
        {
            name: 'AES-GCM',
            length: 256,
        }, 
        true, // extractable=true: it will be possible to export the key and look at in in js
        ['encrypt', 'decrypt']
    )
    const x = await encryptTextt("Hello", key)

    console.log(x.iv)
    console.log(new Uint8Array(x.iv))

}
mainn()