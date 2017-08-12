import HTTPStatus from 'http-status';

import Category from './category.model';
import Product from '../products/product.model';

export async function createCategory(req, res) {
  try {
    const category = await Category.createCategory(req.body, req.user._id);

    return res.status(HTTPStatus.CREATED).json(category);
  } catch (err) {
    return res.status(HTTPStatus.BAD_REQUEST).json(err);
  }
}

export async function getCategoryById(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    const products = await Product.findByCategory(req.params.id);

    return res.status(HTTPStatus.OK).json({
      ...category._doc,
      products,
    });
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}
