<script lang="ts">

    import EncryptedChatGeneric from "$lib/chat/test/EncryptedChatGeneric.svelte";
	import { scrollToBottom } from "$lib/Components/actions";


	import SimpleForm from "$lib/Components/SimpleForm.svelte";
	import type { EncryptionHelper } from "$lib/encryption";
	import type { MessageData } from "../chat";
	import Messages from "../Messages.svelte";

    export let encryption:EncryptionHelper;
    export let roomId:string;
    // export let encryptionKey:string;


    const exampleMessageData:MessageData = {
        senderId: "dImX61BLaswpBoCsAADT",
        senderDisplayName: "ttools",
        messageText: "Welcome to Chat"
    }

    let messagesData:MessageData[] /*= [exampleMessageData]*/;
    let callSend:(message: string) => void;

</script>

<!-- Could expose messagesData as well as sendMessage Function?? maybe logic should be in a .ts not a .svelte ? I already wrote in in svelte which has its own language with the $: -->
<EncryptedChatGeneric {encryption} {roomId} bind:messagesData bind:callSend>
    <div use:scrollToBottom={messagesData} style="padding-bottom:20px">
        <Messages data={messagesData}/>
        <SimpleForm buttonText="Send" onSubmit={callSend}/>
    </div>
</EncryptedChatGeneric>

