export function getAuthenticatorHost(env = process.env): string {
  return env.AUTHENTICATOR_HOST || 'http://localhost:8081';
}

export function getAuthenticatorPath(env = process.env): string {
  return env.AUTHENTICATOR_USER_PATH || '/auth/userinfo';
}

export function getUserInfoURL(env = process.env): string {
  return `${getAuthenticatorHost(env)}${getAuthenticatorPath(env)}`;
}

export function getCookieName(env = process.env): string {
  return env.AUTHENTICATOR_CREDENTIALS_COOKIE_NAME || 'connect.sid';
}

export function getBehaviour(env = process.env): boolean {
  return env.AUTHENTICATOR_REJECT_WITHOUT_COOKIE === 'false' ? false : true;
}

export default (env = process.env) => ({
  AuthenticatorHost: getAuthenticatorHost(env),
  AuthenticatorUserPath: getAuthenticatorPath(env),
  AuthenticatorUserURL: getUserInfoURL(env),
  CredentialsCookieName: getCookieName(env),
  RejectWithoutCookie: getBehaviour(env)
});
