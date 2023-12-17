<script lang="ts">
    import { socket } from "$lib/realtime";
	import { stringToHue } from "../chat";

    export let onSendMessage:(value:string)=>void;

    let value = ""
    function handleSubmit(){
        const v = value
        value = ""
        onSendMessage(v)
    }

    const hue = stringToHue(socket.id)
    const textColor = "black" // TODO make it white if hue is too dark. Also rework hue perhaps
</script>


<form on:submit|preventDefault={handleSubmit}>
    <input type="text" bind:value={value} >
    <!-- TODO -->
    <!-- <span 
        class="input" 
        role="textbox" 
        contenteditable
        style="width: calc(100% - 100px); background: #000000"
        bind:innerText={value}
    >
        {value}
    </span> -->
    

    
    <button class="send-button" type="submit" 
    style="background: hsl({hue}, 80%, 50%);
    color:{textColor}; border-color: hsl({hue}, 80%, 90%);"
    >
        Send
    </button>
    <!-- <button>Send</button>   -->
</form>
<!-- <pre>{value}</pre> -->
<style>
    .send-button {
        padding: 5px 16px;
        font-weight: inherit;
        margin:0;
        text-align: center;
        display: inline;

        /* border-radius: 3px; */
        border-radius: 4px;
        /* border-width: 1.5px; */
        border-width: 0;
        border-style:solid;
    }
    .send-button:active:hover{
        filter:brightness(1.15) saturate(1);
        /* filter:brightness(0.85) saturate(1.1);  */
    }
    .send-button:hover {
        filter:brightness(1.05) saturate(1.1);
        /* filter:brightness(0.95) saturate(1.1);  */
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