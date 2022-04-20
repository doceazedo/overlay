<script lang="ts">
  import { onMount } from 'svelte';
  import { getCurrentlyPlayingDetails } from '$lib/clients/song';
  import { MusicPlayer } from '$lib/components';
  import { socket } from '$lib/modules';
  import type { CurrentlyPlayingDetailsResponse } from '$lib/clients/song';

  let song: CurrentlyPlayingDetailsResponse;
  let showDetails = false;

  socket.on('cmd:song', async () => {
    if (showDetails) return;
    showDetails = true;
    setTimeout(() => (showDetails = false), 10000);
  });

  onMount(async () => {
    song = await getCurrentlyPlayingDetails();
    setInterval(async () => (song = await getCurrentlyPlayingDetails()), 2500);
  });
</script>

<MusicPlayer {song} {showDetails} />
