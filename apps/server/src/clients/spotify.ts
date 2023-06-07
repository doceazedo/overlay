import SpotifyWebApi from "spotify-web-api-node";
import "dotenv/config";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
  process.env;

const spotifyApi = new SpotifyWebApi();
let lastRefresh = new Date(0);

spotifyApi.setCredentials({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  refreshToken: SPOTIFY_REFRESH_TOKEN,
});

const hasPassedAnHour = (date: Date) => {
  const now = Date.now();
  const time = date.getTime();
  const anHour = 1000 * 60 * 60;
  return now - time > anHour;
};

const refreshAccessToken = async () => {
  if (!hasPassedAnHour(lastRefresh)) return;
  try {
    const spotifyTokens = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(spotifyTokens.body.access_token);
    lastRefresh = new Date();
  } catch (err) {
    console.error("Error while trying to refresh Spotify token:");
    console.error(err);
  }
};

export const getTrack = async (id: string) => {
  await refreshAccessToken();

  try {
    const track = await spotifyApi.getTrack(id);
    if (track.statusCode != 200) return null;
    return track.body;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const queueTrack = async (uri: string) => {
  await refreshAccessToken();

  try {
    await spotifyApi.addToQueue(uri);
    return true;
  } catch (error) {
    return false;
  }
};

export const searchTracks = async (query: string, limit: number) => {
  await refreshAccessToken();

  try {
    const resp = await spotifyApi.searchTracks(query, { limit });
    if (!resp.body.tracks) return null;
    return resp.body.tracks.items;
    return null;
  } catch (error) {
    return null;
  }
};
