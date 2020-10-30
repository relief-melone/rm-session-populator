import { Request, Response, NextFunction } from 'express';
import ConfigAuthenticator from '../config/config.authenticator';
import ConfigJWT from '../config/config.jwt';
import GetUserByCookie from '../services/getUserByCookie';
import GetUserFromWebToken from '../services/getUserFromWebToken';
import UserConfig from '../interfaces/UserConfig';


export default (env: UserConfig) => async function(
  req: Request, 
  res: Response, 
  next: NextFunction, 
  getUserFromWebToken=GetUserFromWebToken,
  getUserByCookie=GetUserByCookie,
  configAuthenticator=ConfigAuthenticator(env),
  configJWT=ConfigJWT(env)  
): Promise<Response | void> {
  const userFromWebToken = getUserFromWebToken(req.headers[configJWT.headerName] as string, configJWT);
  if(userFromWebToken){
    req.user = userFromWebToken;
    return next();    
  }

  const userFromCookie = getUserByCookie(req.cookies, configAuthenticator);
  userFromCookie.then(user => {
    if(!user && configAuthenticator.rejectWithoutAuthentication) return res.status(401).send();  
    req.user = user;
    return next();    
  });
  

};
