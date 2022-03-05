<script lang="ts">
  import { ConveyorBeltLogo, MediaPlayer } from '$lib/modules';
</script>

<main class="main">
  <header class="header">
    <h1 class="title">A live já vai começar!</h1>
    <p class="message">Carregando...</p>
  </header>

  <div class="content">
    <div class="memes">
      <MediaPlayer />
    </div>
    <div class="chat" />
  </div>
</main>

<div class="background">
  {#each Array(4) as _}
    <ConveyorBeltLogo direction="left" />
    <ConveyorBeltLogo direction="right" />
  {/each}
</div>

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
    display: flex
    align-items: center
    justify-content: space-between
    width: 1532px
    margin: 0 auto

    .title
      font-size: 3rem
      font-weight: 800
      letter-spacing: 1px

    .message
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
      background-color: rgba(#fff, .1)
      height: 100%
      width: 450px
      border-radius: .5rem
      backdrop-filter: blur(.5rem)

  .background
    display: flex
    flex-direction: column
    justify-content: center
    width: 100%
    height: 100%
    overflow: hidden
</style>
