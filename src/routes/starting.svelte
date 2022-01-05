<script>
  import { onMount } from 'svelte';
  import { tsParticles } from 'tsparticles';
  import { GET } from '../utils';

  const halloween = GET('halloween') ? true : false;
  const christmas = GET('christmas') ? true : false;

  const messages = [
    'Conectando cabos',
    'Abrindo latinha de energético',
    'Colocando câmera no tripé',
    'Dando DELETE sem WHERE',
    'Carregando mensagens',
    '[object Object]',
    'A live começa em NaN segundos',
    'Botando a coquinha pra gelar',
    'Acordando os anões programadores',
    'Enchendo a garrafinha d\'água',
    'Commitando na main',
    '{ status: 200, success: false }',
    'Escolhendo playlist',
    'Ajeitando a coluna',
    'Debugando código',
    'Vazando a senha do banco de dados',
    'Corrigindo erro em produção',
    'Pensando numa mensagem',
    'Erro 404: mensagem não encontrada',
    'Compilando código',
    'Evangelizando a palavra do Svelte',
    'Clonando cartões',
    'Ensaboando os sapos',
    'Tirando fotos do pé',
    'Fabricando devs homossexuais',
    'Treinando com monjes tibetanos',
    'Provando inocência do Celso Portiolli',
    'Quem sabe faz ao vivo',
    'Impedindo macacos de pularem no colchão',
    'Arrumando o bigode'
  ];

  let currentMessage = messages[0],
      translucidBackground = true,
      h2;

  const pickRandomMessage = () => {
    const string = messages[Math.floor(Math.random() * messages.length)];
    if (currentMessage == string) return pickRandomMessage();
    return string;
  }

  const changeMessage = () => {
    if (!h2) return;

    h2.style.transform = 'translateY(-1rem)';
    h2.style.opacity = 0;
    setTimeout(() => {
      currentMessage = pickRandomMessage();
      console.log(currentMessage);
      h2.style.transition = 'unset';
      h2.style.transform = 'translateY(1rem)';

      setTimeout(() => {
        h2.style.transition = null;
        h2.style.transform = null;
        h2.style.opacity = null;
      }, 250);
    }, 200);
  }

  setInterval(changeMessage, 5000);

  onMount(() => {
    tsParticles
      .loadJSON('particles', '/assets/json/particlesjs-config-christmas.json')
      .then((container) => {
        console.log("callback - tsparticles config loaded");
      })
      .catch((error) => {
        console.error(error);
      });
  });
</script>

<div id="particles"></div>

<main class:translucid={translucidBackground} class:halloween class:christmas>
  <div>
    <figure on:click={() => translucidBackground = !translucidBackground}>
      <img src="/assets/img/logo{halloween ? '-halloween' : ''}{christmas ? '-christmas' : ''}.svg" alt="">
    </figure>
    <h1>A live está começando!</h1>
    <h2 bind:this={h2}>{currentMessage}...</h2>
  </div>
  
  <div>
    <lottie-player src="/assets/json/pendulum.json" speed=".5" loop autoplay></lottie-player>
  </div>
</main>

<style type="text/sass">
  @import '../sass/vars.sass'

  main
    display: flex
    justify-content: space-between
    padding: 4rem
    background-color: rgba($primary, .75)
    height: 100%

    &:not(.translucid)
      background-color: $primary

    div
      display: flex

      &:first-child
        flex-direction: column
        justify-content: center

        h1,
        h2
          color: #363636

        h1
          font-size: 5rem
          font-weight: 700
          margin-bottom: .5rem

        h2
          font-size: 3rem
          transition: all .2s ease

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
            background-color: rgba(#363636, .2)
            border-radius: 50%
            filter: blur(.5rem)
            animation: shadow 6s ease-in-out infinite

          img
            height: 12rem
            width: 12rem
            animation: float 6s ease-in-out infinite
        
      &:last-child
        justify-content: center
        align-items: center

        lottie-player
          width: 40rem

    &.halloween
      background-color: rgba(#f97904, .75)

      &:not(.translucid)
        background-color: #f97904

    &.christmas
      background-color: rgba(#2E5A1C, .75)

      &:not(.translucid)
        background-color: #2E5A1C

      h1,
      h2
        color: #FCD47D !important

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

  #particles
    position: absolute
    height: 100%
    width: 100%
    opacity: .5
</style>