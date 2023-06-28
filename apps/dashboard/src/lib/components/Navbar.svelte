<script lang="ts">
	export let user: any;
</script>

<nav class="navbar has-shadow">
	<div class="navbar-brand">
		<a class="navbar-item" href="https://bulma.io">
			<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="" />
		</a>

		<button class="navbar-burger">
			<span />
			<span />
			<span />
		</button>
	</div>

	<div id="navbarBasicExample" class="navbar-menu">
		<div class="navbar-start">
			<a href="/" class="navbar-item">Dashboard</a>
			<a href="/accounts" class="navbar-item">Accounts</a>
			<a href="/connections" class="navbar-item">Connections</a>
			<a href="/commands" class="navbar-item">Commands</a>
		</div>

		<div class="navbar-end">
			<div class="navbar-item">
				<a
					href="https://github.com/doceazedo/overlay"
					target="_blank"
					rel="noopener noreferrer"
					class="button is-light"
				>
					Source code
				</a>
			</div>
			{#if user}
				<a href="/accounts" class="navbar-link is-arrowless">
					<figure class="image">
						<img
							class="is-rounded"
							src={user.profilePictureUrl}
							alt="Avatar of {user.displayName}"
						/>
					</figure>
				</a>
			{/if}
		</div>
	</div>
</nav>

<style lang="scss">
	.image {
		width: 2.25rem;
		height: 2.25rem;
	}
</style>
