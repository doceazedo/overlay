<script lang="ts">
	import { socket } from 'ws-client';

	type MessageData = {
		userDisplayName: string;
		userId: string;
		text: string;
		emoteOffsets: Map<string, string[]>;
	};

	const lastStreamDay = 4; // quinta
	const firstStreamDay = 'terça';
	const streamStartTime = '19h30';

	const expandedMin = 36;
	const maxEntries = 54;

	const ignore = ['doceazedo911', 'streamholics', 'sucodesvelte'];

	let participants: string[] = [];
	let expanded = false;

	const nextStream = () => {
		const date = new Date();
		return date.getDay() == lastStreamDay && date.getHours() >= 19 ? firstStreamDay : 'amanhã';
	};
	const nextStremDay = nextStream();

	socket.on('message', (data: MessageData) => {
		const author = data.userDisplayName;
		if (ignore.includes(author) || participants.includes(author)) return;
		participants = [...participants, author];
		if (participants.length > expandedMin) expanded = true;
	});
</script>

<main>
	<div class="placeholder" />

	<h1>Obrigado por assistir!</h1>
	<h2>Até {nextStremDay} às {streamStartTime} 🥰</h2>

	<ul class:expanded>
		{#each participants.slice(0, maxEntries) as participant, i}
			<li>
				{i >= maxEntries - 1 ? `+ ${participants.length - maxEntries + 1} pessoas...` : participant}
			</li>
		{/each}
	</ul>
</main>

<style lang="scss">
	.placeholder {
		width: 310px;
		height: 112px;
		margin: 3rem 0;
		flex-shrink: 0;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		width: 100%;

		h1 {
			font-size: 3rem;
			font-weight: 700;
			margin-bottom: 0.5rem;
		}
		h2 {
			margin-bottom: 3rem;
		}
		ul {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-column-gap: 1rem;
			grid-row-gap: 3rem;
			width: 75%;
			font-size: 1.5rem;
			text-align: center;

			&.expanded {
				grid-template-columns: repeat(6, 1fr);
			}
		}
	}
</style>
