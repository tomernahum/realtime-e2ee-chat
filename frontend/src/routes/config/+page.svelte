

<!-- NOT YET IMPLEMENTED -->
<script lang="ts">
	import { socketIoServerUrl, setApiUrl, type Url } from "$lib/globals";

    let selected:Url = socketIoServerUrl; //it doesn't actually check this when we bind it

    // $: setApiUrl(selected)
    

</script>

<label for="socket-io-api-url-select">
    Websockets server url
</label>

<input type="text" bind:value={selected}>

<!-- TODO: this was rushed together need to think about this harder -->