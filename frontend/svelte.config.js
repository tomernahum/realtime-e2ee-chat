// import { vitePreprocess } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-auto';
// TODO: consider changing to adapter cloudflare (remember to update readme at root)

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
            // fallback: "404.html", //cloudflare... this works but it puts a 404 error in the console on every page
            fallback: "index.html", //seems to be correct
			strict: true
		})
	}
};

export default config;
