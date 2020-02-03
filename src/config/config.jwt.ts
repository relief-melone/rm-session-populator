import fs from 'fs';
import ConfigJWT from '../interfaces/ConfigJWT';
import UserConfig from '../interfaces/UserConfig';

export const getJWTMode = (env: UserConfig): 'direct' | 'key' => {
  return env.jwtMode || 'direct';
};

export const getJWTKeyOrSecret = (env: UserConfig): Buffer | string => {
  const mode = getJWTMode(env);
  return mode === 'direct' ? 
    env.jwtSecret :
    getPublicKeyFromFile(env);
};

export const getPublicKeyFromFile = (env: UserConfig): Buffer => {
  const location = getKeyLocation(env);
  return fs.readFileSync(location);
};

export const getKeyLocation = (env: UserConfig): string => {
  return env.jwtKeyLocation || '/data/public_key.pem';
};

export const getHeaderName = (options: UserConfig): string => {
  return options.jwtHeaderName || 'authorization';
};

export default (env: UserConfig): ConfigJWT => ({
  mode: getJWTMode(env),
  algorithm: 'RS256',
  secret: getJWTKeyOrSecret(env),
  headerName: getHeaderName(env)
});
