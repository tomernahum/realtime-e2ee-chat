<script lang="ts">
	import { page } from "$app/stores";


	import Chat from "$lib/old/OldChat.svelte";
	import { socketId } from "$lib/realtime";

    // $: hash = $page.url.hash //Bugged
    let hash:string = $page.url.hash; //updated below this script tag
    $: roomId = hash.slice(1)

</script>
<svelte:window
  on:hashchange={() => {
    hash = window.location.hash
  }}
/>


<div>
    <h1>Chat</h1>
    <p>url hash: {hash}</p>
    <p>room: {roomId}</p>
    <p>socketId: 
        {#await socketId}
            connecting...
        {:then socketId} 
            {socketId}
        {/await}
    </p>
    <!-- <br> -->
</div>


<Chat roomId={roomId}/>