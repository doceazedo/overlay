const baseUrl = 'https://api.deezer.com';

type SearchResult = {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: Artist;
  album: Album;
  type: string;
};

type Artist = {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: string;
};

type Album = {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
};

export const searchArtist = async (query: string) => {
  try {
    const resp = await fetch(`${baseUrl}/search?q=artist:"${query}"`);
    const data = (await resp.json()) as { data: SearchResult[] };
    if (!data.data || !resp.ok) throw Error();

    const lookingFor = query.toLowerCase();
    const result = data.data.find(
      (item) => item.artist.name.toLowerCase() == lookingFor,
    );
    return result?.artist || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
