<script lang="ts">
    // Just testing around here
    import { page } from "$app/stores";
	import { EncryptionHelper } from "$lib/encryption";
    import { socketId } from "$lib/realtime";

    import EncryptedChatDefault from "$lib/chat/EncryptedChat.svelte";

    export let EncryptedChat:typeof EncryptedChatDefault|any = EncryptedChatDefault;

    $: roomId = $page.params.roomId
    let hash:string = $page.url.hash; //updated in svelte:window  $page.url.hash updates are Bugged
    $: encryptionKey = hash.slice(1) //Don't send this to server!

    let encryption:EncryptionHelper|"error";
    $: {
        EncryptionHelper.getObj(encryptionKey)
        .then(helper => encryption=helper)
        .catch(err => {
            encryption="error"
            console.warn("error constructing encryption object:", err)
        })
    }
    //TODO: Should probably move this into the component and just pass the encryption key lol. only thing needed to figure out is pasisng up errors

    const roomTitle = "Encrypted Chatroom"
    let tabTitlePrefix:string = "";
    $: pageTitle = `${tabTitlePrefix} ${roomTitle}`

</script>
<svelte:window
  on:hashchange={() => {
    hash = window.location.hash //we need to update this because sveltekit doesn't reload the page when hash updates.... maybe i could force reload idk
  }}
/>

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<div>
    <h1>Encrypted Chat</h1>
    <!-- <p>url hash: {hash}</p> -->
    <p>room: {roomId}</p>
    <p>key: {encryptionKey}</p>
    
    <p>socketId: 
        {#await socketId}
            connecting...
        {:then socketId} 
            {socketId}
        {/await}
    </p>
    <!-- <br> -->
    <p></p>

</div>

<br>


{#if !encryption}
    <p>Loading encryption module</p>
{:else if encryption==="error"}
    <p>Your encryption key does not appear to be a valid key. Make sure to include the original # section in the url</p>
    <!-- (It could also be that you are not accessing this site over https or in a "secure context" https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) </p> -->
{:else}
    <EncryptedChat {roomId} {encryption} bind:tabTitlePrefixRecommendation={tabTitlePrefix}/>
{/if}