<h1 style="margin-top:1rem; margin-bottom:.5rem"> About </h1>
<p>
    See <a href="/"> Home</a> for features etc
</p>

<svelte:head>
    <title>EasyChatRoom - About</title>
</svelte:head>


<div style="margin-bottom:1rem;" />
<br>
<!-- <hr> -->
<br>
<div style="margin-bottom:1rem;" />

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
    
    <p style="margin-top:.6rem" class="note">
        Most of these could potentially be replaced with alternative, more performant and/or more horizontally scalable solutions. 
    </p>
    <p class="note">
        Only exception is svelte (runs on client so doesn't need to scale beyond that and relatively performant) + cloudflare pages + git.
    </p>
    <p class="note">
        But it is good enough!
    </p>
</div>

<br>
<br>
<!-- 
<div>
    <h3>Cryptography</h3>

    <p style="margin-top:.3rem">
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto">
            Web Crypto Api
        </a> is used for encryption/decryption, this is provided by the browser. The algorithm used is AES-GCM with a 128-bit key. Some more details on how it is used are further down.
    </p>

    <p style="margin-top:.3rem">
        Each chatroom has it's own symmetric key that is used to encrypt/decrypt outgoing/incoming messages.
        This key is exported through a method in the web crypto api, and stored in the url of the chatroom. 
    </p>
    <p style="margin-top:.3rem">
        Since it is stored in the url after a <code>#</code> character, the browser will not send it to our server when requesting a webpage. However when our website loads, it's code can run client side to grab the key from the url and use it with the Web Crypto Api to encryt/decrypt messages.
    </p>
    <p style="margin-top:.3rem">
        The intended use case is that a user shares the room url with their chat partners, complete with the key. It is up to the users to share it in a secure way if they don't want anyone else to see the key. (If a user loads a chatroom without an invalid key the application will display an error. If the user loads the chatroom with a different, but still valid key, they will be able to send messages but people without the same key will not be able to decrypt them and will see an error for that one message.)
    </p>
    <p style="margin-top:.3rem">
        But in any case I (the server administrator) won't be able to see messages, at least in theory. 
    </p>
    <p style="margin-top:.3rem">
        In practice I actually do know a way to hack my own service (this applies to all end-to-end encryption on the web by the way, I hope this changes). But at least if I did use this method it would be pretty unambigious that I am being malicious and breaking people's trust, more unambigious than a server administrator looking at the database and reading people's chat messages I think. The method is serving malicious javascript code from my servers when you load the webpage, more on this further down under "known vunerabilities"
    </p>



    <p style="margin-top:.3rem">
        When you press the "Create Room" button, all it really does is find an unused room id (currently it just picks a random id), and generates a random key that is to be associated with the room. However what key i
    </p>

    <br>

    <p style="margin-top:.3rem">
        The key is randomly generated through a method provided by the Web Crypto Api as well. The key is exported and imported through a method in the api that returns a jwk. However we throw out all fields of the jwk except for the k field (the part that's actually a key) and hardcode the others when we import. The hardcoded parameters are as follows:
    </p>
    
<pre style="background-color: black; padding: 0 .25rem">
alg: "A128GCM",
ext: true,
key_ops: ["encrypt", "decrypt"],
kty: "oct",
</pre>
    
    <br>
    
    
    
</div> -->


<div style="margin-bottom: 50vh;" />

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


</style>