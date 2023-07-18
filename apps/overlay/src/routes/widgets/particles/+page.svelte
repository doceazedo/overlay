<script lang="ts">
	import { onMount } from 'svelte';
	import { socket } from 'ws-client';
	import JSConfetti from 'js-confetti';

	onMount(() => {
		const jsConfetti = new JSConfetti();

		socket.on('confetti', () => jsConfetti.addConfetti());
	});
</script>
