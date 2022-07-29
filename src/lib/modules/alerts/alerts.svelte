<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { socket } from '$lib/modules';
  import { throwConfetti } from '$lib/modules/confetti';
  import { Alert } from '$lib/components/alert';
  import type { AlertData } from '$lib/components/alert';
  import { getUser } from '$lib/clients/users';
  import { browser } from '$app/env';

  let showAlert = false;

  let alertsQueue: AlertData[] = [];

  const defaultAlert: AlertData = {
    title: '',
    detailsTile: '',
    description: '',
    message: '',
    iconDuration: 1700,
    duration: 5000,
  };

  const addAlertToQueue = async (data: Partial<AlertData>) => {
    if (!browser) return;
    if (data.displayName.startsWith('test')) data.displayName = 'sucodesvelte';
    const user = await getUser(data.displayName);
    alertsQueue.push({
      id: uuidv4(),
      avatar: user.avatar,
      ...defaultAlert,
      ...data,
    });
    if (alertsQueue.length == 1) showNextAlert(false);
  };

  const showNextAlert = (shift = true) => {
    console.log(alertsQueue);
    if (shift) alertsQueue.shift();
    if (alertsQueue.length == 0) return;
    alertsQueue = alertsQueue;
    showAlert = true;
  };

  socket.on('event:raid', () => throwConfetti(15000));

  // socket.on('event:follow', (data) => addAlertToQueue(data));
</script>

{#if showAlert}
  {#key alertsQueue[0].id}
    <Alert bind:showAlert data={alertsQueue[0]} {showNextAlert} />
  {/key}
{/if}
