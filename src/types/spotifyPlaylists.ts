import { SpotifyPlaylist } from './spotifyPlaylist';

export interface SpotifyPlaylists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: SpotifyPlaylist[];
}
