import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';
dotenv.config();

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      console.log("email = ", email);
      console.log("password = ", password);
      const user = await db.Users.findAll({
          where:{
              email:email,
              password:password
          }
      })
      console.log("user = ", user)
      const token = jwt.sign({ user }, process.env.JWT_SECRET as unknown as string);
      if (!user.length) {
        return res.status(401).json({
          status: 'error',
          message: 'the username and password do not match please try again',
        });
      }
      return res.status(200).json({
        name:user[0].name, email:user[0].email, token:token 
      });
    } catch (err) {
      return next(err);
    }
  };