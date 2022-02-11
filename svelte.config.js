/** @type {import('@sveltejs/kit').Config} */
import sveltePreprocess from 'svelte-preprocess';

const config = {
  preprocess: sveltePreprocess(),
};

export default config;
