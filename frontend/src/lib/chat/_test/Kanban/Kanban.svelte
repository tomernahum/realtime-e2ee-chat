<script lang="ts">
	import type { MessageData } from "$lib/chat/chatDisplay/chat";
	import { calculateKanBanState } from "./kanbanData";


    export let messagesData:MessageData[];
    export let callSend:(message: string) => void;

    // Yes this is a little inefficient as it reruns everything but this is what I got right now. In future there won't be more than 100 messages hahaha. we'll test if phones can handle it. I did this to reuse my code for the messages I think? which was not built to be reused btw
    // Rebuild all the messages
    let messageHistoryString:string;
    $: {
        messageHistoryString = ""
        for (const message of messagesData) {
            messageHistoryString = messageHistoryString + "-" + message.messageText
        }
    }

    //
    let kanBanState = ""
    $: {
        kanBanState = calculateKanBanState(kanBanState, messagesData)
    } 


</script>

<p style="margin-bottom:30px; margin-top: -20px">Messages: {messageHistoryString}</p>
<div>
    hello
</div>