import fetch from 'cross-fetch';
import 'dotenv/config';
import type {
  CurrentlyPlayingDetailsResponse,
  FollowsResponse,
  UserRequest,
  UserResponse,
} from './overlay.types';

const { API_BASEURL: baseUrl } = process.env;

export const getCurrentlyPlayingDetails = async () => {
  const resp = await fetch(`${baseUrl}/song?details`);
  const data: CurrentlyPlayingDetailsResponse = await resp.json();
  return data;
};

export const getUser = async (id: string) => {
  try {
    const resp = await fetch(`${baseUrl}/users/${id}`);
    const data: UserResponse = await resp.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const updateUser = async (id: string, req: UserRequest) => {
  const resp = await fetch(`${baseUrl}/users/${id}`, {
    method: 'POST',
    body: JSON.stringify(req),
  });
  const data: UserResponse = await resp.json();
  return data;
};

export const incrementUserMessages = async (id: string) => {
  const user = await getUser(id);
  const updatedUser = await updateUser(id, {
    messages: (user?.messages || 0) + 1,
  });
  return updatedUser;
};

export const getFollows = async (id: string) => {
  try {
    const resp = await fetch(`${baseUrl}/users/${id}/followage`);
    const data: FollowsResponse = await resp.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const queueSong = async (uri: string) => {
  try {
    const resp = await fetch(`${baseUrl}/queue`, {
      method: 'POST',
      body: JSON.stringify({ uri })
    });
    const data = await resp.json();
    return data.track as SpotifyApi.SingleTrackResponse | null;
  } catch (error) {
    return null;
  }
};

export const searchSong = async (query: string) => {
  try {
    const resp = await fetch(`${baseUrl}/song/search?query=${query}`);
    const data = await resp.json();
    return data.track as SpotifyApi.SingleTrackResponse | null;
  } catch (error) {
    return null;
  }
};
