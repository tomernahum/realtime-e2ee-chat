
<script lang="ts">
	import { scrollToBottom } from "$lib/Components/utils";

    export let parentDiv:HTMLElement
    export let numberOfUnreadMessages:number;

    function onClick(){
        scrollToBottom(parentDiv)
    }
    // TODO: instead of scrolling to bottom scroll to the last unread message. Also do this automatically on page focus. Maybe the onclick will be handled by the parent then
</script>





<button on:click={onClick}>
    {numberOfUnreadMessages} New Messages ⮟
</button>

<style>
    button {
        position:fixed;
        bottom: 10px;
        left: 50vw;
        z-index: 100000000;
    }
</style>