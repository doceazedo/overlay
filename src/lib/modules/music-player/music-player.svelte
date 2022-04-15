<script lang="ts">
  import { onMount } from 'svelte';
  import {
    getCurrentlyPlaying,
    getCurrentlyPlayingDetails,
  } from '$lib/services/song';
  import { MusicPlayer } from '$lib/components';
  import { socket } from '$lib/modules';
  import type {
    CurrentlyPlayingResponse,
    CurrentlyPlayingDetailsResponse,
  } from '$lib/services/song';

  let song: CurrentlyPlayingResponse;
  let songDetails: CurrentlyPlayingDetailsResponse;
  let showArtist = false;

  socket.on('cmd:song', async () => {
    if (songDetails != null) return;

    songDetails = await getCurrentlyPlayingDetails();
    setTimeout(() => (showArtist = true), 4000);
    setTimeout(() => (showArtist = false), 13000);
    setTimeout(() => (songDetails = null), 15000);
  });

  onMount(async () => {
    song = await getCurrentlyPlaying();
    setInterval(async () => (song = await getCurrentlyPlaying()), 2500);
  });
</script>

<MusicPlayer
  title={song?.title}
  artist={song?.artist}
  cover={song?.cover}
  details={songDetails}
  {showArtist}
/>
