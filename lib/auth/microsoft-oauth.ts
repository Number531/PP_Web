import axios from 'axios';

interface TokenResponse {
  token_type: string;
  scope: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
  refresh_token?: string;
}

interface TokenCache {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

/**
 * Get Microsoft OAuth2 tokens using client credentials flow
 * This is for server-to-server authentication (no user interaction)
 */
export async function getMicrosoftTokens(): Promise<{
  access_token: string;
  refresh_token?: string;
}> {
  // Check if we have a valid cached token
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 60000) {
    console.log('Using cached token');
    return {
      access_token: tokenCache.accessToken,
      refresh_token: tokenCache.refreshToken,
    };
  }

  // Get new tokens using client credentials flow
  // This is simpler and more reliable for server-to-server auth
  console.log('No valid cached token, getting new token');
  return getNewTokens();
}

/**
 * Get new tokens using client credentials flow
 */
async function getNewTokens(): Promise<{
  access_token: string;
  refresh_token?: string;
}> {
  const tenantId = process.env.MICROSOFT_TENANT_ID;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  
  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Missing required OAuth configuration');
  }

  try {
    console.log('Getting new token using client credentials flow');
    const response = await axios.post<TokenResponse>(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: clientId,
        scope: 'https://graph.microsoft.com/.default',
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('Successfully obtained access token via client credentials');
    const expiresAt = Date.now() + response.data.expires_in * 1000;
    
    // Store in cache
    tokenCache = {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token || '',
      expiresAt,
    };

    return {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
    };
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
}

/**
 * Refresh tokens using a refresh token
 */
async function refreshTokens(refreshToken: string): Promise<{
  access_token: string;
  refresh_token: string;
}> {
  const tenantId = process.env.MICROSOFT_TENANT_ID;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  
  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Missing required OAuth configuration');
  }

  try {
    const response = await axios.post<TokenResponse>(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const expiresAt = Date.now() + response.data.expires_in * 1000;
    
    // Update cache
    tokenCache = {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token || refreshToken,
      expiresAt,
    };

    return {
      access_token: response.data.access_token,
      refresh_token: tokenCache.refreshToken,
    };
  } catch (error) {
    console.error('Error refreshing Microsoft tokens:', error);
    throw error;
  }
}

/**
 * For initial setup: Get authorization URL for user to visit
 * This is only needed for the initial setup to get a refresh token
 */
export function getAuthorizationUrl(): string {
  const clientId = process.env.OAUTH_CLIENT_ID;
  // Default to the production domain if not specified in environment variables
  const redirectUri = process.env.OAUTH_REDIRECT_URI || 'https://psqrd.ai/api/auth/callback';
  const tenantId = process.env.MICROSOFT_TENANT_ID;
  
  if (!clientId || !tenantId) {
    throw new Error('Missing required OAuth configuration');
  }

  const scopes = encodeURIComponent('offline_access https://graph.microsoft.com/Mail.Send');
  
  return `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&response_mode=query&scope=${scopes}`;
}

/**
 * Exchange authorization code for tokens
 * This is only needed for the initial setup to get a refresh token
 */
export async function exchangeCodeForTokens(code: string): Promise<TokenResponse> {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.OAUTH_REDIRECT_URI;
  const tenantId = process.env.MICROSOFT_TENANT_ID;
  
  if (!clientId || !clientSecret || !redirectUri || !tenantId) {
    throw new Error('Missing required OAuth configuration');
  }

  try {
    const response = await axios.post<TokenResponse>(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Important: Save this refresh token securely in your environment variables
    console.log('SAVE THIS REFRESH TOKEN:', response.data.refresh_token);
    
    return response.data;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    throw error;
  }
}
