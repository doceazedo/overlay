<script>
  let chatEl;
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

      message = message.split(' '); // FIXME: não funciona para caso o código do emote esteja colado em "!", "," nem "."
      message.forEach((word, i) => {
        const bttvEmote = bttvEmotes.find(e => e.code == word);
        if (bttvEmote) return message[i] = { emote: `https://cdn.betterttv.net/emote/${bttvEmote.id}/1x` };
        
        const twitchEmote = twitchEmotes.find(e => e.name == word);
        if (twitchEmote) return message[i] = { emote: `https://static-cdn.jtvnw.net/emoticons/v2/${twitchEmote.id}/static/light/1.0` };

        message[i] = { word };
      });

      const badges = [];
      for (const key in tags.badges) {
        const badgeTypes = twitchBadges.find(b => b.set_id == key);
        const badge = badgeTypes.versions.find(t => t.id == tags.badges[key]);
        badges.push(badge.image_url_1x);
      }

      messages.push({
        content: message,
        author: {
          username: tags.username,
          displayName: tags['display-name'],
          color: tags.color,
          badges
        }
      });
      messages = messages;

      setTimeout(() => chatEl.scrollTo(0, chatEl.scrollHeight), 50);
    });
  };

  const fadeInAvatar = event => {
    event.target.classList.add('show');
  }
</script>

<svelte:head>
  <script src="../../static/assets/js/tmi.min.js" on:load={initializeChat}></script>
</svelte:head>

<ul id="chat" bind:this={chatEl}>
  {#each messages as message}
    <li>
      <div class="avatar">
        <div>
          <img on:load={fadeInAvatar} src="/avatar/{message.author.username}" alt="">
        </div>
      </div>
      <div class="content">
        <span class="meta">
          <span class="name" style="color: {message.author.color}">{message.author.displayName}</span>
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
      animation: slide-in-left .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) forwards

      &:not(:last-child)
        margin-bottom: .75rem

      .avatar
        display: flex
        align-items: flex-end
        margin-right: .75rem

        div
          height: 4rem
          width: 4rem
          border-radius: 50%
          background-color: #191919

          img
            height: 100%
            width: 100%
            border-radius: 50%
            transition: all .2s ease

            &:not(.show)
              opacity: 0

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