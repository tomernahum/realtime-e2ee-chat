// export const serverUrl = "http://localhost:3000/"

// export const urlBasePath = "localhost:5173"


export type Url = `${"https"|"http"|"ws"}://${string}.${string}` | `http://localhost${string}`


//todo: maybe implement env vars besides vite.isProd
const DEV_URL:Url = "http://localhost:3000/"
const RAILWAY_SOCKET_IO_SERVER_URL:Url = "https://realtime-test-socketio-ttools.up.railway.app/"

let socketIoServerUrl:Url;
if (import.meta.env.PROD)
    socketIoServerUrl = RAILWAY_SOCKET_IO_SERVER_URL 
else
    socketIoServerUrl = DEV_URL
export {socketIoServerUrl}

// export function setApiUrl (newUrl:Url) {
//     socketIoServerUrl = newUrl
// } 
// Not yet implemented