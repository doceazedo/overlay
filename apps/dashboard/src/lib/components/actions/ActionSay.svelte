<script lang="ts">
	import type { ActionSay } from 'db/actions';

	export let action: ActionSay;
</script>

<div class="field">
	<label class="label" for="message">Content</label>
	<div class="control">
		<textarea class="textarea" name="message" placeholder="Pong! 🏓" bind:value={action.message} />
	</div>
</div>
