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
<div style="margin-top:1rem;">
    <h2 style="font-size:1.1rem; font-weight:500; margin-left: -.8ch">*Disclaimer:</h2>
    <p>
        1) This app does not have as much total security as some other encrypted messaging apps, such as signal. 
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a href="javascript:alert('Need to put this in a seperate page:
        1) it's too easy for users to accidentally leak keys, since they are stored in the url and visible at all times. User could accidentally share it with snooping provider or stream, and a malicious browser extension could too easily steal it (that part is hard to mitigate on the web afaik, i know cryptpad adds an iframe sandbox to help with this)
        2) if keys do get leaked, there is no damage mitigation or recovery mechanism, unlike things like signal which have FS and PCS encryption properties
        3) also missing some other properties compared to signal such as deniability, deleting old encrypted messages from server,
        4) I am a hobbyist dev currently, not a security expert. it is very possible I messed something up in the design of the app. security around cryptography especially is notoriously easy to mess up.
        5) since this app is a side project for me, I might be slower than average to maintain the app, including updating library dependencies, which could occasionally have vulnerabilities discovered in them requiring them to be updated
        6), see main page, but no binary transparency + web = easy attack vector for server to circumvent encryption, defeating most of the point of e2ee, but keeping secure against passive attackers or ones who haven't thought of this, and also being the case of most encrypted web apps, eg proton app suite, excalidraw. and I honestly don't see how signal desktop app auto-updating itself isn't vulnerable to this (but I'm not an expert)
        7) I could lose your data, or app could go down. unlikely to go down on it's own for long, but it could go down from a huge spike in traffic or ddos, and something unexpected could always happen
        
        On the plus side:
        1) app is so simple that theres less to compromise (eg an attacker can't pretend to be someone there not to gain participation, that is handled out of band)
        2) app is too small to be likely to be targeted by government subpoenas, or even by hackers
        3) still much better privacy than anything you will find on google for `create online chatroom no signups` due to the e2ee, and better convenience than all chatroom apps with e2ee that I could find.  This is about as secure as most other apps (at least for confidentiality and for app made by someone of my experience level), plus the added encryption which (almost) proves I the admin am not reading your messages, something I doubt for non e2e encrypted sites. (See [[benefits of end-to-end encryption]] if it exists for more details)
        also I got to learn and grow as a developer by making this app :)

        That said if you really care about private messages above convenience and above all else, then signal is definitely more secure and you should use that or something else as good or better, though of course nothing is perfect (a powerful enough actor can always just zero-day your device for example)
        ')"> (see more details) </a>
        <br>
        BUT it is the most secure out of all messaging apps that are this convenient to use, as far as I know
    </p>
    <p style="margin-top:.3rem">
        2) There is a known vulnerability that exists by default in all e2ee apps running in websites, where the website code server could serve malicious code 
        (that doesn't match the verifiable open source version) 
        that steals your keys or messages.
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
        <a href="https://stosb.com/blog/signed-web-pages/" target="_blank">etesync</a>, also see <a href="https://wiki.mozilla.org/Security/Binary_Transparency" target="_blank">firefox's binary transparency wiki page</a>) 
        
        
        <br style="margin-bottom:.2rem">
        Even with this problem you are still protected against passive attacks / "accidental" snooping of your messages; an attacker (ie me or my server providers) would have to act intentionally to break your encryption and read your messages
    </p>
        <!-- Security Issues to write: code injection by me vulnerability, too easy to leak keys, no FS/PCS and other properties like signal, I do not check on packages frequently/thoroughly enough, I am a novice server admin so more vulnerable to hackers. Edit: wait stuilly the whole point is the server doesn't have to be secure, the frontend serving server is cloudflare pages and is pretty secure (though my admin account could be hacked or turned out to be misconfigured) -->
    <p></p>
</div>
<div style="margin-bottom:1rem"></div>
<hr>

<p style="margin-top: 1rem;"> See
    <a href="">about</a> 
    and 
    <a href="">FAQ</a>
    for more information about the app.
</p>
<div style="margin-top:10rem; margin-bottom:0rem">
    <p style="margin-bottom: .1rem;">
        
        <a href="http://ttools.io" target="_blank">
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