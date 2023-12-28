<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	import SimpleForm from "$lib/Components/SimpleForm.svelte";

    import {SocketOnBuilder, socket} from "$lib/realtime"
    
    const {socketOn, getMountFunction} = new SocketOnBuilder()
    $: hash = $page.url.hash
    onMount(getMountFunction()) //DOUBLE CHECK should call mount function after the rest of the code is run. in fact you could even call onmount from realtime.ts


    
    socketOn("connect", () => {
        console.log("connected to socket")
    })

    socketOn("test_event_s2c", (text:string, message:string) => {
        console.log("got message,", text, message)
    })

    


    function sendTestEvent(message="Hello there server!"){
        socket.emit("test_event_c2s", message)
    }
    
    
</script>

<h1>Chat</h1>
<p>hash: {hash}</p>

<br>


<SimpleForm buttonText="send test event" onSubmit={sendTestEvent}/>