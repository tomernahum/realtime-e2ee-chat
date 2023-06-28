
import { Server } from "socket.io"
import type { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "../../shared-types"

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



io.on("connection", (socket)=>{
    console.log("Connected !", socket.id)


    socket.on("test_event_c2s", (myMessage)=>{
        console.log("test-event:", myMessage)
        
        //emit to all sockets
        io.emit("test_event_s2c", "Hello from server!", myMessage)
    });
    
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
            socket.broadcast.emit("receive_encrypted_message", encryptedMessage)
        }

        socket.to(roomId).emit("receive_encrypted_message", encryptedMessage)
    })
})
