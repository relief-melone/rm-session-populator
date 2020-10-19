import jwt from 'jsonwebtoken';
import User, { UserI } from '../classes/class.User';
import ConfigJWT from '../interfaces/ConfigJWT';


export const verifyWithKey = (token: string| undefined, config: ConfigJWT): UserI | null => {
  try {
    const user = jwt.verify(token, config.secret, {
      algorithms: [config.algorithm]
    }) as UserI;
    return user;
  } catch (err) {
    return null;
  } 
  
};

export const verifyWithSecret = (token: string, config: ConfigJWT): UserI | null => {
  try {
    return jwt.verify(token, config.secret) as UserI;
  } catch (err) {
    return null;
  }
  
};

export default (header: string, config: ConfigJWT): User | null => {
  if(!header) return null;
  const rawHeader = header.replace('Bearer ', '');
  const userinput: UserI = config.mode === 'direct' ?
    verifyWithSecret(rawHeader, config) :
    verifyWithKey(rawHeader, config);

  const user = userinput ? new User(userinput) : null;

  return user;
};