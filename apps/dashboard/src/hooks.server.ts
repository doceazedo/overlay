import { twurple } from '$lib/clients/twurple';

export const handle = async ({ event, resolve }) => {
	const twitchBroadcasterId = event.cookies.get('twitch_broadcaster_id');
	const twitchBotId = event.cookies.get('twitch_bot_id');

	const userIds = [twitchBroadcasterId, twitchBotId].filter((x) => x != null) as string[];
	const users = userIds.length ? await twurple.users.getUsersByIds(userIds) : [];

	console.log({ users });

	users.forEach((user) => {
		const userData = {
			id: user.id,
			name: user.name,
			displayName: user.displayName,
			description: user.description,
			type: user.type,
			broadcasterType: user.broadcasterType,
			profilePictureUrl: user.profilePictureUrl,
			offlinePlaceholderUrl: user.offlinePlaceholderUrl,
			creationDate: user.creationDate
		};

		if (user.id == twitchBroadcasterId) event.locals.twitchBroadcasterUser = userData;
		if (user.id == twitchBotId) event.locals.twitchBotUser = userData;
	});

	return await resolve(event);
};
