<script lang="ts">
	import { page } from '$app/stores';

	export let data;

	const redirectUri = `${$page.url.origin}/accounts/connect/twitch`;

	const getOauthUrl = (type: string) =>
		`https://id.twitch.tv/oauth2/authorize?client_id=${data.twitchClientId}&redirect_uri=${redirectUri}/${type}&response_type=code&scope=chat:read+chat:edit`;

	const getDisconnectUrl = (type: string) => `/accounts/remove/twitch/${type}`;
</script>

<h1>Accounts</h1>

{#if !data.twitchClientId}
	<div>Your Twitch application is not setup!</div>
{/if}

<ul>
	<li>
		<h2>Streamer account</h2>
		{#if data.twitchBroadcasterUser}
			<img src={data.twitchBroadcasterUser.profilePictureUrl} alt="" />
			<p>{data.twitchBroadcasterUser.displayName}</p>
			<a href={getDisconnectUrl('broadcaster')}>Disconnect</a>
		{:else}
			<p>Not connected!</p>
			<a href={getOauthUrl('broadcaster')}>Connect</a>
		{/if}
	</li>
	<li>
		<h2>Bot account</h2>
		{#if data.twitchBotUser}
			<img src={data.twitchBotUser.profilePictureUrl} alt="" />
			<p>{data.twitchBotUser.displayName}</p>
			<a href={getDisconnectUrl('bot')}>Disconnect</a>
		{:else}
			<p>Not connected!</p>
			<a href={getOauthUrl('bot')}>Connect</a>
		{/if}
	</li>
</ul>
