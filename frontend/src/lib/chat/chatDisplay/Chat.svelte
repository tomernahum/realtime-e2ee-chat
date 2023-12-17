

<script lang="ts">
	import SimpleForm from "$lib/Components/SimpleForm.svelte";
	import { areScrolledToBottom, scrollToBottom } from "$lib/Components/utils";
	import Messages from "$lib/chat/chatDisplay/Messages.svelte";
	import NewMessagesAlert from "$lib/chat/chatDisplay/NewMessagesAlert.svelte";
	import type { MessageData } from "$lib/chat/chat";
	import { onMount, tick } from "svelte";
	import SendMessageBox from "./SendMessageBox.svelte";
    
    let div:HTMLDivElement;

    const exampleMessageData:MessageData = {
        senderId: "dImX61BLaswpBoCsAADT",
        senderDisplayName: "ttools",
        messageText: "Welcome to Chat"
    }

    export let messagesData:MessageData[] = [exampleMessageData]
    export let onSendMessage:(message:string)=>void;


    // I would export them to be read only for binding, but not const within this component... not sure if theres a way to export read only and not be const   maybe could export a readable store   svelte seems to be doing this intentionally so source of truth is clearer, maybe I am supposed to use stores that are in ts files or something, maybe the socket code should be in a ts file too and update a messages store... yeah probably lol. If I feel like it I will rewrite everything this was just meant to be a draft originally
    let unreadMessagesBecauseYouAreScrolledUp = false;
    let unreadMessagesBecauseYouAreScrolledUpCount = 0;
    let unreadMessagesBecauseYouAreOutOfFocus = false;
    let unreadMessagesBecauseYouAreOutOfFocusCount = 0;

    function onMessagesDataChange(){

        //if not looking at tab
        if (document.hasFocus() === false) {
            unreadMessagesBecauseYouAreOutOfFocus = true
            unreadMessagesBecauseYouAreOutOfFocusCount++;
        }
        
        //if already on bottom of the page, scroll to new bottom  (whether or not you are on the tab but it still does work though)
        const lookingAtNewMessages = areScrolledToBottom(80) /*&& document.hasFocus()*/
        if (lookingAtNewMessages) {
            tick().then(()=>{
                scrollToBottom(div)
            })
        }
        else {
            unreadMessagesBecauseYouAreScrolledUp = true
            unreadMessagesBecauseYouAreScrolledUpCount++
        }

        // console.log(unreadMessagesBecauseYouAreOutOfFocus, unreadMessagesBecauseYouAreOutOfFocusCount)

    }

    $: {
        messagesData
        onMessagesDataChange()
    }


    function onScroll(){
        if (areScrolledToBottom(80)){
            unreadMessagesBecauseYouAreScrolledUp = false;
            unreadMessagesBecauseYouAreScrolledUpCount = 0;
        }
    }

    function onFocus(){
        unreadMessagesBecauseYouAreOutOfFocus = false;
        unreadMessagesBecauseYouAreOutOfFocusCount = 0;
    }

    //This is only working when its down here for some reason
    export let tabTitlePrefixRecommendation:string = ""
    $: {
        unreadMessagesBecauseYouAreOutOfFocus
        unreadMessagesBecauseYouAreOutOfFocusCount

        tabTitlePrefixRecommendation = unreadMessagesBecauseYouAreOutOfFocus 
            ? unreadMessagesBecauseYouAreOutOfFocusCount > 9 
                ? "(9+)" 
                :`(${unreadMessagesBecauseYouAreOutOfFocusCount})` 
            : ""
        // console.log("qoihroqiwehrjoiqwjehroiqwhero")
    }


    function onNewMessagesAlertClick(){
        scrollToBottom(div)
        unreadMessagesBecauseYouAreScrolledUp = false;
    }
    
</script>





<svelte:window on:focus={onFocus} on:scroll={onScroll}/>

<div bind:this={div} style="padding-bottom:20px"> 
    <Messages data={messagesData}/>
    <SendMessageBox {onSendMessage}/>
</div>

{#if unreadMessagesBecauseYouAreScrolledUp}
    <NewMessagesAlert parentDiv={div} numberOfUnreadMessages={unreadMessagesBecauseYouAreScrolledUpCount} onClick={onNewMessagesAlertClick}/>
{/if}