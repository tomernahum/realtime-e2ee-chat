<script lang="ts">
	import { page } from '$app/stores';
	import Link from './Link.svelte';

    // import { crossfade, fade, scale } from 'svelte/transition';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();


	$: currentPage = $page.url.pathname;

	function handleClick() {
		dispatch('linkClicked');
	}
</script>

<!-- TODO: could make the highlight of the selected page glide in place accross the tags. Not sure how but could -->

<nav>
	
	<Link href="/" on:linkClicked> Home </Link>
	<Link href="/chat" on:linkClicked> Chat </Link>
	<!-- <Link href="/test" on:linkClicked> Test </Link> -->



	<Link href="/about" on:linkClicked classString="bottom-link"> About </Link>
    
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		align-items: center;
        justify-content: flex-start;

		text-align: center;

		margin-top: 10px;

        height: calc(100% - var(--header-height) - 10px);


		
        overflow: auto;
	}

	

    hr {
        width: 93%;


        margin-top: 1rem;
        margin-bottom: 2px;
    }

    nav :global(.bottom-link) {
        margin-top: auto;
        margin-bottom: .6rem;

        /* background-color: var(--secondary-background); */
    }

    

    noscript {
		margin-top: 3rem;
        margin-bottom: .5rem;


        margin-top: auto;
        margin-bottom: auto;
    }
	noscript > p {
		line-height: 100%;
		font-size: 0.7rem;
	}

    
    
</style>
