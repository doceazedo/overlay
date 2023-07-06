<script lang="ts">
	import { botScopes, broadcasterScopes } from 'twurple-auth/scopes';
	import { page } from '$app/stores';
	import AccountCard from '$lib/components/AccountCard.svelte';

	export let data;

	const redirectUri = `${$page.url.origin}/accounts/connect/twitch`;

	const getOauthUrl = (type: string) => {
		const scopes = type == 'bot' ? botScopes : broadcasterScopes;
		return `https://id.twitch.tv/oauth2/authorize?client_id=${
			data.twitchClientId
		}&redirect_uri=${redirectUri}/${type}&response_type=code&scope=${scopes.join('+')}`; // chat:read+chat:edit
	};

	const getDisconnectUrl = (type: string) => `/accounts/remove/twitch/${type}`;

	const getAccountData = (data: any) => {
		if (!data) return null;
		return {
			name: data.displayName,
			avatar: data.profilePictureUrl
		};
	};
</script>

<h1 class="title">Accounts</h1>
<p class="subtitle">Connect your accounts</p>

{#if !data.twitchClientId}
	<div class="notification is-danger is-light">
		You must <a href="/setup">setup your Twitch application</a> before logging in with your accounts.
	</div>
{/if}

<div class="notification is-warning is-light">
	You have to <a href="/setup">setup your Spotify application</a> before logging in with your account.
</div>

<div class="grid">
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
</div>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-column-gap: 1rem;
		grid-row-gap: 1rem;
	}
</style>
