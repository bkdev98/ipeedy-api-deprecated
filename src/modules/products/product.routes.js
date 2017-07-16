import { Router } from 'express';
import validate from 'express-validation';

import { authenticate } from '../../middlewares/authenticate';

import * as productController from './product.controllers';
import productValidation from './product.validations';

const routes = new Router();

routes.post(
  '/create',
  authenticate,
  validate(productValidation.create),
  productController.createProduct,
);
routes.get('/:id', authenticate, productController.getProductById);
routes.get('/', authenticate, productController.getNearbyProduct);

export default routes;
