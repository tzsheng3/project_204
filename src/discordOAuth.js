const clientId = '1253729365624225974';
const redirectUri = 'http://localhost:3000/auth/discord/callback';

// Object to store Discord OAuth configuration
export const discordOAuth = {
  clientId: clientId,
  redirectUri: redirectUri,
  authorizationUrl: `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify+email`,
};

export default discordOAuth;
