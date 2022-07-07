<script lang="ts">
  import { onMount } from 'svelte';
  import { socket } from '$lib/modules';
  import { throwConfetti } from '$lib/modules/confetti';
  import { Alert } from '$lib/components';

  let showAlert = false;
  let title = '';
  let detailsTile = '';
  let description = '';
  let message = '';
  let iconDuration = 1700;
  let duration = 5000;

  const handleFollowEvent = async () => {
    title = 'Novo follow!';
    detailsTile = 'DoceAzedo';
    description = 'Muito obrigado por me seguir :)';
    message = '';
    showAlert = true;
  };

  socket.on('event:raid', () => throwConfetti(15000));
  socket.on('event:follow', handleFollowEvent);

  // onMount(handleFollowEvent);
</script>

{#if showAlert}
  <Alert
    bind:showAlert
    {title}
    {detailsTile}
    {description}
    {message}
    {iconDuration}
    {duration}
  />
  <!-- TODO: two way binding showAlert, so i can know its done -->
{/if}
