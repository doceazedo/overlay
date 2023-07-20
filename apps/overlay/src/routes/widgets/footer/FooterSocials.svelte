<script lang="ts">
	import { onDestroy } from 'svelte';
	import GitHub from '$lib/components/icons/GitHub.svelte';
	import Twitter from '$lib/components/icons/Twitter.svelte';
	import Link from '$lib/components/icons/Link.svelte';
	import DynamicItem from '$lib/components/DynamicItem.svelte';
	import Mastodon from '$lib/components/icons/Mastodon.svelte';
	import Instagram from '$lib/components/icons/Instagram.svelte';

	const socials = [
		{ icon: Link, label: 'doceazedo.com' },
		{ icon: GitHub, label: 'github.com/doceazedo' },
		{ icon: Twitter, label: '@doceazedo911' },
		{ icon: Mastodon, label: '@doceazedo@bolha.us' },
		{ icon: Instagram, label: '@doceazedo911' }
	];

	let activeSocial = 0;

	const socialsInterval = setInterval(
		() => (activeSocial = (activeSocial + 1) % socials.length),
		30000
	);

	onDestroy(() => clearInterval(socialsInterval));
</script>

<DynamicItem
	icon={socials[activeSocial].icon}
	label={socials[activeSocial].label}
	hasIconTransitions={false}
	hasLabelTransitions={false}
/>
