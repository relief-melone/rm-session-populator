import { Request, Response, NextFunction } from 'express';
import ConfigAuthenticator from '../config/config.authenticator';
import ConfigJWT from '../config/config.jwt';
import { RequestWithUser } from '../interfaces/RequestWithUser';
import GetUserByCookie from '../services/getUserByCookie';
import controllerUser from './controller.user';
import controllerQueryBouncer from './controller.queryBouncer';
import UserConfig from '../interfaces/UserConfig';

export default (config: UserConfig) => async function(
  req: RequestWithUser, 
  res: Response, 
  next: NextFunction, 
): Promise<Response | void> {
  await controllerUser(config)(req, res, next);
  await controllerQueryBouncer(config)(req,res,next);

  next();
};
