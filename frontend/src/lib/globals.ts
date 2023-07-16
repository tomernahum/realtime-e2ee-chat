import { PUBLIC_SOCKET_SERVER_URL } from '$env/static/public';

export type Url = `${"https"|"http"|"ws"}://${string}.${string}` | `http://localhost${string}`


export const socketIoServerUrl =  PUBLIC_SOCKET_SERVER_URL as Url
//Todo: may implement a way to change the backend url while the app is running


/*
//todo: maybe implement env vars besides vite.isProd
const DEV_URL:Url = "http://localhost:3000/"
const RAILWAY_SOCKET_IO_SERVER_URL:Url = "https://realtime-test-socketio-ttools.up.railway.app/"

let socketIoServerUrl:Url;
if (import.meta.env.PROD)
    socketIoServerUrl = RAILWAY_SOCKET_IO_SERVER_URL 
else
    socketIoServerUrl = DEV_URL
export {socketIoServerUrl}
*/

