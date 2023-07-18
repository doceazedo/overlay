<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { trpc } from 'trpc-client';
	import Eye from '$lib/components/icons/Eye.svelte';
	import Heart from '$lib/components/icons/Heart.svelte';
	import Star from '$lib/components/icons/Star.svelte';
	import FooterItem from './FooterItem.svelte';
	import { STATS } from './stores';

	const channelId = `${env.PUBLIC_TWITCH_BROADCASTER_ID}`;

	onMount(async () => {
		$STATS = await trpc.twitch.getStreamStats.query({
			id: channelId
		});
	});

	const interval = setInterval(async () => {
		const { viewers } = await trpc.twitch.getStreamViewers.query({ id: channelId });
		$STATS.viewers = viewers;
	}, 15000);

	onDestroy(() => clearInterval(interval));
</script>

<div class="stats">
	<FooterItem icon={Heart} label={$STATS.followers.toLocaleString('pt-BR')} />
	<FooterItem icon={Star} label={$STATS.subscriptions.toLocaleString('pt-BR')} />
	<FooterItem icon={Eye} label={$STATS.viewers.toLocaleString('pt-BR')} />
</div>

<style lang="scss">
	.stats {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.5rem;
		color: rgba(#fff, 0.8);
	}
</style>
