<script lang="ts">
	import { page } from '$app/stores';

	export let data;
</script>

<h1 class="title">Setup</h1>
<p class="subtitle">Initial configuration setup</p>

<form method="post">
	<div class="box">
		<h2 class="title is-4">Twitch application</h2>
		<p class="subtitle is-6">Please insert the credentials for your Twitch developer application</p>

		<div class="notification is-info is-light">
			You must create an application on the
			<a href="https://dev.twitch.tv/console/apps" target="_blank" rel="noopener noreferrer">
				Twitch Developers
			</a>
			console to grab your client ID and secret.
		</div>

		<div class="notification is-warning is-light content">
			Make sure to add both of these URLs as OAuth redirects <b>exactly</b> like this in your
			application and save:
			<ul>
				<li>{$page.url.origin}/accounts/connect/twitch/broadcaster</li>
				<li>{$page.url.origin}/accounts/connect/twitch/bot</li>
			</ul>
		</div>

		<div class="field">
			<label class="label" for="twitch_client_id">Client ID</label>
			<div class="control">
				<input
					class="input"
					type="text"
					placeholder="swc1qxkjmurtfpcrqaood6mfcblg1rpe"
					name="twitch_client_id"
					value={data.twitchClientId}
				/>
			</div>
		</div>

		<div class="field">
			<label class="label" for="twitch_client_secret">Client secret</label>
			<div class="control">
				<input
					class="input"
					type="password"
					placeholder="••••••••••••••••••••••••••••••"
					name="twitch_client_secret"
					value={data.twitchClientSecret}
				/>
			</div>
		</div>
	</div>

	<div class="is-flex is-justify-content-flex-end">
		<button class="button is-primary" type="submit">Finish setup</button>
	</div>
</form>
