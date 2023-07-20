<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { trpc } from 'trpc-client';
	import { flyIn, flyOut } from '$lib/utils/transitions';
	import Music from '$lib/components/icons/Music.svelte';
	import FooterDivider from './FooterDivider.svelte';
	import DynamicItem from '$lib/components/DynamicItem.svelte';
	import { CURRENT_SONG } from './stores/song';

	const updateCurrentSong = async () => {
		const track = await trpc.spotifyApp.getTrack.query();
		$CURRENT_SONG = track?.id ? `${track?.artist} - ${track?.title}` : null;
	};

	onMount(updateCurrentSong);

	const interval = setInterval(updateCurrentSong, 2500);
	onDestroy(() => clearInterval(interval));
</script>

{#if $CURRENT_SONG}
	<div class="song" in:fly={flyIn} out:fly={flyOut}>
		<DynamicItem icon={Music} label={$CURRENT_SONG} />
	</div>
	<FooterDivider />
{/if}

<style lang="scss">
	.song {
		display: flex;
	}
</style>
