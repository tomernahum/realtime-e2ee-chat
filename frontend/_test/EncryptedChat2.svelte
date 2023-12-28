<script lang="ts">
    
	import type { EncryptionHelper } from "$lib/encryption";
	import type { MessageData } from "../chatDisplay/chat";
    import EncryptedChatGeneric from "$lib/chat/test/EncryptedChatGeneric.svelte";
	import { scrollToBottomAction } from "$lib/Components/utils";
	import Messages from "../chatDisplay/Messages.svelte";
	import SimpleForm from "$lib/Components/SimpleForm.svelte";


    
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
    <div use:scrollToBottomAction={messagesData} style="padding-bottom:20px">
        <Messages data={messagesData}/>
        <SimpleForm buttonText="Send" onSubmit={callSend}/>
    </div>
</EncryptedChatGeneric>

