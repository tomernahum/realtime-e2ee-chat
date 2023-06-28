// export const serverUrl = "http://localhost:3000/"

import { restartSocket } from "./realtime"

// export const urlBasePath = "localhost:5173"


export type Url = `${"https"|"http"|"ws"}://${string}.${string}` | `http://localhost${string}`


const DEV_URL:Url = "http://localhost:3000/"
const RAILWAY_SOCKET_IO_SERVER_URL:Url = "http://localhost:3000/"

export let socketIoServerUrl:Url = "http://localhost:3000/"

export function setApiUrl (newUrl:Url) {
    socketIoServerUrl = newUrl
    restartSocket()
}