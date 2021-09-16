<script>
  import { browser } from '$app/env';
  import { Alerts, Chat, Emotes, Pomodoro, NowPlaying } from '../components';

  const GET = param => {
    if (!browser) return;

    let result = null, tmp = [];
    location.search
      .substr(1)
      .split('&')
      .forEach(item => {
        tmp = item.split('=');
        if (tmp[0] === param) result = decodeURIComponent(tmp[1]);
      });
    return result;
  }
</script>

<Alerts />

<Emotes />

<aside>
  <NowPlaying />

  {#if GET('pomodoro')}
    <Pomodoro />
  {/if}

  <Chat />
</aside>

<style type="text/sass">
  @import '../sass/vars.sass'

  aside
    position: absolute
    bottom: 0
    right: 0
    width: 480px
    height: calc(100% - 270px)
    display: flex
    flex-direction: column
    background-color: #2d2d2d
    padding: 1rem
    color: #fff

    &::before
      content: ''
      position: fixed
      top: 0
      right: 480px
      width: 1px
      height: 100%
      background-color: #202020
</style>