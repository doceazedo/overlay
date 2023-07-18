<script lang="ts">
	import { flyIn, flyOut, fly as patchedFly } from '$lib/utils/transitions';
	import type { SvelteComponent } from 'svelte';

	export let label: string | number = 'Label';
	export let icon: any;
	export let hasIconTransitions = true;
	export let hasLabelTransitions = true;
</script>

<div class="item">
	<div class="item-inner">
		{#key !hasIconTransitions && !hasLabelTransitions && label}
			<div class="content-wrapper" in:patchedFly={flyIn} out:patchedFly={flyOut}>
				<div class="content">
					{#key hasIconTransitions && icon}
						<div class="icon" in:patchedFly={flyIn} out:patchedFly={flyOut}>
							<svelte:component this={icon} />
						</div>
					{/key}
				</div>
				<div class="content">
					{#key hasLabelTransitions && label}
						<p class="label" in:patchedFly={flyIn} out:patchedFly={flyOut}>
							<slot>
								{label}
							</slot>
						</p>
					{/key}
				</div>
			</div>
		{/key}
	</div>
</div>

<style lang="scss">
	.item {
		display: flex;
		justify-content: center;
		color: rgba(#fff, 0.8);
		transition: all 0.6s cubic-bezier(0.33, 1, 0.68, 1);

		:global(svg) {
			width: 1.75rem;
			height: 1.75rem;
		}
	}

	.content,
	.item-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: fit-content;
		height: 28.5px;
		transition: all 0.6s cubic-bezier(0.33, 1, 0.68, 1);
	}

	.content-wrapper {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.icon {
		display: flex;
	}

	.label {
		width: max-content;
	}
</style>
