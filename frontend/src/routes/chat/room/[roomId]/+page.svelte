<script lang="ts">
	import { page } from "$app/stores";
    import { error } from '@sveltejs/kit';


	import Chat from "$lib/chat/OldChat.svelte";
	import EncryptedChat from "$lib/chat/EncryptedChat.svelte";
	import { EncryptionHelper } from "$lib/encryption.js";
	import { socketId } from "$lib/realtime";

    export let data;
    $: roomId = data.roomId
    let hash:string = $page.url.hash; //updated below this script tag  $page.url.hash updates are Bugged
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

    
</script>

<svelte:window
  on:hashchange={() => {
    hash = window.location.hash //we need to update this because sveltekit doesn't reload the page when hash updates.... maybe i could force reload idk
  }}
/>


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
</div>

<br>

{#if !encryption}
    <p>Loading encryption module</p>
{:else if encryption==="error"}
    <p>Your encryption key does not appear to be a valid key. Make sure to include the original # section in the url</p>
{:else}
    <EncryptedChat roomId={roomId} encryption={encryption}/>
{/if}