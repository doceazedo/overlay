import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const get: RequestHandler = async () => {
  const users = await prisma.user.findMany();

  return {
    body: users,
  };
};
