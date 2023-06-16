<script lang="ts">
	import { page } from '$app/stores';

	export let data;

	const redirectUri = `${$page.url.origin}/accounts/connect`;
</script>

<h1>Accounts</h1>

{#if !data.clientId}
	<div>Your Twitch application is not setup!</div>
{/if}

<ul>
	<li>
		<h2>Streamer account</h2>
		<p>Not connected!</p>
		<a
			href="https://id.twitch.tv/oauth2/authorize?client_id={data.clientId}&redirect_uri={redirectUri}&response_type=code&scope=chat:read+chat:edit"
			>Connect
		</a>
	</li>
	<li>
		<h2>Bot account</h2>
		<p>Not connected!</p>
		<a
			href="https://id.twitch.tv/oauth2/authorize?client_id={data.clientId}&redirect_uri={redirectUri}&response_type=code&scope=chat:read+chat:edit"
			>Connect</a
		>
	</li>
</ul>
