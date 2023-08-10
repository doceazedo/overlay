<script lang="ts">
	import { fly } from 'svelte/transition';
	import { flyIn, flyOut } from '$lib/utils/transitions';
	import FooterAlert from './FooterAlert.svelte';
	import FooterDivider from './FooterDivider.svelte';
	import FooterSocials from './FooterSocials.svelte';
	import FooterSong from './FooterSong.svelte';
	import FooterStats from './FooterStats.svelte';
	import { ALERTS, activeAlert, queueAlert } from './stores/alerts';
	import { onMount } from 'svelte';

	onMount(() => {
		window.debug = (x = 'DoceAzedo911') => {
			queueAlert({ type: 'follow', userDisplayName: x });
		};
		window.debug2 = () => {
			queueAlert({ type: 'raid', userDisplayName: 'DoceAzedo911', raiders: 8 });
			queueAlert({ type: 'follow', userDisplayName: 'DoceAzedo911' });
			queueAlert({ type: 'sub', userDisplayName: 'DoceAzedo911', isPrime: true });
			queueAlert({ type: 'sub', userDisplayName: 'DoceAzedo911', isPrime: false });
			queueAlert({ type: 'resub', userDisplayName: 'DoceAzedo911', isPrime: false, months: 3 });
		};
	});
</script>

{#key !!$ALERTS.length && activeAlert}
	<footer class="footer" in:fly={flyIn} out:fly={flyOut}>
		{#if !$ALERTS.length}
			<FooterSong />
			<FooterSocials />
			<FooterDivider />
			<FooterStats />
		{:else}
			<FooterAlert id={activeAlert} />
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
