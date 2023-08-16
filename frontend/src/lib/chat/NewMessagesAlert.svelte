
<script lang="ts">
	import { scrollToBottom } from "$lib/Components/utils";

    export let parentDiv:HTMLElement
    export let numberOfUnreadMessages:number;

    $: unreadMessagesDisplay = numberOfUnreadMessages > 99 ? "99+" : numberOfUnreadMessages

    function onClick(){
        scrollToBottom(parentDiv)
    }
    // TODO: instead of scrolling to bottom scroll to the last unread message. Also do this automatically on page focus. Maybe the onclick will be handled by the parent then


</script>





<button on:click={onClick}>
    {unreadMessagesDisplay} New Messages &#11167;
</button>

<style>
    button {
        position:fixed;
        bottom: 10px;
        /* left: 50vw; */
        left: 0;
        right:0;
        margin: 0 auto;
        width:fit-content;
        z-index: 100000000;
    }
</style>