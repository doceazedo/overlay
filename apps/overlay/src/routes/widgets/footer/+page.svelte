<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { flyIn, flyOut } from '$lib/utils/transitions';
	import Music from '$lib/components/icons/Music.svelte';
	import Follow from '$lib/components/icons/Follow.svelte';
	import FooterItem from './FooterItem.svelte';
	import FooterSocials from './FooterSocials.svelte';
	import FooterStats from './FooterStats.svelte';

	let showAnnouncement = false;
	let song = 'Kim Petras - Claws';

	onMount(async () => {
		// TODO: remove debug methods
		window.toggleAnnouncement = () => (showAnnouncement = !showAnnouncement);
		window.setSong = (str: string) => (song = str);
	});
</script>

{#key showAnnouncement}
	<footer class="footer" in:fly={flyIn} out:fly={flyOut}>
		{#if !showAnnouncement}
			<FooterItem icon={Music} label={song} />
			<hr />
			<FooterSocials />
			<hr />
			<FooterStats />
		{:else}
			<FooterItem icon={Follow}>
				Valeu por me seguir, <b>DoceAzedo911</b>!
			</FooterItem>
		{/if}
	</footer>
{/key}

<style lang="scss">
	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.5rem;
		width: 100%;
		height: 93px;
	}

	hr {
		display: flex;
		height: 1.75rem;
		width: 2px;
		background-color: rgba(#fff, 0.2);
		border: 0;
	}
</style>
