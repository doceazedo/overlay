<script lang="ts">
	import { Home, BrandGithub } from 'svelte-tabler';

	let showUserMenu = false;
</script>

<header class="navbar navbar-expand-md d-print-none">
	<div class="container-xl">
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbar-menu"
			aria-controls="navbar-menu"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
			<a href="/">
				<img
					src="https://preview.tabler.io/static/logo.svg"
					width="110"
					height="32"
					alt="Tabler"
					class="navbar-brand-image"
				/>
			</a>
		</h1>
		<div class="navbar-nav flex-row order-md-last">
			<div class="nav-item d-none d-md-flex me-3">
				<div class="btn-list">
					<a href="https://github.com/tabler/tabler" class="btn" target="_blank" rel="noreferrer">
						<span class="icon">
							<BrandGithub size="20" />
						</span>
						Source code
					</a>
				</div>
			</div>
			<div class="nav-item dropdown">
				<button
					on:click={() => (showUserMenu = !showUserMenu)}
					class="nav-link d-flex lh-1 text-reset p-0"
					data-bs-toggle="dropdown"
					aria-label="Open user menu"
				>
					<span
						class="avatar avatar-sm"
						style="background-image: url(https://unavatar.io/doceazedo911)"
					/>
					<div class="d-none d-xl-block ps-2">
						<div>DoceAzedo911</div>
						<div class="mt-1 small text-muted text-left">:)</div>
					</div>
				</button>
				<div
					class="dropdown-menu dropdown-menu-end dropdown-menu-arrow"
					class:show={showUserMenu}
					data-bs-popper="static"
				>
					<a href="#" class="dropdown-item">Status</a>
					<a href="./profile.html" class="dropdown-item">Profile</a>
					<a href="#" class="dropdown-item">Feedback</a>
					<div class="dropdown-divider" />
					<a href="./settings.html" class="dropdown-item">Settings</a>
					<a href="./sign-in.html" class="dropdown-item">Logout</a>
				</div>
			</div>
		</div>
		<div class="collapse navbar-collapse" id="navbar-menu">
			<div
				class="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center"
			>
				<ul class="navbar-nav">
					<li class="nav-item active">
						<a class="nav-link" href="./"
							><span class="nav-link-icon d-md-none d-lg-inline-block">
								<Home size="24" />
							</span> <span class="nav-link-title">Home</span></a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
</header>
