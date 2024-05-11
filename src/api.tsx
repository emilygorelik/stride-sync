import { ReactNode, createContext, useState } from 'react';
import {
  SpotifyAudioFeatures,
  SpotifyPlaylist,
  SpotifyPlaylists,
  SpotifyProfile,
  SpotifyTrack,
} from './types/SpotifyAPI';

const isProd = false;
let redirectURL = '';

if (isProd) redirectURL = 'https://emilygorelik.github.io/stride-sync';
else redirectURL = 'http://localhost:5173';

export async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('verifier', verifier);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'code');
  params.append('redirect_uri', `${redirectURL}`);
  params.append(
    'scope',
    'user-read-private user-read-email playlist-modify-public playlist-read-private',
  );
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function getAccessToken(
  clientId: string,
  code: string,
): Promise<string> {
  const verifier = localStorage.getItem('verifier');

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', `${redirectURL}`);
  params.append('code_verifier', verifier!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const { access_token } = await result.json();
  if (access_token != undefined) {
    localStorage.setItem('accessToken', access_token); // Store the access token in localStorage
  }
  return access_token;
}

export async function checkStoredAccessToken(): Promise<string | null> {
  const storedAccessToken = localStorage.getItem('accessToken');
  return storedAccessToken;
}

export async function fetchProfile(token: string): Promise<SpotifyProfile> {
  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchPlaylists(token: string): Promise<SpotifyPlaylists> {
  const result = await fetch(
    'https://api.spotify.com/v1/me/playlists?limit=50&offset=0',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return await result.json();
}

export async function fetchPlaylistData(
  token: string,
  playlist_id: string,
  offset: number,
): Promise<SpotifyTrack[]> {
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=items(track(name,id,uri))&limit=100&offset=${offset}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return (await result.json()).items;
}

export async function fetchAudioFeatures(
  token: string,
  songArray: string[],
): Promise<SpotifyAudioFeatures[]> {
  const result = await fetch(
    `https://api.spotify.com/v1/audio-features?ids=${songArray.join()}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return (await result.json()).audio_features;
}

export async function createPlaylist(
  token: string,
  user_id: string,
  playlist_name: string,
): Promise<SpotifyPlaylist> {
  const result = await fetch(
    `https://api.spotify.com/v1/users/${user_id}/playlists`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: playlist_name,
        description: 'Created by StrideSync',
        public: true,
      }),
    },
  );

  return await result.json();
}

export async function addSongs(
  token: string,
  playlist_id: string,
  songs: string[],
): Promise<SpotifyPlaylist> {
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        uris: songs,
      }),
    },
  );

  return await result.json();
}

type UserTokenContextType = {
  accessToken: string | undefined;
  loginWithSpotify: (code?: string) => void;
};

export const UserTokenContext = createContext<UserTokenContextType>({
  accessToken: '',
  loginWithSpotify: () => {},
});

export function UserTokenProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string>();

  async function loginWithSpotify(code?: string) {
    const clientId = '22817a9b16a140d1a9f37f3cceaa1712'; // my unique client id from spotify dashboard

    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      const access = await getAccessToken(clientId, code);
      if (access) setAccessToken(access);
    }
  }

  const value: UserTokenContextType = {
    accessToken,
    loginWithSpotify,
  };

  return (
    <UserTokenContext.Provider value={value}>
      {children}
    </UserTokenContext.Provider>
  );
}
