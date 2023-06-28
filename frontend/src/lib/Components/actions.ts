import { tick } from "svelte";


//TODO on/off switch maybe
export function scrollToBottom(node:HTMLElement, data:any) {

    async function _scrollToBottom(){
        await tick();
        node.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest"});
    }
    
    return { 
        update(data:any){
            _scrollToBottom()
        }
    }
}