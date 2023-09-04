
// type RoomId = string;

export type MessageArgs = {
    senderId:string,
    senderDisplayName:string,
    
    messageText?:string
}

export type EncryptedTextObj = {
    cipher: string; //base64 encoded
    iv: string; //base64 encoded
}

//---


export interface ServerToClientEvents {
    // noArg: () => void;
    // basicEmit: (a: number, b: string, c: Buffer) => void;
    // withAck: (d: string, callback: (e: number) => void) => void;
    
    test_event_s2c: (...args:string[]) => void;

    receive_message: (
        {messageText, senderDisplayName, senderId}:MessageArgs
    ) => void;

    //does it need roomId?
    receive_encrypted_message: (encryptedMessage:EncryptedTextObj, roomId:string) => void;
}

export interface ClientToServerEvents {
    // hello: () => void;
    test_event_c2s: (message:string) => void;

    join_room_exclusively:(roomId:string, callback?:()=>void) => void;

    send_message: (
        roomId:string, 
        {messageText, senderDisplayName, senderId}:MessageArgs
    ) => void;

    send_encrypted_message: (
        roomId:string, 
        encryptedMessage:EncryptedTextObj, 
        sentOrError?:(obj:{errorMessage?:string})=>void //Can add to params whether it successfully sent and whether successfully saved to db if necessary
    ) => void;
    
    get_message_history: (roomId:string, callback:(messageHistory:EncryptedTextObj[]|"failed")=>void)  =>void;

    // Could combine join_room and get_message_history into 1 request
}
        
export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {  
    // haven't yet learned the feature of socket.io this is used for
    // name: string;
    // age: number;
}
