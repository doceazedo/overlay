<script>
  import { Cards } from '../../components';

  let cards = ['', '', ''];
  
  setInterval(async () => {
    const data = await(await fetch('/osu')).json();
    cards = [`[Z] ${data?.z}`, `[X] ${data?.x}`, `${data?.pp}pp`];
  }, 100);
</script>

<Cards {cards} />