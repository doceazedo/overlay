<script>
  import { onMount } from 'svelte';

  let nowPlaying = {};
  setInterval(async () => {
    try {
      const song = await(await fetch('/assets/json/song.json')).json();
      if (nowPlaying.title != song.title) nowPlaying = song;
    } catch (e) { }
  }, 250);

  let messages = [];
  const initializeChat = async () => {
    const bttvGlobals = await(await fetch('https://api.betterttv.net/3/cached/emotes/global')).json();
    const bttvChannel = await(await fetch('https://api.betterttv.net/3/cached/users/twitch/98776633')).json();
    const bttvEmotes = [...bttvGlobals, ...bttvChannel.channelEmotes, ...bttvChannel.sharedEmotes];

    const twitchHeaders = new Headers();
    twitchHeaders.append('Authorization', `Bearer ${import.meta.env.VITE_TWITCH_OAUTH_TOKEN}`);
    twitchHeaders.append('Client-Id', import.meta.env.VITE_TWITCH_CLIENT_ID);

    const globalBadges = await(await fetch('https://api.twitch.tv/helix/chat/badges/global', { headers: twitchHeaders })).json();
    globalBadges.data = globalBadges.data.filter(badge => badge.set_id != 'subscriber');
    const channelBadges = await(await fetch(`https://api.twitch.tv/helix/chat/badges?broadcaster_id=${import.meta.env.VITE_TWITCH_CHANNEL_ID}`, { headers: twitchHeaders })).json();
    const twitchBadges = [...globalBadges.data, ...channelBadges.data];
    
    const client = new tmi.Client({
      channels: [ 'doceazedo911' ]
    });
    
    client.connect();
    console.log('Conectado ao chat!');
    
    client.on('message', (channel, tags, message, self) => {
      message = DOMPurify.sanitize(message, { USE_PROFILES: { html: false } });
      console.log(message);

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
      twitchEmotes.forEach(emote => {
        message = message.split(emote.name).join(`<span class="emote"><img src="https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/static/light/1.0"></span>`);
      });

      message.split(' ').forEach(word => {
        const emote = bttvEmotes.find(e => e.code == word);
        if (emote) {
          message = message.split(emote.code).join(`<span class="emote"><img src="https://cdn.betterttv.net/emote/${emote.id}/1x"></span>`);
        }
      });

      const badges = [];
      for (const key in tags.badges) {
        const badgeTypes = twitchBadges.find(b => b.set_id == key);
        console.log(badgeTypes);
        const badge = badgeTypes.versions.find(t => t.id == tags.badges[key]);
        badges.push(badge.image_url_1x);
      }

      messages.unshift({
        content: message,
        author: {
          username: tags.username,
          displayName: tags['display-name'],
          color: tags.color,
          badges
        }
      });
      messages = messages;
    });
  };
  onMount(initializeChat);
</script>

<svelte:head>
	<script src="../../static/assets/js/purify.min.js"></script>
	<script src="../../static/assets/js/tmi.min.js" on:load={initializeChat}></script>
</svelte:head>

<aside>
  <div id="music">
    <img src={nowPlaying.cover} alt="">
    <div>
      <h1>{nowPlaying.title}</h1>
      <h2>{nowPlaying.artist}</h2>
    </div>
  </div>

  <ul id="chat">
    {#each messages as message}
      <li>
        <div class="avatar">
          <div style="background-image:url(/avatar/{message.author.username})"></div>
        </div>
        <div class="content">
          <span class="meta">
            <span class="name" style="color: {message.author.color}">{message.author.displayName}</span>
            {#if message.author.badges}
              <span class="badges">
                {#each message.author.badges as badge}
                  <img src={badge} alt="">
                {/each}
              </span>
            {/if}
          </span>
  
          <span class="message">
            {@html message.content}
          </span>
        </div>
      </li>
    {/each}
  </ul>
</aside>

<style type="text/sass">
  @import '../sass/vars.sass'

  aside
    position: absolute
    bottom: 0
    right: 0
    width: 480px
    height: calc(100% - 270px)
    display: flex
    flex-direction: column
    background-color: #2d2d2d
    padding: 1rem
    color: #fff

    &::before
      content: ''
      position: fixed
      top: 0
      right: 480px
      width: 1px
      height: 100%
      background-color: #202020

    #music
      height: 6rem
      width: 100%
      display: flex
      background-color: #242424
      border-radius: .5rem
      padding: .75rem
      margin-bottom: 1rem

      img
        height: 100%
        border-radius: .5rem
        margin-right: .75rem

      div
        display: flex
        flex-direction: column
        justify-content: center

        h1,
        h2
          max-width: 21rem
          line-height: 1.25
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis

        h1
          font-size: 1.75rem
          font-weight: 700

        h2
          font-size: 1.25rem

    #chat
      position: relative
      flex-grow: 1
      background-color: #242424
      border-radius: .5rem
      padding: .75rem
      overflow: hidden

      &::before
        content: ''
        position: absolute
        bottom: 0
        left: 0
        height: .75rem
        width: 100%
        background-image: linear-gradient(0deg, #242424 25%, rgba(#242424, 0) 100%)

      li
        display: flex
        // animation: slide-in-left .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) forwards

        &:not(:last-child)
          margin-bottom: .75rem

        .avatar
          display: flex
          align-items: flex-end
          margin-right: .75rem

          div
            width: 4rem
            height: 4rem
            border-radius: 50%
            background-color: #191919
            background-position: center
            background-repeat: no-repeat
            background-size: cover

        .content
          display: flex
          flex-direction: column
          padding: .75rem
          font-size: 1.25rem
          border-radius: .5rem
          border-bottom-left-radius: 0
          background-color: #191919

          .meta
            display: flex
            align-items: center
            margin-bottom: .25rem

            .name
              color: #ffd479

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

  @keyframes slide-in-left
    0%
      transform: translateX(-1rem)
      opacity: 0

    100%
      transform: translateX(0)
      opacity: 1
</style>