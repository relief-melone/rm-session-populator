import jwt from 'jsonwebtoken';
import ConfigJWT from '../interfaces/ConfigJWT';


export const verifyWithKey = (token: string| undefined, config: ConfigJWT): object | null => {
  try {
    const user = jwt.verify(token, config.secret, {
      algorithms: [config.algorithm]
    }) as object;
    return user;
  } catch (err) {
    return null;
  } 
  
};

export const verifyWithSecret = (token: string, config: ConfigJWT): object | null => {
  try {
    return jwt.verify(token, config.secret) as object;
  } catch (err) {
    return null;
  }
  
};

export default (header: string, config: ConfigJWT): object | null => {
  if(!header) return null;
  const rawHeader = header.replace('Bearer ', '');
  const token = config.mode === 'direct' ?
    verifyWithSecret(rawHeader, config) :
    verifyWithKey(rawHeader, config);

  return token;
};