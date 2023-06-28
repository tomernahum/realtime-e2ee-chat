<script lang="ts">
    import { socket } from "$lib/realtime";
	import type { MessageData } from "./chat";

    export let data:MessageData;

    $: isMine = data.senderId === socket.id;

    function stringToHue(s:string){
        let hash = 0;
        if (s.length === 0) return hash;
        for (var i = 0; i < s.length; i++) {
            hash = s.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        return hash % 360;
    }
    
    let customHue = stringToHue(data.senderId)

    // console.log(data.senderId, customHue)

</script>

{#if isMine}
    <p class= "sent message"> 
        {data.messageText}
    </p>
{:else}
    <p class= "received message" style="background-color: hsl({customHue}, 80%, 50%);"> 
        {data.messageText}
    </p>
{/if}

<!-- TODO: add username, maybe time sent -->
<!-- TODO: maybe add read receipts  -->


<style>
    .message{
        padding: 5px 15px;
        
        border-radius: 15px;

        width:fit-content;
        
        margin-bottom: 20px;
    }

    noscript {
        background-color:hsl(134, 20%, 47%);
    }
    
    
    .sent.message {
        background-color: blue;
        margin-left: auto;
        
        border-bottom-right-radius: 1px;

        display:flex;
        justify-content: flex-end;

    }

    .received.message {
        background-color: gainsboro;
        color: black;
        border-bottom-left-radius: 1px;
    }
</style>