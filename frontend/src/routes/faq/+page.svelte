
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

More
- Why did you make this?
Mostly to learn and practice making an apps. specifically this started as a test of learning websockets / realtime, then I added end to end encryption too. I want to eventually make an end to end encrypted productivity app, so this app was a good first step to learn some of the technologies. I also practiced frontend html and css (with svelte framework) there are no ui libraries here or anything. I know there is room for improvement though, especially with the sidebar closing, need to work on that. also need some ux improvements maybe, but anyway. I figured if I was already making a app for testing, I might as well polish it a tiny bit and deploy it in case it was useful for someone, or in case it looked good on my resume. 

Ask questions in this chatroom, I will check it every once in a while: https://chat.ttools.io/room/8b79d6a9#u_I04ZZ_6GJmwFQ4wECqaQ


Other pages explain:
- security promises / downsides / differences from other apps
- technologies used
    - sveltekit for frontend, typescript on frontend&backend, socketio with shared types for websocket communication, drizzleORM + sqlite for backend persistance (formerly was using planetscale, which was a dumb mistake as it increased latency, + they killed their free tier on me, decided sqlite scales fine for the small number of users that I have)
    - frontend hosted on cloudflare pages (static), backend was on railway, might move it over to hetzner vps for freeer db persistence, still looking into it
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