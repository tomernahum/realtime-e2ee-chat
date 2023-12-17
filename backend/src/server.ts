
import { Server } from "socket.io"
import type { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "../../shared-types"
import { EmptyPersister, Persister, PlanetScalePersister } from "./persistance/persister"
import { time } from "console"

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
> (3000, {
    cors: {
        origin: "*"
    }
})



// const persister:Persister = new PlanetScalePersister() //experimenting with dependency injection / OOP
let persister:Persister
try {
    persister = new PlanetScalePersister();
    await persister.ping();
}
catch (exception) {
    // If database connection fails keep functioning without it
    console.warn(exception)
    console.warn("Could not connect to database! any read or write attempts will fail")

    persister = new EmptyPersister()
    // TODO attempt to reconect periodically
}



// const test = Math.random() > .5  
// const persister = test ? new SupabasePersister() : new PlanetScalePersister()
// const {saveMessage, getMessages} = persister




io.on("connection", (socket)=>{

    console.log("Connected !", socket.id)


    socket.on("test_event_c2s", (myMessage)=>{
        console.log("test-event:", myMessage)
        
        //emit to all sockets
        io.emit("test_event_s2c", "Hello from server!", myMessage)
    });
    
    //deprecated
    socket.on("send_message", (roomId, messageData) => {
        console.log("received send_message event. room:", roomId, "message: ", messageData.messageText,)
        
        if (roomId == ""){
            //TODO: maybe replace by an error
            socket.broadcast.emit("receive_message", messageData)
        }

        socket.join(roomId)
        socket.to(roomId).emit("receive_message", messageData)

    })

    socket.on("join_room_exclusively", (roomId, callback)=>{
        console.log("Joining room", roomId, "!", socket.id);
        
        //leave all rooms besides the default one
        socket.rooms.forEach(room => {
            if (room != socket.id){
                socket.leave(room)
            }
        })

        socket.join(roomId)

        if (callback){
            callback()
        }
    })

    socket.on("send_encrypted_message", async (roomId, encryptedMessage, callback)=>{
        const MAX_MESSAGE_LENGTH = 11_000 //max length of cipher not plaintext, cipher text seems about 1.4 times bigger than plain text
        if (encryptedMessage.cipher.length > MAX_MESSAGE_LENGTH) {
            console.log("someone tried to send a long message")
            //return error
            if (callback) {
                callback({
                    errorMessage: "That message is too long, max message length is approximately 5000 characters"
                })
            }
            return
        }


        if (roomId == ""){
            //TODO: maybe replace by an error
            socket.broadcast.emit("receive_encrypted_message", encryptedMessage, roomId)
        }

        socket.to(roomId).emit("receive_encrypted_message", encryptedMessage, roomId)

        if (callback)
            callback({}) //mark as sent. Do this before saving to db to reduce latency / not rely on db

        //Save message to database
        await persister.saveMessage(roomId, encryptedMessage) //todo will crash if database is down i think
    })

    //This could also just be a REST type call. The cool thing about not doing that is that you can return and then keep running code in the function after. Although i guess you could do something like that by not awaiting async functions
    socket.on("get_message_history", async (roomId, callback)=>{
        const x = await persister.getMessages(roomId)
        //TODO: pagination
        
        if (!(persister instanceof EmptyPersister)) {
            callback(x)
        }
        else {
            callback("failed")
        }
            
    })
})

