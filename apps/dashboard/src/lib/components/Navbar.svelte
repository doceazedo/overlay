<script lang="ts">
	import { Coins, Home, Megaphone, MessageCircle, RadioTower, Users } from 'lucide-svelte';
	import type { SvelteComponent } from 'svelte';
	import { page } from '$app/stores';

	type NavbarItem = {
		href: string;
		label: string;
		icon: typeof SvelteComponent;
	};

	export let user: any;

	const navbarItems: NavbarItem[] = [
		{
			href: '/',
			label: 'Dashboard',
			icon: Home
		},
		{
			href: '/commands',
			label: 'Commands',
			icon: MessageCircle
		},
		{
			href: '/events',
			label: 'Events',
			icon: Megaphone
		},
		{
			href: '/channel-points',
			label: 'Channel Points',
			icon: Coins
		},
		{
			href: '/accounts',
			label: 'Accounts',
			icon: Users
		},
		{
			href: '/connections',
			label: 'Connections',
			icon: RadioTower
		}
	];
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
			{#each navbarItems as item}
				<a href={item.href} class="navbar-item" class:is-active={$page.url.pathname == item.href}>
					<svelte:component this={item.icon} size={20} />
					{item.label}
				</a>
			{/each}
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

	.navbar-item {
		gap: 0.375rem;

		&.is-active {
			box-shadow: 0 2px #00d1b2;
			color: #00d1b2;
		}
	}
</style>
