import e, { Router, Request, Response, response } from 'express';
import db from '../../models';
import * as controllers from '../../controllers/bundle.controllers';
import authenticationMiddleware from '../../middleware/authentication.middleware';
import { IntegerDataType } from 'sequelize';

const routes = Router();

routes.route('/authenticate').post(controllers.authenticate);
routes.route("/register").post(controllers.register)
routes.route('/companies').get(authenticationMiddleware,controllers.companies);

routes.route('/columns').get(authenticationMiddleware, controllers.columns);

export default routes;