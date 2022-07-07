<script lang="ts">
  import { browser } from '$app/env';
  import { socket } from '$lib/modules';

  let audio: HTMLAudioElement;
  let audioQueue: ArrayBuffer[] = [];

  socket.on('playaudio', (buffer: ArrayBuffer) => {
    audioQueue.push(buffer);
    if (audioQueue.length == 1) playNextAudio();
  });

  socket.on('skipaudio', () => {
    if (!browser) return;
    audio.currentTime = audio.duration;
  });

  const playNextAudio = () => {
    if (!browser) return;

    const buffer = audioQueue[0];
    const blob = new Blob([buffer], { type: 'audio/mp3' });
    const url = window.URL.createObjectURL(blob);

    audio.src = url;
    audio.play();
  };

  const handleFinish = () => {
    audioQueue.shift();
    playNextAudio();
  };
</script>

<audio bind:this={audio} on:ended={handleFinish} />
