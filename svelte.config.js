/** @type {import('@sveltejs/kit').Config} */
import sveltePreprocess from 'svelte-preprocess';

const config = {
	preprocess: sveltePreprocess(),
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
