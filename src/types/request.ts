import 'express';

declare module 'express' {
  export interface Request {
    user: null | Record<string,any>;
  }
}