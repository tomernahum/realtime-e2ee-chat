<h2>Security</h2>

<p>
    Out of all apps I know about that let you create chatrooms and share them via web link without anyone logging in or installing anything, this app is the most secure and private. (as far as I can tell).
</p>
<p style="margin-top:.5rem">  
    Most other apps do not use end to end encryption, which means the server administrators (ie me) 
    <!-- (and anyone who gets access to the server ) -->
    are easily able to read all data going through the app, and don't make any promises not to. 
    <!-- <br> -->
    This also means that anyone who gets access to the server (for example hackers), or who manages to breach the encryption/security protocols in between the client and server can read sensitive data too.
    <br>
    Most other apps also include potentially identifying user analytics, which this app does not. (my other apps may include analytics though I try to keep it privacy respecting. If you use any website chances are it has an analytics tracking tool, getting ublock origin, or using tor may help a little.)
</p>
<p style="margin-top:.5rem">
    However, there is still a lot of room for improvement, and out of all apps that let you message in groups generally, this app <strong style="text-decoration: underline;">is not</strong> the most secure choice.
    <!-- <br> -->
    If you want a better choice, Signal seems to be generally well regarded, and has a number of properties that make it more secure than this app.
</p>
<br>

<h3>Security drawbacks of this app:</h3>
<ol>
    <li>
        it's too easy for users to accidentally leak keys, since they are stored in the url and visible at all times. User could accidentally share it with a snooping provider or livestream, and a malicious browser extension could steal it too easily (that part is hard to mitigate in general afaik, I know cryptpad adds an iframe sandbox to help with this)
    </li>
    <li>
        if keys do get leaked, there is no damage mitigation or recovery mechanism, unlike things like signal which have FS and PCS encryption properties. That means if a key is leaked the unauthorized party who gets it will have access to all history of that room, and be able to see all future messages sent to that room, even if he can't get any more novel leaks
    </li>
    <li>
        also missing some other properties compared to signal, such as deniability (I might have it by accident though), deleting old encrypted messages from server.
    </li>
    <li>
        I am a hobbyist dev currently, not a security expert. it is very possible I messed something up in the design of the app. security around cryptography especially is notoriously easy to mess up.
    </li>
    <li>
        since this app is a side project for me, I might be slower than average to maintain the app, including updating library dependencies, which could occasionally have vulnerabilities discovered in them requiring them to be updated
    </li>
    <li> 
        I also do not have extensive resources to do things like hire lawyers, hire security firms to do an audit, provide bug bounty, etc. This project is also too small to get very many eyes on it's security for free
    </li>
    <li>
        see main page, but no binary transparency + web = easy attack vector for server to circumvent encryption, defeating most of the point of e2ee, but keeping secure against passive attackers or ones who haven't thought of this, and also being the case of most encrypted web apps, eg proton app suite, excalidraw. and I honestly don't see how signal desktop app auto-updating itself isn't vulnerable to this (but I'm not an expert)
    </li>
    <li>
        I could lose your data, or app could go down. unlikely to go down on it's own for long, but it could go down from a huge spike in traffic or ddos, and something unexpected could always happen
    </li>
</ol>
<br>
<h3>on the plus side:</h3>
<ol>
    <li>
        The security model is easy for users to understand. Anyone who has the secret url can access the chatroom, anyone who doesn't, can't (even if it's me the admin or my server providers).
    </li>
    <li>
        app is so simple that theres less to compromise (eg an attacker can't pretend to be someone they're not to gain access to a room, that is handled out of band)
    </li>
    <li>
        app is too small to be likely to be targeted by government subpoenas, or even by hackers
    </li>
    <li>
        still much better privacy than anything you will find on google for "create online chatroom no signups" due to the e2ee, and better convenience than all chatroom apps with e2ee that I could find.  This is about as secure as most other apps (at least for confidentiality and for an app made by someone of my experience level), plus the added encryption which (almost) proves I the admin am not reading your messages, something I doubt for non e2e encrypted sites.
    </li>
    
    <li>
        also I got to learn and grow as a developer by making this app :)
    </li>
