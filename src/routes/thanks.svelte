<script>
  import { onMount } from 'svelte';
  import { tmiClient } from '../utils';
  
  const ignore = [
    'doceazedo911',
    'streamholics',
    'sucodesvelte'
  ];

  let participants = [];
  let expanded = false;

  const nextStream = () => {
    const date = new Date();
    return date.getDay() == 6 && date.getHours() >= 19 ? 'terça' : 'amanhã';
  }

  onMount(() => {
    const client = tmiClient();
    client.connect();

    client.on('message', async (channel, tags) => {
      if (!ignore.includes(tags['display-name']) && !participants.includes(tags['display-name'])) {
        participants = [ ...participants, tags['display-name'] ];
        if (participants.length >= 40) expanded = true;
      }
    });
  });
</script>

<main>
  <h1>Obrigado por assistir!</h1>
  <h2>Até {nextStream()} às 19h30 🥰</h2>

  <ul class:expanded>
    {#each participants.slice(0, 60) as participant, i}
      <li>
        {i >= 59 ? `+ ${participants.length - 59} pessoas...` : participant}
      </li>
    {/each}
  </ul>
</main>

<style lang="sass">
  @import '../sass/vars'

  main
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    height: 100%
    width: 100%
    background-color: #000
    color: #fff

    h1
      font-size: 4rem
      font-weight: 700

    h2
      font-size: 2.75rem
      margin-bottom: 6rem

    ul
      display: grid
      grid-template-columns: repeat(4, 1fr)
      grid-column-gap: 1rem
      grid-row-gap: 3rem
      width: 75%
      font-size: 1.5rem
      text-align: center

      &.expanded
        grid-template-columns: repeat(6, 1fr)
</style>