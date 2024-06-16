import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
require('dotenv').config();

if (!process.env.SECRET_KEY) {
  throw new Error('Missing SECRET_KEY in environment variables');
}

export const SECRET_KEY: Secret = process.env.SECRET_KEY;
export interface CustomRequest extends Request {
  userId: string;
}


export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('Missing token');
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    console.log("auth: ", decoded.id)
    const userData = await axios.post('http://localhost:8001/v1/users/user', {
      id: decoded.id
    });


    if (!userData.data) { // Sửa thành userData.data
      throw new Error('User not found');
    }

    (req as CustomRequest).userId = userData.data.id;
    next();
  } catch (err) {
    console.error('Authentication error:', err); // Log lỗi để debug
    res.status(401).send('Please authenticate');
  }
};

