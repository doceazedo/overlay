<script lang="ts">
  import { createId } from '@paralleldrive/cuid2';
  import createDOMPurify from 'dompurify';
  import { marked } from 'marked';
  import { browser } from '$app/environment';
  import { getUser } from '$lib/clients/users';
  import { ChatMessage, chatMessageListener, getBadges, getTeam } from '.';
  import type { ChatTheme, MessageAuthor, Message } from '.';

  export let theme: ChatTheme = 'dark';
  export let ttl = 0;

  let messages: Message[] = [];

  chatMessageListener.subscribe(async (message) => {
    if (!browser || !message) return;

    const DOMPurify = createDOMPurify(window);

    const id = message.tags['user-id'];
    if (!id) return;

    const user = await getUser(id);
    const team = getTeam(user.team);
    const badges = await getBadges(message.tags.badges);

    const author: MessageAuthor = {
      id,
      team,
      pronouns: user?.pronouns,
      avatar: user?.avatar,
      username: message.tags.username || 'unknownuser',
      displayName: message.tags['display-name'] || 'unknownuser',
      color: message.tags?.color,
      badges,
      self: message.self,
    };

    const words = message.parsedMessage.toWords();

    const emojiOnly = words.filter((word) => !!word.emote).length == words.length;
    const jumbomoji = emojiOnly && words.length <= 24;
    const singleEmoji = emojiOnly && words.length == 1;
    const emojiSize = singleEmoji ? 2 : jumbomoji ? 1 : 0;

    const hasChatExtras = message.tags.subscriber || message.tags.mod || false;

    const htmlMessage = message.parsedMessage
      .toHtml(emojiSize)
      .replaceAll('alt=', 'class="emote" alt='); // FIXME: should be handled by emotettv
    const parsedMarkdown = hasChatExtras ? marked.parse(htmlMessage) : htmlMessage;
    const parsedHTML = DOMPurify.sanitize(parsedMarkdown,
      hasChatExtras ? {} : { ALLOWED_TAGS: []
    });

    const messageId = createId();
    messages.push({
      id: messageId,
      content: parsedHTML,
      author,
    });
    messages = messages;

    if (ttl) setTimeout(() => {
      messages = messages.filter(message => message.id != messageId);
    }, ttl);
  });
</script>

{#each messages as message (message.id)}
  <ChatMessage {message} {theme} />
{/each}
