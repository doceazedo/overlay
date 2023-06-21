<script lang="ts">
	export let data;
</script>

<form method="post">
	<input
		type="text"
		name="twitch_client_id"
		placeholder="Twitch client ID"
		value={data.twitchClientId}
	/>
	<input
		type="password"
		name="twitch_client_secret"
		placeholder="Twitch client secret"
		value={data.twitchClientSecret}
	/>

	<input
		type="text"
		name="twitch_channel_name"
		placeholder="Twitch client secret"
		value={data.twitchChannelName}
	/>
	<button type="submit">Finish setup</button>
</form>
