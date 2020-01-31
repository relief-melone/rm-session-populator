export default interface UserConfig {
  authenticatorHost?: string;
  authenticatorUserPath?: string;
  credentialsCookieName?: string;
  rejectWithoutAuthentication?: boolean;
  jwtMode?: 'direct' | 'key';
  jwtSecret?: string;
  jwtKeyLocation?: string;  
  jwtHeaderName?: string;
}