import { Request, Response, NextFunction } from 'express';
import ConfigQueryBouncer from '../config/config.queryBouncer';
import ConfigJWT from '../config/config.jwt';
import { RequestWithUser } from '../interfaces/RequestWithUser';

import UserConfig from '../interfaces/UserConfig';


export default (config: UserConfig) => async function(
  req: RequestWithUser, 
  res: Response, 
  next: NextFunction, 
  configQueryBouncer = ConfigQueryBouncer(config),
  configJWT = ConfigJWT(config)
): Promise<Response | void> {
  if(configQueryBouncer.enabled && req.user){
    await req.user.updateQueryBouncerInformation(configQueryBouncer, req.headers[configJWT.headerName] as string);
  }
  return;
};
