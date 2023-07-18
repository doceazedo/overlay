<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { flyIn, flyOut } from '$lib/utils/transitions';
	import Eye from '$lib/components/icons/Eye.svelte';
	import Heart from '$lib/components/icons/Heart.svelte';
	import Music from '$lib/components/icons/Music.svelte';
	import Star from '$lib/components/icons/Star.svelte';
	import Follow from '$lib/components/icons/Follow.svelte';
	import FooterItem from './FooterItem.svelte';
	import FooterSocials from './FooterSocials.svelte';

	let showAnnouncement = false;

	let song = 'Kim Petras - Claws';

	onMount(() => {
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
			<div class="metrics">
				<FooterItem icon={Heart} label="1.033" />
				<FooterItem icon={Star} label="32" />
				<FooterItem icon={Eye} label="15" />
			</div>
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

	.metrics {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.5rem;
		color: rgba(#fff, 0.8);
	}

	hr {
		display: flex;
		height: 1.75rem;
		width: 2px;
		background-color: rgba(#fff, 0.2);
		border: 0;
	}
</style>
