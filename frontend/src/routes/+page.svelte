<script>
	import CreateRoom from "$lib/chat/CreateRoom.svelte";

</script>


<svelte:head>
    <title>EasyChatRoom - Home</title>
</svelte:head>


<h1 style="margin-top:1rem; margin-bottom:.2rem"> 
    EasyChatRoom 
</h1>
<p style="margin-bottom:.4rem"> 
    <!-- Create a secure<span class="note">(er than average 
        <span class="note-2">(i'm guessing)</span>)
    </span> -->
    Create a secure<span class="note">(ish)</span>* E2EE 
    chatroom in 2 clicks!
</p>

<CreateRoom />


<ul style="margin-top: .2rem;;">
    <li>
        No Accounts
    </li>
    <li style="margin-top: .2rem;">
        E2EE, nobody can see your chats but those with the secret link*
    </li>
    <li style="margin-top: .2rem;">
        <a href="https://github.com/tomernahum/realtime-e2ee-chat" style="color:white">Open Source</a>, Privacy Focused, Free
    </li>
</ul>

<div style="margin-bottom: 3.2rem;">

</div>
<hr>
<div style="margin-top:1rem; font-size: 0.95rem">
    <h2 style="font-size:1.1rem; font-weight:500; margin-left: -.8ch">*Disclaimer:</h2>
    <p>
        1) This app does not have as much total security as some other encrypted messaging apps, such as signal. 
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a href="/security"> (see more details) </a>
        <br>
        BUT it is the most secure out of all messaging apps that are this convenient to use, as far as I know
    </p>
    <p style="margin-top:.3rem">
        2) There is a known vulnerability that exists by default in all e2ee apps running in websites, where the website code server could serve malicious code 
        that steals your keys or messages, instead of serving you the correct & more verifiable open source code.
         <!-- only way to catch this would be to inspect your code every time you load a page -->
        <br style="margin-bottom:.2rem">

        <!-- TODO: MAYBE: move part of this out into different page  -->
        
        This service is vulnerable to that as well. I am working on a solution to this but it would probably require 
        installing a browser extension 
        <!-- extending the browser -->
        to verify that served code is not malicious 
        <!-- (like what
        <a href="https://faq.whatsapp.com/1210420136490135/" style="color:white">whatsapp did</a>) -->
        (like 
        <a href="https://faq.whatsapp.com/1210420136490135/" target="_blank">whatsapp</a>,
        <a href="https://stosb.com/blog/signed-web-pages/" target="_blank">etesync</a>, 
        <!-- also see <a href="https://wiki.mozilla.org/Security/Binary_Transparency" target="_blank">firefox's binary transparency wiki page</a>)  -->
        have done. also see 
        <!-- <a href="https://wiki.mozilla.org/Security/Binary_Transparency" target="_blank">binary transparency</a>)  -->
        <a href="https://wiki.mozilla.org/Security/Binary_Transparency" target="_blank">binary</a>-<a href="https://developers.google.com/android/binary_transparency/overview"> transparency</a>).
        
        <br style="margin-bottom:.2rem">
        Even with this problem you are still protected against passive attacks / "accidental" snooping of your messages; an attacker (ie me or my server providers) would have to act intentionally to break your encryption and read your messages. Other sites do not even promise that admins will not read your messages, but I do.
    </p>
        <!-- Security Issues to write: code injection by me vulnerability, too easy to leak keys, no FS/PCS and other properties like signal, I do not check on packages frequently/thoroughly enough, I am a novice server admin so more vulnerable to hackers. Edit: wait stuilly the whole point is the server doesn't have to be secure, the frontend serving server is cloudflare pages and is pretty secure (though my admin account could be hacked or turned out to be misconfigured) -->
    <p></p>
</div>
<div style="margin-bottom:1rem"></div>
<hr>

<p style="margin-top: 1rem;"> See
    <a href="/about">About</a> 
    and 
    <a href="/faq">FAQ</a>
    for more information about the app.
</p>
<div style="margin-top:3rem; margin-bottom:15rem">
    <p style="margin-bottom: .1rem;">
        
        <a href="https://www.ttools.io" target="_blank">
            More tools
        </a>
    </p>
</div>



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
    a {
        color: white
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