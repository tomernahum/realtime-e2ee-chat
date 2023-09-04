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