<script lang="ts">
	import 'bulma/css/bulma.min.css';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />
<main class="section">
	<div class="container">
		<slot />
	</div>
</main>
