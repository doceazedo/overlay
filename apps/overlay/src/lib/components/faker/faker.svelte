<script lang="ts">
  import { parseEmotes } from 'emotettv';
  import { browser } from '$app/environment';
  import { CHANNEL_ID, CHANNEL_NAME } from '$lib/env';
  import { sleep } from '$lib/utils';
  import { chatMessageListener, socket } from '$lib/modules';
  import { IDENTITIES } from './identities';

  let active = false;

  socket.on('cmd:faker', async () => {
    if (!browser) return;

    document.body.classList.add('faker');

    sendMessage(IDENTITIES.pinkcodes, 'sim eu também adoro svelte!');
    sendMessage(IDENTITIES.criativaria, 'oiiii doceeee');
    sendMessage(IDENTITIES.caroliscaroles, 'entendi NOTED');
    sendMessage(IDENTITIES.eriicknathan, 'boi a noite 🐂');
    sendMessage(
      IDENTITIES.leozinho_levadinho,
      '!tts doce doce doce a vida é um doce doce doce kumaPls',
    );

    // CLIP STARTS HERE
    await sleep(3000);
    active = true;

    sendMessage(IDENTITIES.amandamartinsdev, '!sr love tonight');
    await sleep(250);
    sendMessage(
      IDENTITIES.sucodesvelte,
      '@amandamartinsdev, Shouse - Love Tonight foi enfileirado 🕺 🪩 Use !remover para remover da fila gopherPls',
    );
    await sleep(1500);
    sendMessage(IDENTITIES.lucasmellof1, 'catJAM catJAM catJAM catJAM');
    await sleep(2500);
    sendMessage(IDENTITIES.moovhe4rt, '🔫');
    await sleep(1000);
    sendMessage(IDENTITIES.sudocomfy, 'Boa noite! Amimir');
    await sleep(250);
    sendMessage(IDENTITIES.dytobrj81, 'boa noite advogado da monique.');

    await sleep(5000);
    document.body.classList.remove('faker');
    active = false;
  });

  const sendMessage = async (tags: any, message: string) => {
    if (!browser) return;

    const parsedMessage = await parseEmotes(message, null, {
      channelId: CHANNEL_ID,
    });
    const words = parsedMessage.toWords();

    chatMessageListener.set({
      channel: `#${CHANNEL_NAME}`,
      tags,
      message,
      self: false,
      words,
    });
  };
</script>

{#if active}
  <video autoplay muted loop>
    <source src="assets/video/facecam-wave.mov" type="video/mp4" />
  </video>
{/if}

<style lang="sass">
  video
    position: absolute
    top: 14px
    right: 14px
    width: 480px
    aspect-ratio: 16/9
    margin-bottom: 24px
    border-radius: 24px
</style>
