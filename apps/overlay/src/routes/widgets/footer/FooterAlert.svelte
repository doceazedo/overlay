<script lang="ts">
	import { onMount } from 'svelte';
	import Follow from '$lib/components/icons/Follow.svelte';
	import FooterItem from './FooterItem.svelte';
	import { ALERTS } from './stores';

	export let id: string | null;
	let alert: any;

	onMount(() => {
		alert = $ALERTS.find((x) => x.id == id);
	});
</script>

{#if alert}
	<FooterItem icon={Follow}>
		Valeu por me seguir, <b>{alert.userDisplayName}</b>!
	</FooterItem>
{/if}
