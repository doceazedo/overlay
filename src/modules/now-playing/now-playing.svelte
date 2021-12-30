<script>
  import {
    songDetails,
    showSongDetails as showDetails,
    showArtist,
    isPlayingOsu
  } from '../../stores';
  import { GET } from '../../utils';
  import { NowPlaying } from '../../components';

  $isPlayingOsu = GET('osu') != null;

  let song = {};
  setInterval(async () => {
    try {
      const data = await(await fetch(`/song${$isPlayingOsu ? '?osu' : ''}`)).json();
      if (data.title != song.title) {
        song = {};
        setTimeout(() => song = data, 500);
      }
    } catch (e) { }
  }, $isPlayingOsu ? 500 : 2500);
</script>

<NowPlaying
  {song}
  showArtist={$showArtist}
  showDetails={$showDetails}
  songDetails={$songDetails}
/>