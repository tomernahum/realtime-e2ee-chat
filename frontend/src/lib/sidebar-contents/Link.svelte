<script lang="ts">
    import { page } from '$app/stores';
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();


    export let href:`/${string}`;
    export let classString = "";


    $: currentPage = $page.url.pathname;
    $: isCurrentPage = href==="/" 
		? currentPage===href 
		: currentPage.startsWith("/room") //make /room highlight chat link
			? href==="/chat"
			: currentPage.startsWith(href)
	
	
	function handleClick() {
		dispatch('linkClicked');
	}
    
</script>

<a href={href} class:current-page={isCurrentPage} class={classString} on:click={handleClick}>
    <slot/>
</a>


<style>
    a {
		color: var(--side-bar-text-color);
		font-weight: normal;
        text-decoration: none;

		padding: .25rem;
		width: 95%;
		border-radius: var(--sidebar-nav-border-radius);

        margin: .05rem 0;
	}

	a:hover {
		background-color: var(--sidebar-hover-background);
	}

	a.current-page {
		background-color: var(--sidebar-selected-background);
	}
</style>