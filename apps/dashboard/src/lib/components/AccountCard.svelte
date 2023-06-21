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

<div>
	<h2>{label} account</h2>
	{#if data}
		<img src={data.avatar} alt="Avatar of {data.name}" />
		<p>{data.name}</p>
		<a href={connectUrl}>Disconnect</a>
	{:else}
		<p>Not connected!</p>
		<a href={disconnectUrl}>Connect</a>
	{/if}
</div>
