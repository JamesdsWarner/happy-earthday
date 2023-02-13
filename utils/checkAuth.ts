import jwt from 'jsonwebtoken';
import createError from './createError';
import { Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../interfaces.js';

export default (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError({ status: 401, message: 'Unauthorised' }));
  }
  return jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
    if (err) {
      return next(createError({ status: 401, message: 'Invalid token' }));
    } else {
      req.user = decoded;
      return next();
    }
  });
};
