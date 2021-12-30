import SpotifyWebApi from 'spotify-web-api-node';
import 'dotenv/config';

export async function get({ query }) {
  if (query.get('osu') != null) {
    let data = await(await fetch('http://localhost:2626/osuSong.txt')).text();
    data = data.split(';;');
    const beatmap = {
      title: data[0],
      artist: `${data[1]}`,
      cover: `http://localhost:20727/backgroundImage?width=600&height=600&crop=1&ts=${Date.now()}`,
      suffix: data[2],
      dl: data[3],
      pp: data[4],
    }

    if (query.get('details') != null) {
      return {
        body: {
          song: {
            title: beatmap.title,
            cover: beatmap.cover,
            link: beatmap.dl
          },
          artist: {
            name: beatmap.artist,
            image: ''
          }
        }
      }
    } else {
      return {
        body: beatmap
      }
    }
  }

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