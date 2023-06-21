<script lang="ts">
	type AccountData = {
		name: string;
		avatar: string;
	};

	export let label: string;
	export let data: AccountData | null = null;
	export let connectUrl: string;
	export let disconnectUrl: string;
</script>

<article class="card is-flex is-flex-direction-column" class:is-not-connected={!data}>
	<div class="card-content">
		<h2 class="title is-4">{label}</h2>
		<div class="user">
			{#if data}
				<img class="avatar mb-1" src={data.avatar} alt="Avatar of {data.name}" />
				<p>{data.name}</p>
			{:else}
				<p>Not connected!</p>
			{/if}
		</div>
	</div>
	<footer class="card-footer">
		{#if !data}
			<a href={connectUrl} class="card-footer-item">Connect</a>
		{:else}
			<a href={disconnectUrl} class="card-footer-item">Disconnect</a>
		{/if}
	</footer>
</article>

<style lang="scss">
	.user {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.is-not-connected .user {
		align-items: flex-start;
		font-style: italic;
	}

	.avatar {
		width: 6rem;
		height: 6rem;
		border-radius: 0.375rem;
	}

	.card-content {
		height: 100%;
	}
</style>
