import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/RequestWithUser';
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