</ol>
<p>
    That said if you really care about private messages above convenience and above all else, then signal is definitely more secure and you should use that or something else as good or better, though of course nothing is perfect (a powerful enough actor can always just zero-day your device for example)
</p>

<br>
<br>

<h2>Encryption Libraries & Algorithms</h2>
<p style="margin-top:.3rem">
    The <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto">
        Web Crypto Api
    </a>, which is provided by the browser, is used for encryption, decryption, and key generation. The algorithm used is AES-GCM with a 128-bit key. the IV is generated randomly via the crypto api.
</p>
<p style="margin-top:.5rem">
    Message plaintexts are also padded to increments of [TO BE COMPLETED] using [TO BE COMPLETED]
</p>
<p style="margin-top:.5rem">
    The key is exported from the web crypto api, encoded with base64 and stored in the url, after a # symbol so that the server doesn't see it. chats in a room are encrypted and decrypted with the key found in the url. This makes the security model simple: anyone who has/sees the url can access the chatroom, anyone who can't, can't.
</p>
<p style="margin-top:.5rem">
    When a new message is sent, it is first encrypted and then sent in base64 to the server, which then sends it back to all other active clients on that room via a websocket connection, and also writes it to a db for persistence. when a client loads a new room, the most recent messages are loaded from the db and sent down to it. The client decrypts messages after getting them. You can inspect the source code for more detail.
</p>

<br>
<br>

<!-- Need to put this in a seperate page:
        1) it's too easy for users to accidentally leak keys, since they are stored in the url and visible at all times. User could accidentally share it with snooping provider or stream, and a malicious browser extension could too easily steal it (that part is hard to mitigate on the web afaik, i know cryptpad adds an iframe sandbox to help with this)
        2) if keys do get leaked, there is no damage mitigation or recovery mechanism, unlike things like signal which have FS and PCS encryption properties
        3) also missing some other properties compared to signal such as deniability, presumably deleting old encrypted messages from server,
        4) I am a hobbyist dev currently, not a security expert. it is very possible I messed something up in the design of the app. security around cryptography especially is notoriously easy to mess up.
        5) since this app is a side project for me, I might be slower than average to maintain the app, including updating library dependencies, which could occasionally have vulnerabilities discovered in them requiring them to be updated
        6), see main page, but no binary transparency + web = easy attack vector for server to circumvent encryption, defeating most of the point of e2ee, but keeping secure against passive attackers or ones who haven't thought of this, and also being the case of most encrypted web apps, eg proton app suite, excalidraw. and I honestly don't see how signal desktop app auto-updating itself isn't vulnerable to this (but I'm not an expert)
        7) I could lose your data, or app could go down. unlikely to go down on it's own for long, but it could go down from a huge spike in traffic or ddos, and something unexpected could always happen
        8) there are no moderation mechanics (see: message franking)
        
        On the plus side:
        1) app is so simple that theres less to compromise (eg an attacker can't pretend to be someone there not to gain participation, that is handled out of band)
        2) app is too small to be likely to be targeted by government subpoenas, or even by hackers
        3) still much better privacy than anything you will find on google for `create online chatroom no signups` due to the e2ee, and better convenience than all chatroom apps with e2ee that I could find.  This is about as secure as most other apps (at least for confidentiality and for app made by someone of my experience level), plus the added encryption which (almost) proves I the admin am not reading your messages, something I doubt for non e2e encrypted sites. (See [[benefits of end-to-end encryption]] if it exists for more details)
        also I got to learn and grow as a developer by making this app :)

        That said if you really care about private messages above convenience and above all else, then signal is definitely more secure and you should use that or something else as good or better, though of course nothing is perfect (a powerful enough actor can always just zero-day your device for example)
        ') -->


<style>
    p, li {
        font-size: 0.9rem;
    }
    h3 {
        font-size: 1.1rem
    }
</style>
