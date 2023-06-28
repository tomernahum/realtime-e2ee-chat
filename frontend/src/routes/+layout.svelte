<script lang="ts">
    import { page } from '$app/stores';
    import "./layout.css"
    
	import SidebarContents from '$lib/sidebar-contents/SidebarContents.svelte';
    
    import { onMount } from 'svelte';
	import { crossfade, fade, fly } from 'svelte/transition';

    $: currentPage = $page.url.pathname;


    export let data;


    //
    let mainDiv:HTMLDivElement;
    function toggleSideBarCollapse() {
        // mainDiv.toggleAttribute("data-show-sidebar")
        showSidebar = !showSidebar;
    }

    // let showSidebar:boolean = JSON.parse(localStorage.getItem("show-sidebar") || "true");
    // $: localStorage.setItem("showSidebar", JSON.stringify(showSidebar))
    //doesn't work probably because of prerendering

    let screenWidth:number;
    $: smallScreen = screenWidth < 700;

    let showSidebar = true;

    export const snapshot = {
        capture: () => showSidebar,
        restore: (value) => showSidebar = value
    }
    // TODO: BUG: this animates the hiding in chrome (not in firefox though), maybe just swap out with another method in +layout.ts load so it runs before loading

    function handleLinkClicked(){
        // const smallScreen = window.matchMedia("(max-width: 700px)").matches
        if (smallScreen) {
            setTimeout(()=>{showSidebar = false}, 200);
        }
        // TODO BUG Doesn't always work
    }

</script>

