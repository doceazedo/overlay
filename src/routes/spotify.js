import axios from 'axios';
import 'dotenv/config';

export async function get() {
  const spotifyToken = process.env['SPOTIFY_TOKEN'];

  const resp = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${spotifyToken}`
    }
  });

  if (!resp.data?.item) return {
    body: {
      title: 'Nada tocando :(',
      artist: '',
      cover: '../assets/img/cover-fallback.jpg',
    }
  }

  const item = resp.data.item;

  return {
    body: {
      title: item.name,
      artist: item.artists[0].name,
      cover: item.album.images[1].url,
    }
  }
}