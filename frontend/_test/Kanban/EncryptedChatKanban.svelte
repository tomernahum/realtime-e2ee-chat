<script lang="ts">
	import type { EncryptionHelper } from "$lib/encryption";
	import type { MessageData } from "$lib/chat/chatDisplay/chat";
    import EncryptedChatGeneric from "$lib/chat/test/EncryptedChatGeneric.svelte";
	import SimpleForm from "$lib/Components/SimpleForm.svelte";
	import Kanban from "./Kanban.svelte";



    export let encryption:EncryptionHelper;
    export let roomId:string;
    // export let encryptionKey:string;


    const exampleMessageData:MessageData = {
        senderId: "dImX61BLaswpBoCsAADT",
        senderDisplayName: "ttools",
        messageText: "Welcome to Chat"
    }

    //this definitly probably awkward
    let messagesData:MessageData[] /*= [exampleMessageData]*/;
    let callSend:(message: string) => void;

</script>

<!-- IDK the right way to do this. Made a logic wrapper component to do the chat messages....-->
<EncryptedChatGeneric {encryption} {roomId} bind:messagesData bind:callSend>
    <Kanban {messagesData} {callSend} />
</EncryptedChatGeneric>