<svelte:window bind:innerWidth={screenWidth}/>
<div class="main-div" data-show-sidebar={showSidebar} bind:this={mainDiv}>
    

    <input type="checkbox" id="sidebar-toggler" name="sidebar-toggler" bind:checked={showSidebar} style="opacity:0; position:fixed; top:0;left:0;"/>
    <label for="sidebar-toggler" class="toggle-sidebar-button" style="z-index:1001">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 6l16 0"></path>
            <path d="M4 12l16 0"></path>
            <path d="M4 18l16 0"></path>
        </svg>
    </label>
    
    <!-- <button class="toggle-sidebar-button" on:click={toggleSideBarCollapse}>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 6l16 0"></path>
            <path d="M4 12l16 0"></path>
            <path d="M4 18l16 0"></path>
        </svg>
    </button> -->
    
    <header class="top-bar">
        <h1>Realtime Test App!</h1>
        <!-- TODO: h1 may not be semantically appropriate I'm not sure maybe that should be for pages? -->
    </header>

    <aside class="side-bar">
        <div class="empty-space">
        </div>
        <SidebarContents on:linkClicked={handleLinkClicked}/>
    </aside>  

    

    {#key data.pathname}
        <div 
            class="page-container"
            in:fade={{ duration: 100, delay: 150 }}
            out:fade={{ duration: 100}}
        >
            <!-- in:fade={!smallScreen ? { duration: 100, delay: 150 } : {duration: 0, delay: 0}}
            out:fade={!smallScreen ? { duration: 100} : {duration:0, delay: 0}} -->
            <main>
                <slot/>
            </main>
        </div>
    {/key}
    <!-- For Tricking Svelte since it can't see this through the key apperently and keeps deleting my css selectors-->
    <div class="page-container" style="display:none"></div>
    
</div>

<style>
    .toggle-sidebar-button {
        /* position:absolute; */
        position: fixed;
        top: calc((var(--header-height) - (24px + 4px)) / 2);  
        left:.5rem;

        padding:2px;
        margin:0;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: transparent;
        border-color: transparent;
        

        border-radius: .3rem;
    }
    .toggle-sidebar-button:hover {
        border-color: transparent;
        background-color: var(--main-background);
    }
    input:checked ~ .toggle-sidebar-button {
        position:fixed;
    }
    
    input:focus-visible ~ .toggle-sidebar-button {
        outline: 1px solid white;
        /* border: 1px solid blue; */
        /* outline: 3px auto -webkit-focus-ring-color; */
    }
    
    .main-div {
        background: var(--main-background);
        
        
        min-height: 100%;
        width: 100%;

        position:absolute;
        top:0;
    }

    
    .page-container, .top-bar {
        margin-left: var(--sidebar-width);
        transition: margin-left var(--sidebar-transition-time);
    }

    input:not(:checked) ~ .page-container,
    input:not(:checked) ~ .top-bar {
        margin-left: 0;
    }
    
    input:not(:checked) ~ .top-bar > h1 {
        margin-left: calc(24px + 4px);
    }
    .top-bar > h1 {
        transition: margin-left var(--sidebar-transition-time);
    }
    


    


    .page-container {
        margin-top: var(--header-height);
        /* margin-top: 1rem; */
        /* TODO: I dont understand where its initial positioning is coming from anymore but this works for now... */
    }


    .side-bar {
        position: fixed;
        top:0;
        height: 100%; /*TODO check this doesnt screw up on any devices such as mobile */
        
        width: var(--sidebar-width);
        transition: margin-left var(--sidebar-transition-time);

        z-index: 1000;

    }

    input:not(:checked) ~ .side-bar {
        margin-left: calc(0px - calc(var(--sidebar-width) + var(--sidebar-border-width)));
    }

    .side-bar {
        border-right-width: var(--sidebar-border-width);
        border-right-style: solid;
        border-right-color: var(--sidebar-subtle-border);

        /* padding-top: var(--header-height); */

        background: var(--sidebar-main-background);
    }

    .side-bar > .empty-space {
        height: var(--header-height);
        background-color: var(--header-color);
    }


    input:not(:checked) ~ .top-bar {
        width: 100%;
    }

    .top-bar {
        width: calc(100% - var(--sidebar-width));
        transition: margin-left var(--sidebar-transition-time), width var(--sidebar-transition-time);

        
        background-color: var(--header-color);
        
        border-bottom-width: var(--sidebar-border-width);
        border-bottom-style: solid;
        border-bottom-color: var(--sidebar-subtle-border);

        height: var(--header-height);
        position:fixed;
        top:0;

        text-align: center;
        vertical-align: middle;
        display: flex;
        justify-content: center;
        align-items: center;

        z-index: 999;
    }

    .top-bar h1 {
        font-weight: 600;
        font-size: 1.3rem;
        font-size: min(6vw, 1.3rem);
        font-size: min(6vw, 1rem);
        /* line-height: var(--header-height); */

        text-align: center;
        vertical-align: middle;

        display: flex;
        justify-content: center;
        align-items: center;

        
        /* margin-left: calc(24px + 8px); */
    }


    .page-container {
        min-height: 100%;

        padding: .3rem .6rem;
        padding-bottom: 1rem;

        /* height: 100%;
        overflow-y: scroll; */

    }


    @media screen and (max-width: 700px) {
        /* Sidebar should overlay instead of pushing */
        .page-container, .top-bar {
            margin-left: 0;
        }
        
        .top-bar {
            width: 100%;
        }

        .top-bar > h1 {
            margin-left: calc(24px + 4px);
        }


    }

    main {
        max-width: 30rem;
        max-width: 28rem;

        margin: 0 auto;
        padding: 0 .5rem;
    }


</style>
<!-- TODO: align the page centering with the header (header is centered right). either center the header or off center the page -->

<!-- TODO: make padding and stuff uniform across all pages. IE just put it in the layout -->

<!-- /* TODO (maybe): make the scroll go under the header (make everything fixed and page-container scroll maybe)  (actually looking at other websites none of the do this so i guess its not that important)*/ -->

<!-- /* TODO (maybe) make bottom nav for mobile (wasted a lot of effort on the sidebar being collapsable tbh)*/ -->

<!-- TODO: BUG: on chrome if the sidebar is set to hide it animates it hiding but it should start hidden -->



<!-- TODO: add some kind of loading indicator, for example the fake top loading bar on realworld.svelte.dev -->