<h1 style="margin-top:1rem; margin-bottom:.5rem"> About </h1>
<p style="margin-top:0.5rem">
    See <a href="/"> Home</a> for features etc
</p>
<p style="margin-top:0.5rem">
    See <a href="/faq"> FAQ </a> for answers to specific questions
</p>
<p style="margin-top:0.5rem">
    See <a href="/security">Security</a> for more information about the security of the app
</p>
<!-- Pages we want:
 




-->
<p style="margin-top:1rem">
    <a href="https://github.com/tomernahum/realtime-e2ee-chat" target="_blank">Source Code</a>
</p>
<!-- <p style="margin-top:1rem">
    <a href="https://www.ttools.io">More Tools</a>
</p> -->

<svelte:head>
    <title>EasyChatRoom - About</title>
</svelte:head>

{#if false}
<div style="margin-bottom:1rem;" />
<br>
<!-- <hr> -->
<br>
<div style="margin-bottom:1rem;" />

<div>
    <h3 style="margin-left: -1.6ch">∗ Technologies Used</h3>

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

<div>
    <h3>Cryptography & Architecture</h3>

    <p style="margin-top:.3rem">
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto">
            Web Crypto Api
        </a> is used for encryption/decryption, this is provided by the browser. The algorithm used is AES-GCM with a 128-bit key.
    </p>

    <!-- Also the IV!! -->

    <p style="margin-top:.3rem">
        The key is randomly generated through a method provided by the Web Crypto Api as well. The key is exported and imported through a method in the api that returns a jwk. However we throw out all fields of the jwk except for the k field (the part that's actually a key) and hardcode the others when we import. 
    </p>
    <p style="margin-top:.3rem"> The hardcoded parameters are as follows: </p>
    
<pre style="background-color: black; padding: 0 .25rem">
alg: "A128GCM",
ext: true,
key_ops: ["encrypt", "decrypt"],
kty: "oct",
</pre>

    <br>
    <p style="margin-top:.3rem">
        Each chatroom has it's own symmetric key that is used to encrypt/decrypt outgoing/incoming messages.
        This key is exported through a method in the web crypto api, and stored in the url of the chatroom. 
    </p>
    <p style="margin-top:.3rem">
        Since the key is stored in the url after a <code>#</code> character, the browser will not send it to our server when requesting a webpage. However when our website loads, it's code can run client side to grab the key from the url and use it with the Web Crypto Api to encryt/decrypt messages.
    </p>
    <p style="margin-top:.3rem">
        The intended use case is that a user shares the room url with their chat partners, complete with the key. It is up to the users to share it in a secure way if they don't want anyone else to see the key.
    </p>
    <p style="margin-top:.3rem">
        But in any case I (the server administrator) won't be able to see the key or messages, at least in theory. 
    </p>
    <p style="margin-top:.3rem">
        In practice I actually do know a way to hack my own service (this applies to all end-to-end encryption on the web by the way, I hope this changes). But at least if I did use this method it would be pretty unambiguous that I am being malicious and breaking people's trust, more unambiguous than a server administrator looking at the database and reading people's chat messages I think. The method is serving malicious javascript code from my servers when you load the webpage, more on this further down under "known vulnerabilities"
    </p>

    <!-- <p style="margin-top:.3rem">
        When you press the "Create Room" button, all it really does is find an unused room id (currently it just picks a random id), and generates a random key that is to be associated with the room. the user is then expected to share the url with the key to others. If a user loads a chatroom with an invalid key the application will display an error. If the user loads the chatroom with a different, but still valid key, they will be able to send messages as any information about what the key is is not stored anywhere but on the client. If a chatroom is sent messages encrypted with a different key, then users will see a "could not decrypt message" error where that message should be. But those with the key can see them.
    </p> -->
    <!-- <p>
        When you send a message, the client first encrypts that message with the key, generating a ciphertext and iv. These are then sent to the server over https. The server then sends the message to all other connected clients who decrypt the message with the key in the url. After the server sends it to other connected clients, the server stores the message ciphertext & iv in a database, along with the roomId associated.
    </p> -->
    <p style="margin-top:.3rem">
        The server only sees the ciphertext and iv of each message, when it receives it it relays it to other clients connected to the same room and stores it in a database along with the roomId. currently no other metadata (such as time sent) is stored, but the server can still see it.
    </p>

    <br>

    <h4> Known Potential Vulnerabilities </h4>
    <ol style="padding-left:0">
        <li> 
            <p> 
                The user can accidentally leak the key pretty easily, for instance if they they share their screen and show the url the key will leaked, or if they send the url over email then the email provider will be able to see the key. So users who want the ultimate privacy will need to bring their own way of encrypted key exchange. For me it would either be using the signal app or in-person talking. 
            </p>
            <p>
                I think this model is intuitive for users though, anyone who sees the url can go to it and see the messages, simple.
            </p>
            <p>
                However this responsibility lies on every single user who sees the url so one of them will probably mess up. This still fits some threat models though
            </p>
            <p>
                There is also no rotation of keys or anything like that, so no forward secrecy: if the key gets leaked all past chat messages can be read by whoever obtains the key. 
            </p>
            <p>
                However there will be an option for periodic deleting of the data in a chatroom from our servers. (I have yet to implement). And users can make a new chatroom with a new key themselves periodically.
            </p>
        </li>
        <li>
            <p>
                Big one: 
            </p>
            <p>
                The frontend/client code is open source (so is the backend), and if you run that code your messages will be encrypted and I the server admin will not be able to read your messages, and you can verify that by reading the source code
            </p>
            <p>
                However:
            </p>
            <p>
                How do you verify that you are running the correct version of code at all? 
            </p>
            <p> 
                This section might be expanded on later, but TLDR: every time you load the page you download code from my servers which handles the encryption key client-side. However my servers could serve code that steals the key and sends it to me, or sends me a plaintext copy of your messages. And I could serve this code only one time or only to a certain ip address that I see often visits a room I want to break into, so the likelyhood of this being detected is really low. 
            </p>
            <p>
                So you are trusting me not to push malicious code and trusting my servers (which are managed by <a href="https://pages.cloudflare.com/">cloudflare pages</a>) not to change the code I push and send malicious code to you. Which does defeat the whole point of end-to-end encryption sadly.
            </p>
            <p>
                This is a problem for all web apps as it is generally how the web works. I am pretty sure this is a bit of a problem for downloaded mobile/desktop apps too, but it is much less of a problem and it not considered as much of a problem because 
                1) you download code once per update, 
                2) and an app store may be in charge of distributing these files so that the developer can't run different code for different people
                3) you can verify the binaries you download every time by running a checksum on them and comparing that to the binaries you are supposed to have downloaded form the open source version. I have heard that reasons like these are why signal does not provide a web app (but they do provide a desktop app that updates like every day so i'm not sure...)
            </p>
            <!-- TO READ: this and the first link in it: https://security.stackexchange.com/questions/238011/why-is-there-no-web-client-for-signal -->
            <p>
                I think work needs to be done to make the web meet the same conditions that people seem to trust for downloaded apps. I don't see why that isn't possible. There should be more awareness of this.
            </p>
            <p>
                My idea is for the browser to automatically verify code every time you download it to make sure it is the same code that would have been compiled from the open source code on github/etc that the community has audited. A similar idea to this is used for third party scripts in the <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity">
                    Subresource Integrity API
                </a>. I don't have the expertise or inclination (right now) to make an extension like that myself though, maybe you want to do it? Or you have a better idea?
            </p>
            <br>
            <p>
                Let me know if you have know any ways to mitigate/fix this. Put them in <a href="https://chat.ttools.io/room/06b1c1b7#8pUwBJInz85czS4rb1KZ0g">this chatroom</a>  ig: 
            </p>
            <!-- <p>
                You can see what code you are running in a browser through the inspect feature, however nobody is going to audit this code every time it is downloaded. And for a website such as this that code is downloaded every time you load/refresh the tab. I could make this a PWA to mitigate the number of times new code is downloaded, but it would still be downloaded at least once per person that loads the site.
            </p>
            <p>
                For traditional downloaded desktop/mobile applications, you download the code from either a website or an app store, and you can (hypothetically) scan the binaries to make sure that they are the exact same binaries that are generated from the source code that you trust. I think you can do that at least. And I think google play and apple store actually do this on your behalf, and they server the same version of the app to all users
            </p> -->
        </li>
        <li>
            <p>
                Any app has some vulnerability in it that smart enough hackers can uncover (and rich enough institutions can buy from those hackers). 
                For instance: <a href="https://techcrunch.com/2023/08/19/cellebrite-asks-cops-to-keep-its-phone-hacking-tech-hush-hush/">Some</a>
                <a href="https://en.wikipedia.org/wiki/Pegasus_(spyware)">examples</a>  of hacking tools.
            </p>
            <p>
                These vulnerabilities can be in the implementation of the software or the system of encryption. I think the system of encryption can be mathematically proven to be secure given certain definitions of security.
            </p>
            <p>
                For bigger and more reputable software, there are ethical security experts and hackers auditing the software for vulnerabilities, which they report to the company and the company fixes them. Thus in order to hack the software attackers generally need to  
            </p>
            <p>
                However I am not an expert on implementation nor encryption, and I have not had my system audited by an expert. I do try my best though.
            </p>
            <p>
                So in addition to the fact that any app probably has some vulnerabilities, mine probably has some more obvious, low-hanging fruit ones that it doesn't cost a ton of time/money to figure out
            </p>
            
                
            

            
        </li>
    </ol>
    
    


    <br>
    
    
    
</div>
{/if}


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

    ol > li > p {
        margin-top: .3rem
    }

</style>