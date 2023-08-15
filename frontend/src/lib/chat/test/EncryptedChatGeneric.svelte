<script lang="ts">
	import SimpleForm from "$lib/Components/SimpleForm.svelte";
	import { SocketOnBuilder, socket } from "$lib/realtime";
	import { onMount } from "svelte";
	import Messages from "../Messages.svelte";
	import { getValidatedMessageData, type MessageData } from "../chat";
	import { scrollToBottomAction } from "$lib/Components/utils";
	import type { EncryptionHelper, ExportedKey } from "$lib/encryption";
	import type { EncryptedTextObj } from "../../../../../shared-types";
    
    const exampleMessageData:MessageData = {
        senderId: "dImX61BLaswpBoCsAADT",
        senderDisplayName: "ttools",
        messageText: "Welcome to Chat"
    }

    //-----
    export let roomId:string;

    export let displayName = "Default"
    export let messagesData:MessageData[] = [exampleMessageData] //
    // export let encryptionKey:ExportedKey;
    export let encryption:EncryptionHelper

    export const callSend = (message:string) => {sendMessage(message)}

    //-----

    const {socketOn, getMountFunction} = new SocketOnBuilder()
    onMount(getMountFunction()) //should call mount function after the rest of the code is run i think. (in fact you could even call onmount from realtime.ts)
    //-----

    let joined_room = false;
    $: {
        if (!joined_room)
            socket.emit("join_room_exclusively", roomId, ()=>{joined_room=true})
            //I believe SocketIo will emit this multiple times automatically until it is acknowledged by the server, such that if the connection goes down and back up it will work
    }
    
    let got_old_messages = false;
    $: {
        if (!got_old_messages)
            socket.emit("get_message_history", roomId, async (messageHistory)=>{
                await receiveMessageHistory(messageHistory)
                got_old_messages=true
            })
    }
    //If we didn't get the message history within 10 seconds we assume the server/db is down
    //Probably a more "clean" way of implementing this
    let failed_to_get_old_messages = false
    setTimeout(()=>{
        if (!got_old_messages) {
            failed_to_get_old_messages = true
        }
    }, 10_000)
    $: {
        if (failed_to_get_old_messages)
            messagesData[0] = {
                senderId: "dImX61BLaswpBoCsAADT",
                senderDisplayName: "ttools",
                messageText: "Failed to get Message History, but you might still be able to see new messages showing up"
            }
    }
    
    async function receiveMessageHistory(messageHistory:EncryptedTextObj[]) {
        
        const historicalMessages = await Promise.all(messageHistory.map(async (encryptedMessage)=>{
                return await getValidatedMessageData(encryptedMessage, encryption)
            })
        )
        console.log(historicalMessages)
        // messagesData.push(messageData)
        messagesData = [...messagesData, ...historicalMessages]
    }


    
    //---

    

    

    socketOn("receive_encrypted_message", async (encryptedMessage, roomId)=>{
        console.log("received encrypted message", encryptedMessage)
        //TODO: double check that we can't be attacked by malicious data
        
        const messageData = await getValidatedMessageData(encryptedMessage, encryption)

        messagesData.push(messageData)
        messagesData = messagesData
    })

    async function sendMessage(message:string){

        const messageData = {
            senderId:socket.id, senderDisplayName:displayName, messageText:message
        }

        //send message
        const encryptedMessage = await encryption.encryptText(JSON.stringify(messageData))
        socket.emit("send_encrypted_message", roomId, encryptedMessage)
        
        console.log("sending encrypted message", encryptedMessage, "with key", await encryption.exportKeyAsText())
        
        //update sent screen
        messagesData.push(messageData)
        messagesData = messagesData;
    }  


</script>


{#if !joined_room || !encryption}
    <p>Connecting to Chat...</p>
{:else if !got_old_messages && !failed_to_get_old_messages}
    <p>Connecting to Chat... (retrieving message history)</p>
    <!-- <p>Retrieving Message History</p> -->
{:else}
    <slot />
    <!-- <div use:scrollToBottom={messagesData} style="padding-bottom:20px">
        <Messages data={messagesData}/>
        <SimpleForm buttonText="Send" onSubmit={sendMessage}/>
    </div> -->
{/if}