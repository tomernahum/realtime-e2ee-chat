// export const serverUrl = "http://localhost:3000/"

// export const urlBasePath = "localhost:5173"


export type Url = `${"https"|"http"|"ws"}://${string}.${string}` | `http://localhost${string}`


const DEV_URL:Url = "http://localhost:3000/"
const RAILWAY_SOCKET_IO_SERVER_URL:Url = "https://realtime-test-socketio-ttools.up.railway.app/"

export const socketIoServerUrl:Url = RAILWAY_SOCKET_IO_SERVER_URL //TODO env vars or something

// export function setApiUrl (newUrl:Url) {
//     socketIoServerUrl = newUrl
// } 
// Not yet implemented