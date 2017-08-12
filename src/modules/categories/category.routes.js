import { Router } from 'express';
import validate from 'express-validation';

import { authenticate } from '../../middlewares/authenticate';

import * as categoryController from './category.controllers';
import categoryValidation from './category.validations';

const routes = new Router();

routes.post(
  '/',
  authenticate,
  validate(categoryValidation.create),
  categoryController.createCategory,
);
routes.get('/:id', authenticate, categoryController.getCategoryById);

export default routes;
