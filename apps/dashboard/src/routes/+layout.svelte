<script lang="ts">
	import 'bulma/css/bulma.min.css';
	import Navbar from '$lib/components/Navbar.svelte';

	export let data;
</script>

<Navbar user={data.twitchBroadcasterUser} />
<main class="section">
	<div class="container">
		<slot />
	</div>
</main>
