

// export type MessageContent = {
//     messageText: string

import type { EncryptedTextObj, EncryptionHelper } from "$lib/encryption";
import type { MessageArgs } from "../../../../shared-types";

// }
export type MessageData = MessageArgs //can union with something if we want to store more client side data than the server gives


export async function getValidatedMessageData(encryptedMessage:EncryptedTextObj, encryption:EncryptionHelper): Promise<MessageData> {
    //im sure there a better way to validate yes.
    //some people on youtube use validation libraries such as zod. Why can't typescript have a runtime validation built in that is derrived from types?   If a type were a class than instanceof would work, but types are not classes, but there should still be a function for it for interfaces or types no?
    
    //Decrypt
    let decryptedMessageText:string;
    try {
        decryptedMessageText = await encryption.decryptText(encryptedMessage)
    }
    catch {
        return {
            senderId: "error",
            senderDisplayName: "error",
            messageText: "could not decrypt received message"
        }
    }


    //Parse
    let decryptedMessage:Partial<MessageData> //unknown type doesn't work like I want it to
    
    try {
        decryptedMessage = JSON.parse(decryptedMessageText)
    }
    catch {
        return {
            senderId: "error",
            senderDisplayName: "error",
            messageText: "received invalid message data"
        }
    }

    const out = {
        senderId: decryptedMessage?.senderId || "error",
        senderDisplayName: decryptedMessage?.senderDisplayName || "error",
        messageText: decryptedMessage?.messageText
    }

    if (typeof out.senderId != "string") {
        out.senderId = "error"
    }
    if (typeof out.senderDisplayName != "string") {
        out.senderDisplayName = "error"
    }
    if (typeof out.messageText != "string") {
        out.messageText = "error"
    }

    return out
    
    // Be aware of XSS vunerability for instance if someone sends you an image it might be able to grab your url and send it to a server while fetching the image
    
}

export function stringToHue(s:string){
    let hash = 0;
    if (s.length === 0) return hash;
    for (var i = 0; i < s.length; i++) {
        hash = s.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    return hash % 360;

    // background-color: hsl({customHue}, 80%, 50%);
}







// function test(){
    
// console.log(getValidatedMessageData(""))
// console.log(getValidatedMessageData(JSON.stringify("Hello")))
// console.log(getValidatedMessageData(JSON.stringify({})))
// console.log("---")
// console.log(getValidatedMessageData(JSON.stringify({
//     senderId: "dImX61BLaswpBoCsAADT",
//     senderDisplayName: "ttools",
//     messageText: "Welcome to Chat"
// })))
// console.log(getValidatedMessageData(JSON.stringify({
//     senderId: "",
//     senderDisplayName: "ttools",
// })))

// console.log(getValidatedMessageData(JSON.stringify({
//     senderId: "bad id lol",
//     senderDisplayName: "",
// })))

// console.log(getValidatedMessageData(JSON.stringify({
//     senderDisplayName: "ttools",
//     messageText: "Welcome to Chat"
// })))


// console.log(getValidatedMessageData(JSON.stringify({
//     senderId: 55,
//     senderDisplayName: "ttools",
//     messageText: "Welcome to Chat"
// })))

// console.log(
//     typeof (getValidatedMessageData(JSON.stringify({
//         senderId: 55,
//         senderDisplayName: "ttools",
//         messageText: "Welcome to Chat"
//     })).senderId)
// )
// }