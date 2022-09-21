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

export const updateUser = async (id: string, body: UserRequest) => {
  const resp = await fetch(`${baseUrl}/users/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
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
