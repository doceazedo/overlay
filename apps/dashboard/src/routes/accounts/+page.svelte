<script lang="ts">
	import { page } from '$app/stores';
	import AccountCard from '$lib/components/AccountCard.svelte';

	export let data;

	const redirectUri = `${$page.url.origin}/accounts/connect/twitch`;

	const getOauthUrl = (type: string) =>
		`https://id.twitch.tv/oauth2/authorize?client_id=${data.twitchClientId}&redirect_uri=${redirectUri}/${type}&response_type=code&scope=chat:read+chat:edit`;

	const getDisconnectUrl = (type: string) => `/accounts/remove/twitch/${type}`;

	const getAccountData = (data: any) => {
		if (!data) return null;
		return {
			name: data.displayName,
			avatar: data.profilePictureUrl
		};
	};
</script>

<h1>Accounts</h1>

{#if !data.twitchClientId}
	<div>Your Twitch application is not setup!</div>
{/if}

<AccountCard
	label="Streamer"
	data={getAccountData(data.twitchBroadcasterUser)}
	connectUrl={getOauthUrl('broadcaster')}
	disconnectUrl={getDisconnectUrl('broadcaster')}
/>

<AccountCard
	label="Bot"
	data={getAccountData(data.twitchBotUser)}
	connectUrl={getOauthUrl('bot')}
	disconnectUrl={getDisconnectUrl('bot')}
/>
