<script lang="ts">
  import { onMount } from 'svelte';
  import { getCurrentlyPlaying } from '$lib/services/song';
  import { MusicPlayer } from '$lib/components';
  import type { CurrentlyPlayingResponse } from '$lib/services/song';

  let song: CurrentlyPlayingResponse;

  onMount(async () => {
    song = await getCurrentlyPlaying();
    setInterval(async () => (song = await getCurrentlyPlaying()), 2500);
  });
</script>

<MusicPlayer title={song?.title} artist={song?.artist} cover={song?.cover} />
