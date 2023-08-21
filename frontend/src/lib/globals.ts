import { PUBLIC_SOCKET_SERVER_URL } from '$env/static/public';

export type Url = `${"https"|"http"|"ws"}://${string}.${string}` | `http://localhost${string}`

//Todo: may implement a way to change the backend url while the app is running

export const socketIoServerUrl = getServerUrl()

function getServerUrl(){
    const isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1
    const isLocalHost = PUBLIC_SOCKET_SERVER_URL === "http://localhost:3000/" ||  "http://localhost:3000"
    
    if (isAndroid && isLocalHost) {
        // return "http://10.0.2.2:3000" as Url
        //doesn't frikin work
        return "https://realtime-test-socketio-ttools.up.railway.app/" // Prod url. at least i can test frontend
    }
    else {
        return PUBLIC_SOCKET_SERVER_URL as Url
    }
}





