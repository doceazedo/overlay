import type { HelixBroadcasterType, HelixUserType } from '@twurple/api';

type UserData = {
	id: string;
	name: string;
	displayName: string;
	description: string;
	type: HelixUserType;
	broadcasterType: HelixBroadcasterType;
	profilePictureUrl: string;
	offlinePlaceholderUrl: string;
	creationDate: Date;
};

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			twitchBroadcasterUser?: UserData;
			twitchBotUser?: UserData;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
