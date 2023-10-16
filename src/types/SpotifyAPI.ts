export interface SpotifyPlaylist {
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  tracks: {
    total: number;
    items: SpotifyTrack[];
  };
}

export interface SpotifyPlaylists {
  total: number;
  items: SpotifyPlaylist[];
}

export interface SpotifyProfile {
  display_name: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
}

export interface SpotifyTrack {
  track: {
    id: string;
    name: string;
    uri: string;
  };
}

export interface SpotifyAudioFeatures {
  id: string;
  tempo: number;
  uri: string;
}
