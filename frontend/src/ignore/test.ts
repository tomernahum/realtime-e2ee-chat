import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const x = defineConfig({
	plugins: [sveltekit()]
});

async function main() {
    const y = await x
    console.log(y)
    console.log(JSON.stringify(y))
}
main()