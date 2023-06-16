<script lang="ts">
	import '@tabler/core/dist/css/tabler.min.css';
	import '$lib/scss/global.scss';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="page">
	<Navbar />
	<div class="page-wrapper">
		<slot />
		<Footer />
	</div>
</div>
