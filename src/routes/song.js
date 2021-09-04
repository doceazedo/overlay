import fs from 'fs';

export async function get() {
  const body = fs.readFileSync('./static/assets/json/song.json', 'utf8');

  return {
    body
  }
}