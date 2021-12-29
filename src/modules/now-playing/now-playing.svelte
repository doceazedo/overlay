<script>
  import { NowPlaying } from '../../components/now-playing';
  import {
    songDetails,
    showSongDetails as showDetails,
    showArtist
  } from '../../stores';

  let song = {};
  setInterval(async () => {
    try {
      const data = await(await fetch('/spotify')).json();
      if (data.title != song.title) {
        song = {};
        setTimeout(() => song = data, 500);
      }
    } catch (e) { }
  }, 2500);
</script>

<NowPlaying
  {song}
  {$showArtist}
  {$showDetails}
  {$songDetails}
/>