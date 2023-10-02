import { ReactNode, createContext, useState } from 'react';

export async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('verifier', verifier);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'code');
  params.append('redirect_uri', 'http://localhost:5173/callback');
  params.append('scope', 'user-read-private user-read-email');
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
  let text = '';
  let possible =
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
  params.append('redirect_uri', 'http://localhost:5173/callback');
  params.append('code_verifier', verifier!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}

export async function fetchProfile(token: string): Promise<any> {
  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(result);

  return await result.json();
}

async function fetchPlaylists(token: string): Promise<any> {
  const result = await fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

type UserTokenContextType = {
  accessToken: string;
  loginWithSpotify: (code?: string) => void;
};

export const UserTokenContext = createContext<UserTokenContextType>({
  accessToken: '',
  loginWithSpotify: () => {},
});

export function UserTokenProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string>('');

  async function loginWithSpotify(code?: string) {
    const clientId = '22817a9b16a140d1a9f37f3cceaa1712'; // Replace with your client id

    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      let access = await getAccessToken(clientId, code);
      console.log('ACCESS', access);
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