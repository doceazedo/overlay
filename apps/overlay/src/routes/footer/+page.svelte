<script lang="ts">
	import Eye from '$lib/components/icons/Eye.svelte';
	import GitHub from '$lib/components/icons/GitHub.svelte';
	import Heart from '$lib/components/icons/Heart.svelte';
	import Music from '$lib/components/icons/Music.svelte';
	import Star from '$lib/components/icons/Star.svelte';
</script>

<main class="main">
	<footer class="footer">
		<p>
			<Music />
			Kim Petras - Claws
		</p>
		<p>
			<GitHub />
			github.com/doceazedo
		</p>
		<ul class="metrics">
			<li>
				<Heart />
				1.033
			</li>
			<li>
				<Star />
				32
			</li>
			<li>
				<Eye />
				15
			</li>
		</ul>
	</footer>
</main>

<style lang="scss">
	.main {
		display: flex;
		align-items: flex-end;
		width: 100%;
		height: 100%;
	}

	.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.5rem;
		width: 100%;
		height: 93px;
	}

	p,
	.metrics {
		display: flex;
		align-items: center;
		color: rgba(#fff, 0.8);
	}

	p {
		gap: 0.5rem;

		&:not(:last-child)::after {
			content: '';
			display: flex;
			height: 1.75rem;
			width: 2px;
			background-color: rgba(#fff, 0.2);
			margin-left: 1rem;
		}
	}

	.metrics {
		gap: 1.5rem;

		li {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}

	:global(svg) {
		width: 1.75rem;
		height: 1.75rem;
	}
</style>
