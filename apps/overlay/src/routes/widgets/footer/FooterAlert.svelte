<script lang="ts">
	import { onMount } from 'svelte';
	import Follow from '$lib/components/icons/Follow.svelte';
	import Crown from '$lib/components/icons/Crown.svelte';
	import Star from '$lib/components/icons/Star.svelte';
	import Megaphone from '$lib/components/icons/Megaphone.svelte';
	import FooterItem from './FooterItem.svelte';
	import followSound from '$lib/assets/sounds/follow-sound.mp3';
	import raidSound from '$lib/assets/sounds/raid-sound.mp3';
	import subSound from '$lib/assets/sounds/sub-sound.mp3';
	import { ALERTS, type Alert } from './stores/alerts';
	import { sleep } from '$lib/utils/sleep';

	export let id: string | null;
	let alert: Alert | null;

	onMount(async () => {
		alert = $ALERTS.find((x) => x.id == id) || null;
		if (!alert) return;

		await sleep(400);
		const audio = new Audio(ALERT_SOUNDS_MAP[alert.type]);
		audio.play();
	});

	const getAlertIcon = (alert: Alert) => {
		if ((alert.type == 'sub' || alert.type == 'resub') && alert.isPrime) return Crown;
		switch (alert.type) {
			case 'follow':
				return Follow;
			case 'sub':
				return Star;
			case 'resub':
				return Star;
			case 'raid':
				return Megaphone;
		}
	};

	const ALERT_SOUNDS_MAP = {
		follow: followSound,
		sub: subSound,
		resub: subSound,
		raid: raidSound
	};
</script>

{#if alert}
	<FooterItem icon={getAlertIcon(alert)}>
		{#if alert.type == 'follow'}
			Valeu por me seguir, <b>{alert.userDisplayName}</b>!
		{:else if alert.type == 'sub' && alert.isPrime}
			Valeu pelo Prime, <b>{alert.userDisplayName}</b>!
		{:else if alert.type == 'sub'}
			Valeu por se inscrever, <b>{alert.userDisplayName}</b>!
		{:else if alert.type == 'resub'}
			Valeu por se reinscrever por {alert.months} meses, <b>{alert.userDisplayName}</b>!
		{:else if alert.type == 'raid'}
			<b>{alert.userDisplayName}</b> está raidando com <b>{alert.raiders} pessoas</b>!
		{/if}
	</FooterItem>
{/if}
