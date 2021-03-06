import SpotifyWebApi from 'spotify-web-api-node';
import { hasPassedAnHour } from '$lib/utils';
import 'dotenv/config';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
  process.env;

const spotifyApi = new SpotifyWebApi();
let lastRefresh = new Date(0);

spotifyApi.setCredentials({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  refreshToken: SPOTIFY_REFRESH_TOKEN,
});

const refreshAccessToken = async () => {
  if (!hasPassedAnHour(lastRefresh)) return;

  try {
    const spotifyTokens = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(spotifyTokens.body.access_token);
    lastRefresh = new Date();
  } catch (err) {
    console.error('Error while trying to refresh Spotify token:');
    console.error(err);
  }
};

export const getCurrentPlayingTrack = async () => {
  await refreshAccessToken();

  try {
    const currentlyPlaying = await spotifyApi.getMyCurrentPlayingTrack();
    if (!('artists' in currentlyPlaying.body?.item)) return null;
    return currentlyPlaying.body?.item;
  } catch (error) {
    return null;
  }
};

export const getArtist = async (id: string) => {
  await refreshAccessToken();

  try {
    const artist = await spotifyApi.getArtist(id);
    return artist.body;
  } catch (error) {
    return null;
  }
};
