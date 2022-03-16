<script lang="ts">
  import { Alerts, EmoteWall, Confetti, Shoutout, Sidebar } from '$lib/modules';
  import { streamlabsAlertListener } from '$lib/modules/streamlabs';
  import { onMount } from 'svelte';

  onMount(() => {
    streamlabsAlertListener.subscribe((_) => ({}));
  });
</script>

<Alerts />
<Confetti />
<Shoutout />
<Sidebar />
<EmoteWall />
