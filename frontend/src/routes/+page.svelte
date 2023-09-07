<script>
	import CreateRoom from "$lib/chat/CreateRoom.svelte";

</script>


<svelte:head>
    <title>EasyChatRoom - Home</title>
</svelte:head>


<h1 style="margin-top:1rem; margin-bottom:.2rem"> 
    EasyChatRoom 
</h1>
<p> 
    Create a secure<span class="note">(er than average 
        <span class="note-2">(i'm guessing)</span>)
    </span>
</p>
<p style="margin-bottom: .5rem">
    chatroom in 2 clicks!
</p>



<CreateRoom />
<br>
<br style="margin-bottom: 2rem;">
<hr>
<br style="margin-bottom: .3rem;">
<div>
    <h5 style="margin-bottom: .3rem">
        Features end-to-end encryption via a secret key stored in the URL
    </h5>
    <p style="margin-bottom: .3rem">
        This means that only those who see the URL can read your chat messages!
        (Our server can't)
    </p>
    <p style="margin-bottom: .3rem">
        This is a good compromise between ease of use and privacy 
        ...According to me at least
    </p>
    <p style="margin-bottom: .6rem">
        But it is the same way 
        <a href="https://blog.excalidraw.com/end-to-end-encryption/">
            excalidraw</a>,
        <a href="https://help.mega.io/files-folders/sharing/encrypted-links">
            mega.nz</a>, and 
        <a href="https://docs.cryptpad.org/en/dev_guide/general.html#encryption">
            cryptpad
        </a>
        work.
    </p>
    
    <p class="offset" style="margin-bottom: .6rem; ">
        If you're wondering how it works, browsers don't send the part after the <code>#</code> in the url to webservers, so this webapp encrypts/decrypts chat messages client side only, by using a symmetric AES-GCM key derived from the part after the # in the url of each chatroom
    </p>

    <p>
        <strong>Disclaimer: </strong>
        I am not a security or programming expert, and this system definitely has vulnerabilities and attack vectors (as do even the most well funded devices and applications), but this system probably has more, and more egregious ones, due to my amateur nature. But I think it's at least better than having no attempt at privacy features.
    </p>
</div>

<br>
<br>
<div>
    <h5 style="margin-bottom: .3rem">
        No accounts needed
    </h5>
    <p>
        Just click the button above, send the URL to your friends, and chat real quick. No signing up involved!
    </p>
</div>

<br>
<br>

<div>
    <h5 style="margin-bottom: .3rem">
        Disappearing rooms or permanent ones
    </h5>
    <p>
        You have the option to select. (Disapearing rooms not yet implemented)
    </p>
</div>

<br>
<br>

<div>
    <h5 style="margin-bottom: .3rem">
        Open source and made by an indie dev
    </h5>
    <p>
        Check it out on <a href="">github</a>
    </p>
</div>

<br>
<br>
<hr>
<br>

<div>
    <p style="margin-bottom: .2rem;">
        <a href="http://ttools.io" >
            Feel free to contact me
        </a>
    </p>
    <p style="margin-bottom: .1rem;">
        
        <a href="http://ttools.io" target="_blank">
            More tools
        </a>
    </p>
    
</div>

{#if false}
<br>
<div style="margin-bottom: 50vh;" />
<hr>
<br>
<div>
    <h3>Technologies Used</h3>

    <li style="margin-top:.3rem">
        Svelte and SvelteKit for frontend
    </li>
    <li style="margin-top:.3rem">
        SocketIO and NodeJS for relaying messages and saving them to db.
        <!-- <span class="note">(This could probably be replaced with something more performant)</span> -->
    </li>
    <li style="margin-top:.3rem">
        MySQL with 2 columns (room_id and encrypted_data) and index on room_id for storing chat history. Connected to on backend via DrizzleORM
    </li>
    <li style="margin-top:.3rem">
        Typescript on frontend & backend & for defining the contract for possible socketio messages between them
    </li>
    <li style="margin-top:.3rem">
        Github for ci/cd: cloudflare pages cdn for frontend, railway.app for backend, planetscale for db. All free tier baby
    </li>
    
    <p style="margin-top:.6rem">
        <span class="note">
            All of these could be replaced with alternative more performant and/or more horizontally scalable solutions. Only exception is svelte (doesn't need to scale and relatively performant)

        </span>
    </p>
    <p>
        
    </p>
    
</div>

{/if}







<div style="margin-bottom: 60vh;" />



<style>
    .note {
        opacity: 70%;
    }
    .note-2 {
        opacity: 50%;
    }
    .note-0 {
        opacity: 90%;
    }

    h5 {
        /* text-decoration: underline;   */
        font-size: .9rem;
        font-size: 1.3rem;
        line-height: normal;
        font-weight:500;
    }

    strong {
        /* text-decoration: underline; */
    }

    code {
        background: rgb(17, 17, 17);
        padding: 0 5px;
        border-radius: 5px;
    }

    .offset {
        /* padding-left:8px;  */
        /* border-top: 2px solid rgba(90,90,90,90);
        border-bottom: 2px solid rgba(90,90,90,90);
        padding-top: 4px;
        padding-bottom: 4px; */

        
        background-color: rgba(72, 72, 72, 0.599);

        padding: .31rem .62rem;
    }

    h1 {
        text-decoration:underline 3px;
        font-weight: bolder;
    }

</style>