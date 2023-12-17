<script lang="ts">
	import { socket } from "$lib/realtime";
	import { tick } from "svelte";
    import Message from "./Message.svelte";
    import type {MessageData} from "../chat"
	import { scrollToBottomAction } from "$lib/Components/utils";


    export let data:MessageData[]


    

    
        
    

</script>


<div>
    {#each data as md}
        <Message data={md}></Message>
    {/each}
</div>


<style>
    div {
        margin-top: 10px;
        padding: 8px 0px;
    }

    
</style>