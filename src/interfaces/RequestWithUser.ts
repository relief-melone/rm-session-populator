import { Request } from 'express';
import User from '../classes/class.User';

export interface RequestWithUser extends Request {
  user?: User;
}
