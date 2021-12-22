<script>
  import { browser } from '$app/env';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { showConfetti } from '../stores';

  const alertsQueue = [];
  let alert = {
    avatar: '',
    type: '',
    title: '',
    message: '',
    timeout: 0,
    volume: 1
  };
  let hasActiveAlert = false;
  export let alertsWS, mute = false;

  const nextAlert = () => {
    alert = alertsQueue[0];
    hasActiveAlert = true;

    if (!mute) {
      const alertAudio = new Audio(`/assets/audio/alert-${alert.type}.mp3`);
      alertAudio.volume = alert.volume;
      alertAudio.play();
    }

    setTimeout(() => {
      hasActiveAlert = false;
      setTimeout(() => {
        alertsQueue.shift();
        if (alertsQueue.length) nextAlert();
      }, 1000);
    }, alert.timeout);
  };

  const fadeInAvatar = event => event.target.classList.add('show');

  onMount(() => {
    if (!browser) return;

    alertsWS = alertsWS();
    alertsWS.on('event', async data => {
      const alertInfo = data.message[0];
      let title, message, timeout = 5000, volume = 1;

      if (!['follow', 'subscription', 'donation', 'raid', 'bits'].includes(data.type)) return;

      console.log(data);

      const userData = await(await fetch(`/users/${alertInfo.name || alertInfo.from}`)).json();

      switch (data.type) {
        case 'follow':
          title = `<b>${alertInfo.name}</b> te seguiu!`;
          volume = .3;
          break;
        case 'subscription':
          if (alertInfo.streak_months) {
            title = `<b>${alertInfo.name}</b> se reinscreveu por ${alertInfo.count} ${alertInfo.count == 1 ? 'mês' : 'meses'}!`;
            message = `Agora já são ${alertInfo.streak_months} meses!`;
            if (alertInfo.message) message += ` – "${alertInfo.message}"`;
          } else {
            title = `<b>${alertInfo.name}</b> se inscreveu por ${alertInfo.months} ${alertInfo.months == 1 ? 'mês' : 'meses'}!`;
          }
          timeout = 10000;
          volume = .4;
          break;
        case 'donation':
          title = `<b>${alertInfo.from}</b> doou ${alertInfo.formatted_amount}!`;
          if (alertInfo.message) message = `"${alertInfo.message}"`;
          timeout = 10000;
          volume = .4;
          break;
        case 'raid':
          title  = `<b>${alertInfo.name}</b> está fazendo uma raid!`;
          message = `${alertInfo.raiders} pessoas vieram no grupo!`;
          timeout = 10000;
          volume = .2;

          $showConfetti = true;
          setTimeout(() => $showConfetti = false, 10000);
          break;
        case 'bits':
          title = `<b>${alertInfo.name}</b> mandou ${alertInfo.amount} bits!`;
          volume = .75;
          break;
      }

      alertsQueue.push({
        avatar: userData.user.avatar,
        type: data.type,
        title,
        message,
        timeout,
        volume,
      });

      if (alertsQueue.length == 1) nextAlert();
    });
  });
</script>

{#if hasActiveAlert}
  <div class="alert" class:no-message={!alert.message} transition:fly={{duration: 800, y: -128, opacity: 0, easing: quintOut}}>
    <div class="avatar-wrapper">
      <div class="avatar">
        <img on:load={fadeInAvatar} src={alert.avatar} alt="">
      </div>
    </div>
    <div class="message">
      <h1>{@html alert.title}</h1>
      {#if alert.message}
        <p>{alert.message}</p>
      {/if}
    </div>
  </div>
{/if}

<style type="text/sass">
  .alert
    display: flex
    justify-content: center
    background-color: #2d2d2d
    width: 600px
    padding: 1rem
    border-radius: .5rem
    color: #fff

    &.no-message
      align-items: center

      p
        display: none

    .avatar-wrapper .avatar
      height: 4rem
      width: 4rem
      margin-right: 1rem
      border-radius: 50%
      background-color: #191919
      overflow: hidden

      img
        transition: all .2s ease

        &:not(.show)
          opacity: 0

    .message
      display: flex
      flex-direction: column
      justify-content: center

      h1
        font-size: 1.5rem

        //:global(b)
        //  color: #ffd479

      p
        margin-top: .5rem
</style>