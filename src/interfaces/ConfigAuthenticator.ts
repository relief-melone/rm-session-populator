export default interface ConfigAuthenticator {
  authenticatorHost: string;
  authenticatorUserPath: string;
  authenticatorUserURL: string;
  credentialsCookieName: string;
  rejectWithoutAuthentication: boolean;
}