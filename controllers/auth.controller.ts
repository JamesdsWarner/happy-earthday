import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createError from '../utils/createError';
import { Request, Response, NextFunction, Errback } from 'express';
import { pool } from '../config/db.config';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;
  const birthday = req.body.birthday;

  if (!first_name || !email || !password) {
    return next(createError({ status: 400, message: 'Name, email, password is required' }));
  }

  try {
    const salt = await bcryptjs.genSalt(8);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password, birthday) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [first_name, last_name, email, hashedPassword, birthday]
    );
    res.json(newUser.rows[0]);
    // return res.status(201).json('New user created');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return next(err);
    }
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return next(createError({ status: 400, message: 'Email and password is required' }));
  }
  try {
    const user = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
    if (!user.rows[0]) {
      return next(createError({ status: 404, message: 'No user found' }));
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.rows[0].password);
    if (!isPasswordCorrect) {
      return next(createError({ status: 400, message: 'Password is incorrect' }));
    }

    const payload = {
      id: user.rows[0].user_id,
      first_name: user.rows[0].first_name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });
    return res
      .cookie('access_token', token, {
        // httpOnly: false,
        // secure: true,
        // sameSite: 'none',
      })
      .status(200)
      .json({ message: 'login success' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return next(err);
    }
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('access_token');
  return res.status(200).json({ message: 'Logout Success' });
};

export const isLoggedIn = (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  //   console.log(req);
  if (!token) {
    return res.json(false);
  }
  return jwt.verify(token, process.env.JWT_SECRET as string, (err: any) => {
    if (err) {
      console.log(err);
      return res.json(false);
    }
    return res.json(true);
  });
};
