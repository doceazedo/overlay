import { loggr } from '../../utils';
import type { ChatClient } from '@twurple/chat';

export const announcementEvent = (chatClient: ChatClient, userId: string) =>
  chatClient.onAnnouncement((channel, user, info, msg) => {
    loggr.info(`Announcement: ${msg}`);
  });
