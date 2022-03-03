<script lang="ts">
  import '../sass/global.sass';
  import { Alerts, Confetti, Shoutout, Sidebar } from '$lib/modules';
  import { onMount } from 'svelte';
  import { getUser } from '$lib/services/api';

  onMount(async () => {
    console.log(await getUser('98776633'));
  });
</script>

<Alerts />
<Confetti />
<Shoutout />
<Sidebar />
