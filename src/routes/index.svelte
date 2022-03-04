<script lang="ts">
  import { Alerts, Confetti, Shoutout, Sidebar } from '$lib/modules';
  import { onMount } from 'svelte';
  import { getUser } from '$lib/services/users';

  onMount(async () => {
    console.log(await getUser('98776633'));
  });
</script>

<Alerts />
<Confetti />
<Shoutout />
<Sidebar />
