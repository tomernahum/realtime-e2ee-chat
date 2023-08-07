<script lang="ts">
	import SimpleForm from "$lib/Components/SimpleForm.svelte";
	import { SocketOnBuilder, socket } from "$lib/realtime";
	import { onMount } from "svelte";
	import Messages from "./Messages.svelte";
	import { getValidatedMessageData, type MessageData } from "./chat";
	import { scrollToBottom } from "$lib/Components/actions";
	import type { EncryptionHelper, ExportedKey } from "$lib/encryption";
    
    const exampleMessageData:MessageData = {
        senderId: "dImX61BLaswpBoCsAADT",
        senderDisplayName: "ttools",
        messageText: "Welcome to Chat"
    }

    //-----

    export let displayName = "Default"
    export let messagesData:MessageData[] = [exampleMessageData] //
    export let roomId = ""
    // export let encryptionKey:ExportedKey;
    export let encryption:EncryptionHelper

    //-----

    const {socketOn, getMountFunction} = new SocketOnBuilder()
    onMount(getMountFunction()) //should call mount function after the rest of the code is run i think. (in fact you could even call onmount from realtime.ts)
    //-----

    let joined_room = false;
    $: socket.emit("join_room_exclusively", roomId, ()=>{joined_room=true})
    
    // let encryption:EncryptionHelper;
    // EncryptionHelper.getObj(encryptionKey).then(encryptionObj => {
    //     encryption = encryptionObj
    // })
    //i sort of forgot how to code good right now tbh
    
    
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
{:else}
    <div use:scrollToBottom={messagesData} style="padding-bottom:20px">
        <Messages data={messagesData}/>
        <SimpleForm buttonText="Send" onSubmit={sendMessage}/>
    </div>
{/if}