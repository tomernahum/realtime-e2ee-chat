<script lang="ts">
	import Chat from "$lib/chat/Chat.svelte";
	import CreateRoomButton from "$lib/chat/CreateRoom.svelte";
	import { socketId } from "$lib/realtime";




</script>

<div>
    <h1>Chat</h1>
    <!-- <p>url hash: {hash}</p> -->
    <!-- <p>room: {roomId}</p> -->
    <p>socketId: 
        {#await socketId}
            connecting...
        {:then socketId} 
            {socketId}
        {/await}
    </p>
    <!-- <br> -->
</div>


    
<CreateRoomButton/>

<!-- <br> -->

<h3 style="margin-top:.8rem"><u>Public Rooms:</u></h3>
<a href="/chat/room/aec6ed16#3PPzzbuIjlMpo3b6WUs4LA">Public Room #1</a>




 



