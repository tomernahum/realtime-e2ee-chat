<script lang="ts">
	import CreateRoomButton from "$lib/chat/CreateRoom.svelte";
	import { socketId } from "$lib/realtime";
	import RecentRooms from "./RecentRooms.svelte";




</script>

<svelte:head>
    <title>EasyChatRoom - Chat</title>
</svelte:head>

<div>
    <h1>Chat</h1>
    <!-- <p>url hash: {hash}</p> -->
    <!-- <p>room: {roomId}</p> -->
    <!-- <p>socketId: 
        {#await socketId}
            connecting...
        {:then socketId} 
            {socketId}
        {/await}
    </p> -->
    <!-- <br> -->
</div>



<br>


{#if false}
<h3><u>Recent Rooms</u></h3>
<RecentRooms />
<br>
{/if}


<h3 style="margin-top:.8rem"><u>Public Rooms:</u></h3> 
<!-- <p> (insecure since key is public)  </p> -->

<a href="/room/aec6ed16#3PPzzbuIjlMpo3b6WUs4LA">Public Room #1</a>
<a href="/room/b553d191#y2SunPQxcyqUeUC5Jaq3Tw">Public Room #2</a>
<a href="/room/ee7c3eaf#QHLpsxHrjGYmNeRYiTzf2A">Public Room #3</a>
<!-- <br> -->
<a href="/room/8b79d6a9#u_I04ZZ_6GJmwFQ4wECqaQ">Suggestion Box & FAQ</a>

<br>
<h3><u>Create Your Own</u></h3>
<br>
<CreateRoomButton/>


<style>
    h3, p {
        display:inline
    }
    a {
        display: block
    }
</style>


 



