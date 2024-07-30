const clientId = '1253729365624225974';
const redirectUri = 'http://localhost:3000/auth/discord/callback';

export const discordOAuth = {
  clientId: clientId,
  redirectUri: redirectUri,
  authorizationUrl: `https://discord.com/oauth2/authorize?client_id=1253729365624225974&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback&scope=identify+email`,
};

export default discordOAuth;
