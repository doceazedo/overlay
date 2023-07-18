<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { trpc } from 'trpc-client';
	import { flyIn, flyOut } from '$lib/utils/transitions';
	import Music from '$lib/components/icons/Music.svelte';
	import FooterDivider from './FooterDivider.svelte';
	import FooterItem from './FooterItem.svelte';

	let song: string | null = null;

	const updateCurrentSong = async () => {
		const track = await trpc.spotifyApp.getTrack.query();
		song = track?.id ? `${track?.artist} - ${track?.title}` : null;
	};

	onMount(updateCurrentSong);

	const interval = setInterval(updateCurrentSong, 2500);
	onDestroy(() => clearInterval(interval));
</script>

{#if song}
	<div class="song" in:fly={flyIn} out:fly={flyOut}>
		<FooterItem icon={Music} label={song} />
	</div>
	<FooterDivider />
{/if}

<style lang="scss">
	.song {
		display: flex;
	}
</style>
