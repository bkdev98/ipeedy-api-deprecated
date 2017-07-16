import HTTPStatus from 'http-status';

import Product from './product.model';

export async function createProduct(req, res) {
  try {
    const product = await Product.createProduct(req.body, req.user._id);

    return res.status(HTTPStatus.OK).json(product);
  } catch (err) {
    return res.status(HTTPStatus.BAD_REQUEST).json(err);
  }
}
