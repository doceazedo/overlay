<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { flyIn, flyOut } from '$lib/utils/transitions';
	import Follow from '$lib/components/icons/Follow.svelte';
	import FooterDivider from './FooterDivider.svelte';
	import FooterItem from './FooterItem.svelte';
	import FooterSocials from './FooterSocials.svelte';
	import FooterSong from './FooterSong.svelte';
	import FooterStats from './FooterStats.svelte';

	let showAnnouncement = false;

	onMount(async () => {
		// TODO: remove debug methods
		window.toggleAnnouncement = () => (showAnnouncement = !showAnnouncement);
	});
</script>

{#key showAnnouncement}
	<footer class="footer" in:fly={flyIn} out:fly={flyOut}>
		{#if !showAnnouncement}
			<FooterSong />
			<FooterSocials />
			<FooterDivider />
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
</style>
