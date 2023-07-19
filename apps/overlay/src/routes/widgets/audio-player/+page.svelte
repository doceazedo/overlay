<script lang="ts">
	import { browser } from '$app/environment';
	import { socket } from 'ws-client';

	let audio: HTMLAudioElement;
	const audioQueue: Buffer[] = [];

	socket.on('play-audio', (buffer) => {
		if (!browser) return;
		audioQueue.push(buffer);
		if (!audio.duration || audio.paused) playNextAudio();
	});

	const playNextAudio = () => {
		if (!audioQueue.length) return;
		const buffer = audioQueue.shift() as Buffer;
		const blob = new Blob([buffer], { type: 'audio/mp3' });
		const url = window.URL.createObjectURL(blob);
		audio.src = url;
		audio.play();
	};

	const handleAudioEnd = () => playNextAudio();
</script>

<audio bind:this={audio} on:ended={handleAudioEnd} />
