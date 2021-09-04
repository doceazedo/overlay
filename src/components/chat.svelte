<script>
  import simpleIcons from 'simple-icons';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { emotes } from '../stores';
  import { bot } from '../bot';
  import { TWITCH_OAUTH_TOKEN, TWITCH_CLIENT_ID, TWITCH_CHANNEL_ID, TWITCH_BOT_LOGIN, TWITCH_BOT_OAUTH_TOKEN } from '../env';

  let chatEl;
  let messages = [];

  const initializeChat = async () => {
    const bttvGlobals = await(await fetch('https://api.betterttv.net/3/cached/emotes/global')).json();
    const bttvChannel = await(await fetch('https://api.betterttv.net/3/cached/users/twitch/98776633')).json();
    const bttvEmotes = [...bttvGlobals, ...bttvChannel.channelEmotes, ...bttvChannel.sharedEmotes];

    const twitchHeaders = new Headers();
    twitchHeaders.append('Authorization', `Bearer ${TWITCH_OAUTH_TOKEN}`);
    twitchHeaders.append('Client-Id', TWITCH_CLIENT_ID);

    const globalBadges = await(await fetch('https://api.twitch.tv/helix/chat/badges/global', { headers: twitchHeaders })).json();
    globalBadges.data = globalBadges.data.filter(badge => badge.set_id != 'subscriber');
    const channelBadges = await(await fetch(`https://api.twitch.tv/helix/chat/badges?broadcaster_id=${TWITCH_CHANNEL_ID}`, { headers: twitchHeaders })).json();
    const twitchBadges = [...globalBadges.data, ...channelBadges.data];
    
    const client = new tmi.Client({
      identity: {
        username: TWITCH_BOT_LOGIN,
        password: `oauth:${TWITCH_BOT_OAUTH_TOKEN}`
      },
      channels: [ 'doceazedo911' ]
    });
    
    client.connect();
    console.log('Conectado ao chat!');
    bot(client);
    
    client.on('message', async (channel, tags, message, self) => {
      const twitchEmotes = [];
      for (const emoteID in tags.emotes) {
        const pos = tags.emotes[emoteID][0].split('-');
        const start = parseInt(pos[0]);
        const end = parseInt(pos[1]) - start + 1;
    
        twitchEmotes.push({
          id: emoteID,
          name: message.substr(start, end)
        });
      }

      const emotesURLs = [];

      message = message.split(' '); // FIXME: não funciona para caso o código do emote esteja colado em "!", "," nem "."
      message.forEach((word, i) => {
        const bttvEmote = bttvEmotes.find(e => e.code == word);
        if (bttvEmote) {
          const url = `https://cdn.betterttv.net/emote/${bttvEmote.id}/1x`;
          emotesURLs.push(url);
          return message[i] = { emote: url };
        }
        
        const twitchEmote = twitchEmotes.find(e => e.name == word);
        if (twitchEmote) {
          const url = `https://static-cdn.jtvnw.net/emoticons/v2/${twitchEmote.id}/static/light/1.0`;
          emotesURLs.push(url);
          return message[i] = { emote: url };
        }

        message[i] = { word };
      });

      emotes.set(emotesURLs);

      let badges = [];
      for (const key in tags.badges) {
        const badgeTypes = twitchBadges.find(b => b.set_id == key);
        const badge = badgeTypes.versions.find(t => t.id == tags.badges[key]);
        badges.push(badge.image_url_1x);
      }
      if (self) badges = [ '/assets/img/bot-badge.png' ];

      const bot = await(await fetch(`/users/${tags['user-id']}`)).json();

      messages.push({
        content: message,
        author: {
          username: tags.username,
          displayName: tags['display-name'],
          color: tags.color,
          badges,
          self
        },
        bot: bot.user
      });
      messages = messages;

      setTimeout(() => chatEl.scrollTo(0, chatEl.scrollHeight), 50);
    });
  };
  onMount(initializeChat);

  const fadeInAvatar = event => {
    event.target.classList.add('show');
  }
</script>

<svelte:head>
  <script src="/assets/js/tmi.min.js"></script>
</svelte:head>

<ul id="chat" bind:this={chatEl}>
  {#each messages as message}
    <li in:fly={{ x: -16, duration: 500 }} class:self={message.author.self}>
      <div class="avatar">
        <div>
          <img on:load={fadeInAvatar} src="/avatar/{message.author.username}" alt="">
        </div>
      </div>
      <div class="content">
        <span class="meta">
          <span class="name" style="color: {message.author.color}">{message.author.displayName}</span>

          {#if message.bot?.pronouns}
            <span class="pronouns">{message.bot.pronouns}</span>
          {/if}

          {#if message.bot?.team}
            <span class="team" style="fill: #{simpleIcons.Get(message.bot.team).hex}">
              {@html simpleIcons.Get(message.bot.team).svg}
            </span>
          {/if}

          {#if message.author.badges.length}
            <span class="badges">
              {#each message.author.badges as badge}
                <img src={badge} alt="">
              {/each}
            </span>
          {/if}
        </span>

        <span class="message">
          {#each message.content as word}
            {#if word.emote}
              <span class="emote">
                <img src={word.emote} alt="">
              </span>
            {:else}
              {` ${word.word} `}
            {/if}
          {/each}
        </span>
      </div>
    </li>
  {/each}
</ul>

<style type="text/sass">
  #chat
    position: relative
    flex-grow: 1
    background-color: #242424
    border-radius: .5rem
    padding: .75rem
    overflow: hidden

    li
      display: flex

      &:not(:last-child)
        margin-bottom: .75rem

      .avatar
        display: flex
        align-items: flex-end
        margin-right: 1rem

        div
          height: 3rem
          width: 3rem
          border-radius: 50%
          background-color: #191919

          img
            height: 100%
            width: 100%
            border-radius: 50%
            transition: all .2s ease

            &:not(.show)
              opacity: 0

      &.self .name
        color: #ff0000 !important
        text-shadow: 0 0 5px #ff0000
        background-image: url('/assets/img/glitter.gif')

      .content
        position: relative
        display: flex
        flex-direction: column
        padding: .5rem
        border-radius: .5rem
        border-bottom-left-radius: 0
        background-color: #191919

        &::before
          content: ''
          position: absolute
          left: -.7rem
          bottom: 0
          height: 1rem
          width: .75rem
          background-image: url('/assets/img/chat-bubble.svg')
          background-position: center right
          background-repeat: no-repeat
          background-size: contain

        .meta
          display: flex
          align-items: center

          .name
            color: #ffd479

          .pronouns
            margin-left: 0.25rem
            font-style: italic
            color: rgba(#fff, .75)
            font-size: .75rem

          .team
            display: inline-flex
            padding: .35rem
            margin-left: .5rem
            border-radius: .5rem
            background-color: #242424

          .badges
            display: inline-flex
            padding: .35rem
            margin-left: .5rem
            border-radius: .5rem
            background-color: #242424

            img:not(:last-child)
              margin-right: .35rem

        .message
          line-height: 1.5
</style>