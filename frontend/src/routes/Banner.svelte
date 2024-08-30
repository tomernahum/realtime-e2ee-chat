<script>
    
    
    let show = true;
</script>

{#if show}
<div class="banner">
    <h3 class="message"><b>Notice</b>: message history is currently down due to planetscale db removing their free tier, message delivery should still work</h3>
    <button on:click={() => show = false}>
        X
    </button>
</div>
{/if}   

<style>
    .banner {
        text-align: center;
        background-color: hsl(46, 94%, 38%);
        min-height: 3rem;

        padding: 0.5rem;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
</style>