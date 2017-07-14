import { Router } from 'express';
import validate from 'express-validation';

import * as productController from './product.controllers';
import productValidation from './product.validations';

const routes = new Router();

routes.post(
  '/create',
  validate(productValidation.create),
  productController.createProduct
);

export default routes;
