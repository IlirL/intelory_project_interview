import e, { Router, Request, Response, response } from 'express';
import db from '../../models';
import * as controllers from '../../controllers/users.controllers';
import authenticationMiddleware from '../../middleware/authentication.middleware';
import { IntegerDataType } from 'sequelize';

const routes = Router();
// api/users

// authentication
routes.route('/authenticate').post(controllers.authenticate);
routes.route("/register").post(async (req:Request,res:Response ) => {
  try {
    const {email, password, name} = req.body;
  console.log(email, password, name)
  const responseFromDB = await db.Users.create(req.body);
  res.status(200).json("Successful")
  } catch (error) {
    res.status(400).json("Not successful");
  }
})
routes.route('/companies').get(authenticationMiddleware,async (req:Request, res:Response) => {
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
} )

routes.route('/columns').get(authenticationMiddleware, async (req:Request, res:Response) => {
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
})

export default routes;