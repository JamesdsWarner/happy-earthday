import { Request } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  user?: { first_name: string; id: number };
}
