import { probe } from '@network-utils/tcp-ping';

export async function get() {
  const isAlive = await probe(25565, '127.0.0.1', 500)

  return {
    body: {
      isAlive
    }
  }
}