import ConfigAuthenticator from '../interfaces/ConfigAuthenticator';
import UserConfig from '../interfaces/UserConfig';

export function getAuthenticatorHost(env: UserConfig): string {
  return env.authenticatorHost || 'http://localhost:8081';
}

export function getAuthenticatorPath(env: UserConfig): string {
  return env.authenticatorUserPath || '/auth/userinfo';
}

export function getUserInfoURL(env: UserConfig): string {
  return `${getAuthenticatorHost(env)}${getAuthenticatorPath(env)}`;
}

export function getCookieName(env: UserConfig): string {
  return env.credentialsCookieName || 'connect.sid';
}

export function getBehaviour(env: UserConfig): boolean {
  return env.rejectWithoutAuthentication === false ? false : true;
}


export default (env: UserConfig): ConfigAuthenticator => ({
  authenticatorHost: getAuthenticatorHost(env),
  authenticatorUserPath: getAuthenticatorPath(env),
  authenticatorUserURL: getUserInfoURL(env),
  credentialsCookieName: getCookieName(env),
  rejectWithoutAuthentication: getBehaviour(env),
});
