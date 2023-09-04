<script lang="ts">
    import { socket } from "$lib/realtime";
	import { stringToHue } from "./chat";

    export let onSendMessage:(value:string)=>void;

    let value = ""
    function handleSubmit(){
        onSendMessage(value)
        value = ""
    }

    const hue = stringToHue(socket.id)
</script>


<form on:submit|preventDefault={handleSubmit}>
    <input type="text" bind:value={value} >
    <button class="small-button" type="submit" style="background-color: hsl({hue}, 80%, 50%);">
        Send
    </button>
</form>

<style>
    .small-button {
        padding: 1px 8px;
        font-weight: inherit;
        margin:0;
        text-align: center;
        display: inline;
    }

    input {
        vertical-align:baseline;
        font-size: inherit;
        /* width:100%; */
        flex-grow: 1;
        padding-left: .3rem;
        padding-right: .3rem;
    }

    form {
        display:flex;
        flex-wrap: wrap;
        gap: .3rem;
        justify-content: stretch;
    }
</style>

<!-- TODO: improve -->