import fetch from 'cross-fetch';
import 'dotenv/config';
import type {
  FollowsResponse,
  UserRequest,
  UserResponse,
} from './overlay.types';

const { API_BASEURL: baseUrl } = process.env;

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
