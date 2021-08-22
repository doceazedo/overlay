<script>
  import { onMount } from 'svelte';
  import { tsParticles } from 'tsparticles';

  onMount(() => {
    tsParticles
      .loadJSON('particles', '/assets/json/particlesjs-config.json')
      .then((container) => {
          console.log("callback - tsparticles config loaded");
      })
      .catch((error) => {
          console.error(error);
      });
  });
</script>

<div id="particles"></div>

<main>
  <figure>
    <img src="/assets/img/logo.svg" alt="">
  </figure>
  <h1>Só um minuto, já volto!</h1>
</main>

<style type="text/sass">
  @import '../sass/vars.sass'

  #particles
    height: 100%
    width: 100%
    background-color: rgba($primary, .75)

  main
    position: absolute
    top: 0
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    padding: 4rem
    height: 100%
    width: 100%

    h1
      color: #363636
      font-size: 5rem
      font-weight: 700
      text-shadow: 0 0 .5rem rgba($primary, .25)

    figure
      position: relative
      height: 12rem
      width: 12rem
      margin-bottom: 4rem

      &::before
        content: ''
        position: absolute
        bottom: -1rem
        left: 0
        width: 100%
        height: 1rem
        background-color: rgba(#363636, .1)
        border-radius: 50%
        filter: blur(.5rem)
        animation: shadow 6s ease-in-out infinite

      &::after
        content: ''
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: rgba($primary, .25)
        border-radius: 25%
        filter: blur(1rem)
        transform: translateY(-1rem) rotate(45deg) scale(.75)

      img
        position: relative
        z-index: 1
        height: 12rem
        width: 12rem
        animation: float 6s ease-in-out infinite

  :global(body)
    // background-image: url('/assets/img/webcam-placeholder.png')
    background-position: center
    background-repeat: no-repeat
    background-size: cover

  @keyframes float
    0%
      transform: translatey(0px)

    50%
      transform: translatey(-1.5rem)

    100%
      transform: translatey(0px)
</style>