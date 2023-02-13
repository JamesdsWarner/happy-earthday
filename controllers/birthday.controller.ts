import createError from '../utils/createError';
import { IGetUserAuthInfoRequest } from '../interfaces';
import { Response, NextFunction } from 'express';
import { pool } from '../config/db.config';

export const createBirthday = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user?.id;
  const name = req.body.name;
  const birthday = req.body.birthday;

  if (!user_id || !name || !birthday) {
    return next(createError({ status: 400, message: 'user_id, name and birthday is required' }));
  }

  try {
    const newBirthday = await pool.query(
      'INSERT INTO birthdays (user_id, name, birthday) VALUES ($1, $2, $3) RETURNING *',
      [user_id, name, birthday]
    );
    res.json(newBirthday.rows[0]);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return next(err);
    }
  }
};

export const getAllBirthdays = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user?.id;
  console.log(req);
  try {
    const birthdays = await pool.query(`SELECT * FROM birthdays WHERE user_id = '${user_id}'`);
    res.json(birthdays.rows);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return next(err);
    }
  }
};
