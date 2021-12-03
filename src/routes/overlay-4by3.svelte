<script>
  import { onMount } from 'svelte';
  import {
    Alerts,
    Chat,
    EmotesWall,
    Pomodoro,
    NowPlaying,
    Shoutout,
    Confetti
  } from '../components';
  import { GET, tmiClient, alertsWS } from '../utils';
  import { showShoutout, showConfetti } from '../stores';

  onMount(async () => await fetch('/cybervox/listen'));
</script>

<div class="alert-wrapper">
  <Alerts {alertsWS} />
</div>

<EmotesWall />

<aside>
  <NowPlaying />

  {#if GET('pomodoro')}
    <Pomodoro />
  {/if}

  <div class="chat-wrapper">
    <Chat {tmiClient} />
  </div>
</aside>

{#if $showShoutout}
  <Shoutout />
{/if}

{#if $showConfetti}
  <Confetti />
{/if}

{#if GET('halloween')}
  <lottie-player class="halloween" src="/assets/json/cobweb.json" speed="1" loop autoplay></lottie-player>
{/if}

{#if GET('christmas')}
  <lottie-player class="christmas" src="/assets/json/snow.json" speed=".75" loop autoplay></lottie-player>
{/if}

<style type="text/sass">
  @import '../sass/vars.sass'

  .alert-wrapper
    position: absolute
    display: flex
    justify-content: center
    width: 1440px
    margin-top: 1rem
    z-index: 10

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

    .chat-wrapper
      flex-grow: 1
      padding: .75rem
      background-color: #242424
      border-radius: .5rem
      overflow: hidden

  .halloween
    position: absolute
    top: 328px
    right: -14px
    width: 530px
    height: auto
    filter: invert(1)
    opacity: .05

  .christmas
    position: absolute
    top: 380px
    right: 20px
    width: 450px
    height: auto
    opacity: .25
    filter: brightness(10)
</style>