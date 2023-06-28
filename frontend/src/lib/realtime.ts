import { Socket, io } from "socket.io-client";
import type { ClientToServerEvents, MessageArgs, ServerToClientEvents } from "../../../shared-types";
import { socketIoServerUrl } from "./globals";

// console.log("Pretty sure this file will run once??")


export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(socketIoServerUrl)

// export function restartSocket(){
//     socket.disconnect()
//     socket = io(socketIoServerUrl)
//     console.log("ay")
// }


export const socketId = new Promise((resolve, reject)=>{
    socket.on("connect", ()=> {
        resolve(socket.id)
    })
    setTimeout(()=>{
        if (socket.id === undefined) {
            reject("Couldn't connect to server probably")
        }
    }, 10_000)
})

socket.on("connect_error", (e) => {
    console.log("Connect error", e)
    // will automatically try to reconnect unless denied by the server
});



  
type x = Parameters<typeof socket.on>
type socket_on_event_name = x[0]
type socket_on_callback = x[1]
/**
    Creates a function for svelte's onMount() that will subscribe and unsubscribe to socket.on events when the component mounts and dismounts
*/
export class SocketOnBuilder {
    
    
    events:[socket_on_event_name, socket_on_callback][] = []

    //TODO Could maybe move onMount() to inside constructor? I think that would work
    

    // socketOn1 = (eventName:socket_on_event_name, callback:socket_on_callback) => {
    //     //could check if it exists and if so not do it
    //     this.events.push([eventName, callback])
    // }

    socketOn:typeof socket.on = (eventName, callback) =>{
        this.events.push([eventName, callback])

        //need to do this so typeof type checks out. 
        //Need type to check out so this can get the same autocomplete as socket.on including callback function typing
        return socket.on("connect", ()=>{return}) 
    }

    getMountFunction = ()=> {
        return () => {
            for (const event of this.events) {
                socket.on(event[0],event[1])
            }
            return ()=> {
                for (const event of this.events) {
                    socket.off(event[0],event[1])
                }
            }
        }
    }
}



//------

async function generateKey(){
    const key = await window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 128 },
        true, // extractable
        ["encrypt", "decrypt"],
    );
}

async function sendMessage(roomId:string, messageData:MessageArgs){

    //encrypt messageData
    const key = await window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 128 },
        true, // extractable
        ["encrypt", "decrypt"],
    );



    //socket.emit("send_encrypted_message", roomId, encryptedMessageData)


}