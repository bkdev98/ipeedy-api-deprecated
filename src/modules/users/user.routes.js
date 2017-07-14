import { Router } from 'express';
import validate from 'express-validation';

import * as userController from './user.controllers';
import userValidation from './user.validations';

const routes = new Router();

routes.post(
  '/authenticate',
  validate(userValidation.authenticate),
  userController.authenticate,
);
routes.post('/verify', validate(userValidation.verify), userController.verify);

export default routes;
