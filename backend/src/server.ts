
import { Server } from "socket.io"
import type { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "../../shared-types"
import { Persister, PlanetScalePersister } from "./persistance/persister"

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

const persister:Persister = new PlanetScalePersister() //experimenting with dependency injection / OOP

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

    socket.on("send_encrypted_message", (roomId, encryptedMessage)=>{
        if (roomId == ""){
            //TODO: maybe replace by an error
            socket.broadcast.emit("receive_encrypted_message", encryptedMessage, roomId)
        }

        socket.to(roomId).emit("receive_encrypted_message", encryptedMessage, roomId)

        //Save message to database
        // saveMessage(roomId, encryptedMessage)
        persister.saveMessage(roomId, encryptedMessage)
        
    })

    socket.on("get_message_history", (roomId, callback)=>{
        //Find the room history

        //if its too big remove the oldest few...
    })
})
