<!-- TODO: this might not pass the contrast check -->

<script lang="ts">
	import { generateExportedEncryptionKey } from "$lib/encryption";
	import { socket } from "$lib/realtime";


    let dialogElement:HTMLDialogElement;
    
    
    let roomUrl:string = "";

    function createInsecureRoom(){
        
        const roomId = crypto.randomUUID().slice(0,8)
        
        
        // socket.emit("create_room", roomId) //TODO
        
        roomUrl = `${window.location.origin}/chat/insecure-room#${roomId}`
        dialogElement.showModal()
    }
    
    async function createEncryptedRoom(){
        
        const roomId = crypto.randomUUID().slice(0,8)
        const key = await generateExportedEncryptionKey()
        
        roomUrl = `${window.location.origin}/chat/room/${roomId}#${key}`
        console.log(key)
        
        dialogElement.showModal()
    }

    let copyButtonText = "copy"
    function copyRoomUrl(){
        navigator.clipboard.writeText(roomUrl)
        copyButtonText = "copy ✓"
        setTimeout(()=>{
            copyButtonText = "copy"
        }, 2000)
    }

    function closeModal(){
        dialogElement.close()
    }
    

</script>


<button on:click={createEncryptedRoom}>
    Create Room
</button>

<dialog bind:this={dialogElement}>
    <!-- <form on:submit|preventDefault={createRoom}>
        <label>
            Room Name:
            <input type="text">
        </label>
    </form> -->
    <!-- <p>
        A room has been created. Access it at the url below.
        Send the url to friends through secure means to chat with them.
    </p> -->
    <div class="text" style="margin-bottom: 1rem;">
        <p> A room has been created.</p>
        <p style="margin-bottom: .4rem"> Access it at the url below.</p>
        <p> Send the url to friends through secure means to chat with them.</p>
    </div>


    <div id="link-div">
        <input type="text" value={roomUrl} readonly>
        
        <button class="small-button" on:click={copyRoomUrl}>
            {copyButtonText}
        </button>
        
    </div>

    <div>
        <button on:click={closeModal} class="small-button close-button">
            Close
        </button>
        <a href={roomUrl} on:click={closeModal} class="go-there">
            Go there
            <!-- TODO: add icon -->
        </a>
    </div>
</dialog>

<style>
    dialog[open] {
        border-radius: 30px;
        z-index: 111111111111;
        top: 50%;
        left: 50%;
        translate: -50% -50%;

        width: 90vw;
        max-width: 20rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        padding-bottom: .5rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    dialog::backdrop {
        background-color: rgb(18, 18, 18);
        opacity: 80%;
    }


    button {
        border-radius: 8px;
        border: 2px solid rgb(119, 119, 119);
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-size: inherit;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.3s;
        /* transition: border-width 0.25s; */

        /* border-style: ridge; */

    }
    button:hover {
        border-color: #646cff;
        border-color: #b5b9ff;
        /* border-width: 3px; */
    }
    button:focus,
    button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }

    button {
        margin: .5rem 0
    }

    .small-button {
        padding: 5px 5px;
    }
    .close-button {
        padding: 5px 13px
    }


    a {
        border: 2px solid #8c8cff;
        padding: 5px 8px;
        border-radius: 8px;

        color: var(--text-color);
        text-decoration: none;
        font-weight: bold;

        transition: border-color .25s;
    }

    a:hover {
        /* border-color: #a0a4ff; */
        border-color: var(--text-color);
    }


    dialog * {
        text-align: center;
    }
    dialog > .text, #link-div {
        
        margin-bottom: .5rem;
        /* margin-bottom: 1rem; */
    }
    #link-div {
        margin-bottom: .75rem;
    }

    dialog input {
        font: 1rem;
    }



    #link-div {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 10px;
        /* background-color: red; */
    }
    #link-div > input {
        /* width: 100% */
        /* font-size: .8rem; */
        flex-grow: 2
    }
    #link-div > button {
        /* width: 100% */
    }
</style>