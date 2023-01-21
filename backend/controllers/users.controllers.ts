import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';
import {encrypt, validateUser} from '../encrypt/encrypt.string.compare'
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
      // const user = await db.Users.findAll({
      //     where:{
      //         email:email,
      //         password:await encrypt(password)
      //     }
      // })
      const user = await db.Users.findAll({
        where:{
          email:email
        }
      })
      console.log("user = ", user[0].password);
     
      if (!user.length) {
        return res.status(401).json({
          status: 'error',
          message: 'the username and password do not match please try again',
        });
      }
      const valid_password_check = await validateUser(user[0].password, password);
      if(!valid_password_check)
      {return res.status(401).json({
        status: 'error',
        message: 'password do not match please try again',
      });}
      const token = jwt.sign({ user }, process.env.JWT_SECRET as unknown as string);
      return res.status(200).json({
        name:user[0].name, email:user[0].email, token:token 
      });
    } catch (err) {
      return next(err);
    }
  };

  export const register = async (req: Request,
    res: Response,
    next: NextFunction) => {
      try {
      const {email, password, name} = req.body;
      encrypt(password).then(r => console.log("encrypt", r))
      // console.log("encrypt = ", )
      console.log(email, password, name)
      const responseFromDB = await db.Users.create({
        ...req.body,
        password:await encrypt(password)
      });
      res.status(200).json("Successful")
      } catch (error) {
        res.status(400).json("Not successful");
      }
  }
    