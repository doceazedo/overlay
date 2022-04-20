import { browser } from '$app/env';

export type CurrentlyPlayingResponse = {
  title: string;
  artist: string;
  cover: string;
};

export type CurrentlyPlayingDetailsResponse = {
  song: {
    title: string;
    cover: string;
    id: string;
  };
  artist: {
    name: string;
    image: string;
  };
};

const baseUrl = '/api';

export const getCurrentlyPlaying = async () => {
  if (!browser) return;

  const resp = await fetch(`${baseUrl}/song`);
  const data: CurrentlyPlayingResponse = await resp.json();
  return data;
};

export const getCurrentlyPlayingDetails = async () => {
  if (!browser) return;

  const resp = await fetch(`${baseUrl}/song?details`);
  const data: CurrentlyPlayingDetailsResponse = await resp.json();
  return data;
};
