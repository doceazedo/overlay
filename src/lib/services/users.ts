import type { User } from '@prisma/client';

export type UserRequest = {
  pronouns?: string;
  team?: string;
  messages?: number;
};

export type UserResponse = User & {
  id: string;
  displayName: string;
  avatar: string;
  messages: string;
  createdAt: Date;
  updatedAt: Date;
};

const baseUrl = '/api';

// TODO: guardar usuários
// TODO: só puxar info da twitch, quando ainda nao tiver avatar
//       ex: caso ainda não tenha, passar "?avatar"

export const getUser = async (id: string) => {
  const resp = await fetch(`${baseUrl}/users/${id}`);
  const data: UserResponse = await resp.json();
  return data;
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
