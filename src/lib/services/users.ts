import type { User } from '@prisma/client';

type UserRequest = {
  pronouns?: string;
  team?: string;
  messages?: number;
};

type UserResponse = User & {
  avatar: string;
};

const baseUrl = '/api';

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

// Melhor fazer isso no back pra salvar uma requisição
export const incrementUserMessages = async (id: string) => {
  const user = await getUser(id);
  const updatedUser = await updateUser(id, {
    messages: user.messages + 1,
  });
  return updatedUser;
};
