<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import {
    ConveyorBeltLogo,
    getRandomMessage,
    MediaPlayer,
  } from '$lib/modules';
  import { Chat, MEDIAPLAYER_PLAYBACK } from '$lib/modules';

  const flyOut = {
    duration: 200,
    y: -16,
    opacity: 0,
    easing: quintOut,
  };
  const flyIn = { ...flyOut, delay: 400, y: 16 };

  const soonTitle = 'A live já vai começar!';
  const startingTitle = 'A live está começando...';
  const brbTitle = 'Só um minuto, eu já volto!';

  let title = soonTitle;
  let loadingMessage = getRandomMessage();
  let showLoadingMessage = true;

  setInterval(() => {
    loadingMessage = getRandomMessage();
  }, 5000);

  const playPause = () => {
    $MEDIAPLAYER_PLAYBACK = !$MEDIAPLAYER_PLAYBACK;
  };

  const startStream = () => {
    $MEDIAPLAYER_PLAYBACK = false;
    showLoadingMessage = false;
    title = startingTitle;
    setTimeout(() => (title = brbTitle), 10000);
  };
</script>

<main class="main">
  <header class="header">
    {#key title}
      <h1 class="title" in:fly={flyIn} out:fly={flyOut}>
        {title}
      </h1>
    {/key}

    {#if showLoadingMessage}
      {#key loadingMessage}
        <p class="message" in:fly={flyIn} out:fly={flyOut}>{loadingMessage}</p>
      {/key}
    {/if}
  </header>

  <div class="content">
    <div class="memes">
      <MediaPlayer />
    </div>
    <div class="chat">
      <Chat theme="light" />
    </div>
  </div>
</main>

<div class="background">
  {#each Array(4) as _}
    <ConveyorBeltLogo direction="left" />
    <ConveyorBeltLogo direction="right" />
  {/each}
</div>

<button class="hidden-button left" on:click={playPause} />
<button class="hidden-button right" on:click={startStream} />

<style lang="sass">
  :global(body)
    background-color: #070212

  .main
    position: absolute
    top: 0
    left: 0
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 2.5rem
    width: 100%
    height: 100%
    z-index: 10

  .header
    position: relative
    display: flex
    align-items: center
    width: 1532px
    margin: 0 auto

    .title
      font-size: 3rem
      font-weight: 800
      letter-spacing: 1px

    .message
      position: absolute
      right: 0
      font-size: 1.5rem
      color: rgba(#fff, .75)

  .content
    display: flex
    justify-content: center
    align-items: center
    gap: 1rem

    .memes
      width: 1066px
      height: 915px

    .chat
      display: flex
      height: 100%
      width: 450px

  .background
    display: flex
    flex-direction: column
    justify-content: center
    width: 100%
    height: 100%
    overflow: hidden

  .hidden-button
    position: fixed
    bottom: 0
    z-index: 10
    display: flex
    width: 8rem
    height: 8rem
    opacity: 0

    &.left
      left: 0

    &.right
      right: 0
</style>
