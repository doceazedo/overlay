import { json as json$1 } from '@sveltejs/kit';
import pkg from '@prisma/client';
import { getTwitchUser } from '$lib/clients/twitch';
import type { RequestHandler } from '@sveltejs/kit';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ params }) => {
  let { id } = params;
  const useLogin = isNaN(parseInt(id));

  const twitchUser = await getTwitchUser(id, useLogin);
  const avatar = twitchUser.profile_image_url;
  const displayName = twitchUser.display_name;

  id = useLogin ? twitchUser.id : id;

  const user = await prisma.user.upsert({
    where: { id },
    create: { id },
    update: {},
  });

  return json$1({ ...user, avatar, displayName });
};

export const POST: RequestHandler = async ({ params, request }) => {
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
