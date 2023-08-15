<script lang="ts">
	import SimpleForm from "$lib/Components/SimpleForm.svelte";
	import { SocketOnBuilder, socket } from "$lib/realtime";
	import { onMount } from "svelte";
	import Messages from "./Messages.svelte";
	import { getValidatedMessageData, type MessageData } from "./chat";
	import { areScrolledToBottom, scrollToBottom, scrollToBottomAction } from "$lib/Components/utils";
	import type { EncryptionHelper, ExportedKey } from "$lib/encryption";
	import type { EncryptedTextObj } from "../../../../shared-types";
	import { tick } from "svelte";
    
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


    // Scroll to bottom on page load
    let div:HTMLDivElement;
    $: {
        div?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest"});    
    }

    let unreadMessages = false;

    

    

    socketOn("receive_encrypted_message", async (encryptedMessage, roomId)=>{
        console.log("received encrypted message", encryptedMessage)
        //TODO: double check that we can't be attacked by malicious data
        
        const messageData = await getValidatedMessageData(encryptedMessage, encryption)

        messagesData.push(messageData)
        messagesData = messagesData

        //if already on bottom of the page scroll to bottom
        const lookingAtNewMessages = areScrolledToBottom(80) && document.hasFocus()
        if (lookingAtNewMessages) {
            scrollToBottom(div)
            // unreadMessages = false
        }
        else {
            unreadMessages = true
        }
        
        
        
            
        // onMessageReceived()

    })

    async function sendMessage(message:string){

        const messageData = {
            senderId:socket.id, senderDisplayName:displayName, messageText:message
        }

        //send message
        const encryptedMessage = await encryption.encryptText(JSON.stringify(messageData))
        
        console.log("sending encrypted message", encryptedMessage, "with key", await encryption.exportKeyAsText())
        
        
        socket.emit("send_encrypted_message", roomId, encryptedMessage, ({errorMessage})=>{
            //after sending update the sent screen
            // no optimistic updates, will only display to user on server
            if (errorMessage) {
                console.log(errorMessage)
                messagesData.push({
                    senderId:"error",
                    senderDisplayName:"ttools",
                    messageText: `Could not send message: "${errorMessage}"`
                    //TODO: if implementing colors then make it send from you but in red
                })
            }
            else {
                messagesData.push(messageData)
            }

            messagesData = messagesData;
            scrollToBottom(div)
        })
        
    }  

    


</script>


{#if !joined_room || !encryption}
    <p>Connecting to Chat...</p>
{:else if !got_old_messages && !failed_to_get_old_messages}
    <p>Connecting to Chat... (retrieving message history)</p>
    <!-- <p>Retrieving Message History</p> -->
{:else}
        
    <!--  use:scrollToBottom={messagesData} -->
    <div bind:this={div} style="padding-bottom:20px"> 
        <Messages data={messagesData}/>
        <SimpleForm buttonText="Send" onSubmit={sendMessage}/>
    </div>

    {#if areScrolledToBottom(80)}
        <!-- <div style="position:fixed; left:50%; bottom:50%; z-index:10000">
            hi
        </div> -->
    {/if}
{/if}

