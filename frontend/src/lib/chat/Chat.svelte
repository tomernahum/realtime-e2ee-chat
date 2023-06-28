<script lang="ts">
	import SimpleForm from "$lib/Components/SimpleForm.svelte";
	import { SocketOnBuilder, socket } from "$lib/realtime";
	import { onMount } from "svelte";
	import Messages from "./Messages.svelte";
	import type { MessageData } from "./chat";
	import { scrollToBottom } from "$lib/Components/actions";
    
    const exampleMessageData:MessageData = {
        senderId: "dImX61BLaswpBoCsAADT",
        senderDisplayName: "ttools",
        messageText: "Welcome to Chat"
    }

    //-----

    export let messagesData:MessageData[] = [exampleMessageData] //
    export let roomId = ""
    export let displayName = "Default"

    //-----

    const {socketOn, getMountFunction, events} = new SocketOnBuilder()
    onMount(getMountFunction()) //should call mount function after the rest of the code is run i think. (in fact you could even call onmount from realtime.ts)
    onMount(()=>{console.log("Hello")})
    //-----

    let loading = true;
    $: socket.emit("join_room_exclusively", roomId, ()=>{loading=false})


    socketOn("receive_message", (messageArgs)=>{
        messageArgs
        console.log("received message", messageArgs.messageText)
        
        messagesData.push(messageArgs)
        messagesData = messagesData
    })



    function sendMessage(message:string){

        const messageData = {
            senderId:socket.id, senderDisplayName:displayName, messageText:message
        }

        socket.emit("send_message", roomId, messageData)
        
        messagesData.push(messageData)
        messagesData = messagesData;
    }  


</script>


{#if loading}
    <p>Connecting to Chat...</p>
{:else}
    <div use:scrollToBottom={messagesData} style="padding-bottom:20px">
        <Messages data={messagesData}/>
        <SimpleForm buttonText="send message" onSubmit={sendMessage}/>
    </div>
{/if}

<!-- {#await socketId}
    <p>Connecting to Chat...</p>
{:then socketId} 
    <div use:scrollToBottom={messagesData} style="padding-bottom:20px">
        <Messages data={messagesData}/>
        <SimpleForm buttonText="send message" onSubmit={sendMessage}/>
    </div>
{/await} -->