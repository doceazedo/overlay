import SpotifyWebApi from 'spotify-web-api-node';
import 'dotenv/config';

export async function get({ query }) {
  const refreshToken = process.env['SPOTIFY_REFRESH_TOKEN'];
  const clientId = process.env['SPOTIFY_CLIENT_ID'];
  const clientSecret = process.env['SPOTIFY_CLIENT_SECRET'];

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setCredentials({
    refreshToken,
    clientId,
    clientSecret,
  });

  // TODO: Cachear access token
  const spotifyTokens = await spotifyApi.refreshAccessToken();
  spotifyApi.setAccessToken(spotifyTokens.body.access_token);

  const currentlyPlaying = await spotifyApi.getMyCurrentPlayingTrack();

  if (!currentlyPlaying.body?.item) return {
    body: {
      title: 'Nada tocando :(',
      artist: '',
      cover: '../assets/img/cover-fallback.jpg',
    }
  }

  const item = currentlyPlaying.body.item;

  if (query.get('details') != null) {
    const artist = await spotifyApi.getArtist(item.artists[0].id);

    return {
      body: {
        song: {
          title: item.name,
          cover: item.album.images[1].url,
          id: item.id
        },
        artist: {
          name: artist.body.name,
          image: artist.body.images[0].url
        }
      }
    }
  }

  return {
    body: {
      title: item.name,
      artist: item.artists[0].name,
      cover: item.album.images[1].url,
    }
  }
}