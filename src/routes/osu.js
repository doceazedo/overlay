export async function get() {
  const baseUrl = 'http://localhost:2626';
  const [song, z, x] = await Promise.all([
    await(await fetch(`${baseUrl}/osuSong.txt`)).text(),
    await(await fetch(`${baseUrl}/z.txt`)).text(),
    await(await fetch(`${baseUrl}/x.txt`)).text(),
  ]);
  const pp = song.split(';;')[4];

  return {
    body: {
      pp, z, x
    }
  }
}