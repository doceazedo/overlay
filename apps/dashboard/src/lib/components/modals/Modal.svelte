<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { tick } from 'svelte';

	export let active = false;
	export let title: string;
	let modal: HTMLDivElement;

	const close = () => (active = false);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key == 'Escape') close();
	};

	const handleActiveToggle = async () => {
		// await modal to be mounted/destroyed after `active` changes
		await tick();
		if (!active) return;
		const interactableEl = modal?.querySelector(
			'input,textarea,select,button:not(.delete):not(.is-static)'
		) as HTMLElement;
		interactableEl?.focus();
	};

	$: active, handleActiveToggle();
</script>

{#if active}
	<div class="modal is-active" bind:this={modal}>
		<div
			class="modal-background"
			transition:fade={{ duration: 200, easing: quintOut }}
			on:click={close}
			on:keypress
		/>
		<div
			class="modal-card"
			transition:scale={{ duration: 200, start: 0.75, opacity: 0, easing: quintOut }}
		>
			<header class="modal-card-head">
				<p class="modal-card-title">{title}</p>
				<button class="delete" type="button" on:click={close} />
			</header>
			<section class="modal-card-body">
				<slot />
			</section>
			<footer class="modal-card-foot is-justify-content-flex-end">
				<slot name="footer" />
			</footer>
		</div>
	</div>
{/if}

<svelte:window on:keydown={handleKeyDown} />
