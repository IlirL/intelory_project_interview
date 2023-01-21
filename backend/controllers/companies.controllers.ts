import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';
dotenv.config();

export const companies = async (req:Request, res:Response) => {
    let responseFromDB : any = null;
      const limit : any = req.query.limit || 0;
      const page : any= req.query.page || 0;
      const offset = page * limit;
      const countRows = await db.Companies.count()
      console.log("page = ", page)
      console.log("limit", limit)
     if(limit!==0)
     {
      responseFromDB = await db.Companies.findAll({
        limit,
        offset,
        where:{}
      })
     }
    else{
       responseFromDB = await db.Companies.findAll();
    }

    console.log("responseFromDB", await db.Companies.count());
    res.send({
      count:countRows,
      companies:responseFromDB
    });
} 

export const columns = async (req:Request, res:Response) => {
    const columns = [
      {
        title:'Name', field:"name"
      },
      {
        title:'Email', field:'email'
      },
      {
        title:'EMBS', field:'embs'
      },
      {
        title:'EDB', field:'edb'
      },
      {
        title:'Activity', field:'activity'
      },
      {
        title:'Legal Form', field:'legal_form'
      },
      {
        title:'Size', field:'size'
      },
      {
        title:'Active', field:'active'
      },
      {
        title:'Address', field:'address'
      },
      {
        title:'Bank', field:'bank'
      },
      {
        title:'Bank Account Number', field:'bank_account_number'
      },
    ]

    res.send(columns)
}
