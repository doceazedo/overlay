<script lang="ts">
  import { trpc } from 'trpc-client';
  import { onMount } from 'svelte';
  import { MusicPlayer } from '$lib/components';
  import { socket } from '$lib/modules';
  import type { RouterOutput } from 'trpc-client';

  let song: RouterOutput['spotify']['getTrack'];
  let showDetails = false;

  socket.on('cmd:song', async () => {
    if (showDetails) return;
    showDetails = true;
    setTimeout(() => (showDetails = false), 10000);
  });

  onMount(async () => {
    song = await trpc.spotify.getTrack.query();
    setInterval(async () => (song = await trpc.spotify.getTrack.query()), 2500);
  });
</script>

{#if song}
  <MusicPlayer {song} {showDetails} />
{/if}
