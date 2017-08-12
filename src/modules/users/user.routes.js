import { Router } from 'express';
import validate from 'express-validation';

import { authenticate } from '../../middlewares/authenticate';
import * as userController from './user.controllers';
import userValidation from './user.validations';

const routes = new Router();

routes.post('/authenticate', validate(userValidation.authenticate), userController.authenticate);
routes.post('/verify', validate(userValidation.verify), userController.verify);
routes.get('/:id', authenticate, userController.getUserById);

export default routes;
