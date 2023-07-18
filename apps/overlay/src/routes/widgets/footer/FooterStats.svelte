<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { trpc } from 'trpc-client';
	import Eye from '$lib/components/icons/Eye.svelte';
	import Heart from '$lib/components/icons/Heart.svelte';
	import Star from '$lib/components/icons/Star.svelte';
	import FooterItem from './FooterItem.svelte';

	const channelId = `${env.PUBLIC_TWITCH_BROADCASTER_ID}`;

	let stats = {
		followers: 0,
		subscriptions: 0,
		viewers: 0
	};

	onMount(async () => {
		stats = await trpc.twitch.getStreamStats.query({
			id: channelId
		});
	});

	setTimeout(async () => {
		const { viewers } = await trpc.twitch.getStreamViewers.query({ id: channelId });
		stats.viewers = viewers;
	}, 15000);
</script>

<div class="stats">
	<FooterItem icon={Heart} label={stats.followers.toLocaleString('pt-BR')} />
	<FooterItem icon={Star} label={stats.subscriptions.toLocaleString('pt-BR')} />
	<FooterItem icon={Eye} label={stats.viewers.toLocaleString('pt-BR')} />
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
