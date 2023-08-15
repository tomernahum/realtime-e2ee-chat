
<script lang="ts">
	import { scrollToBottom } from "$lib/Components/utils";

    export let parentDiv:HTMLElement
    export let numberOfUnreadMessages:number;

    function onClick(){
        scrollToBottom(parentDiv)
    }
</script>





<button on:click={onClick}>
    {numberOfUnreadMessages} New Messages ⮟
</button>

<style>
    button {
        position:fixed;
        bottom: 5px;
        left: 50%;
        z-index: 100000000;
    }
</style>