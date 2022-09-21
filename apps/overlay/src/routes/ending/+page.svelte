<script>
  import { chatMessageListener } from '$lib/modules/chat';

  const lastStreamDay = 4; // quinta
  const firstStreamDay = 'terça';
  const streamStartTime = '19h30';

  const ignore = ['doceazedo911', 'streamholics', 'sucodesvelte'];

  let participants = [];
  let expanded = false;

  const nextStream = () => {
    const date = new Date();
    return date.getDay() == lastStreamDay && date.getHours() >= 19
      ? firstStreamDay
      : 'amanhã';
  };
  const nextStremDay = nextStream();

  chatMessageListener.subscribe((message) => {
    if (message == null) return;

    const author = message.tags['display-name'];
    if (ignore.includes(author) || participants.includes(author)) return;

    participants = [...participants, author];
    if (participants.length >= 40) expanded = true;
  });
</script>

<main>
  <h1>Obrigado por assistir!</h1>
  <h2>Até {nextStremDay} às {streamStartTime} 🥰</h2>

  <ul class:expanded>
    {#each participants.slice(0, 60) as participant, i}
      <li>
        {i >= 59 ? `+ ${participants.length - 59} pessoas...` : participant}
      </li>
    {/each}
  </ul>
</main>

<style lang="sass">
  main
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    height: 100%
    width: 100%

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
