
<p>FAQ Coming Soon</p>

<p style="margin-top:.5rem">What I plan to write:</p>
<pre>
FAQs:
- why would you store the key in the url? If the key is in the URL then does that mean the server sees it?
    : no, because parts after the # in a url are not sent to the server
    : also how sites like meganz, cryptpad, excalidraw, work, and signal.me contact discovery
- what exactly can you see about user data?
    : I can see which chatroom IDs have messages in them, the number of messages, the date sent of each message. I can not decrypt the content of the messages. 
    I can see whether the length of each message is over/under X bytes, and over/under X bytes but not the exact length of your messages (todo, find these numbers)
    : I have not set up any analytics on this site since it is made for especially privacy conscious users. I can get a sense of how much it's being used by seeing how many messages are being sent through how many rooms.

Reliability:
- will my data get deleted after some amount of time?
    : currently there is no mechanism for deleting old messages, but also currently you can only see the last 500 messages in a chatroom. 
    If the data gets to be too much I might wipe some data, starting with messages least likely to be needed  (messages older than 500 or from rooms that have not been active in a long time)
    : no guarantees that I will not accidentally lose your data, but I have set up a backup of the database (by the time you're reading this). I did lose all data once [explain reason]

Ask questions in this chatroom, I will check it every once in a while: https://chat.ttools.io/room/d2a0e438#M2SXzAT6n6PzYEe3L37evQ


Other pages explain:
- security promises / downsides / differences from other apps
- technologies used
- cryptographic primitives/protocols used, more technical 
</pre>


<style>
    pre {
        font-size: 0.65rem;
        color: #ffffffaa;
        background: rgb(17, 17, 17);
        padding: 0 5px;
        border-radius: 5px;

        white-space: pre-wrap; 
        word-wrap: break-word; 
        overflow-wrap: break-word;
    }
</style>