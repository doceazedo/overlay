<script lang="ts">
	import 'bulma/css/bulma.min.css';
	import '$lib/scss/global.scss';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data;
</script>

<Navbar user={data.twitchBroadcasterUser} />
<main class="section">
	<div class="container">
		<slot />
	</div>
</main>
<Footer />
