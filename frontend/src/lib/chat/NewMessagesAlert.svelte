
<script lang="ts">
	import { scrollToBottom } from "$lib/Components/utils";

    export let parentDiv:HTMLElement
    export let showing = false

    function onClick(){
        scrollToBottom(parentDiv)
        showing = false
    }
</script>




{#if showing}
    <button on:click={onClick}>
        New Messages ⮟
    </button>
{/if}

<style>
    button {
        position:fixed;
        bottom: 5px;
        left: 50%;
    }
</style>