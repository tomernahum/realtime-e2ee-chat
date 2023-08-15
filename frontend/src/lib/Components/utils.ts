import { tick } from "svelte";


//TODO on/off switch maybe
export function scrollToBottomAction(node:HTMLElement, data:any) {

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

export async function scrollToBottom(node:HTMLElement) {
    await tick();
    node.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest"});
}

export function areScrolledToBottom(leeway:number) {
    //copied from stack overflow
    const scrollPos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max_bottom_scrollPos = document.documentElement.scrollHeight;
        
    return scrollPos >= (max_bottom_scrollPos - leeway)

}


