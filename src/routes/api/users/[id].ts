import pkg from '@prisma/client';
import { getTwitchUser } from '$lib/services/twitch';
import type { RequestHandler } from '@sveltejs/kit';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const get: RequestHandler = async ({ params }) => {
  const { id } = params;

  const twitchUser = await getTwitchUser(id);
  const avatar = twitchUser.profile_image_url;

  const user = await prisma.user.upsert({
    where: { id },
    create: { id },
    update: {},
  });

  return {
    body: { ...user, avatar },
  };
};

export const post: RequestHandler = async ({ params, request }) => {
  const { id } = params;
  const data = await request.json();

  const user = await prisma.user.upsert({
    where: { id },
    create: { id, ...data },
    update: data,
  });

  return {
    body: {
      user,
    },
  };
};
