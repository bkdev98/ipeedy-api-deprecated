import HTTPStatus from 'http-status';

import Category from './category.model';

export async function createCategory(req, res) {
  try {
    const category = await Category.createCategory(req.body, req.user._id);

    return res.status(HTTPStatus.CREATED).json(category);
  } catch (err) {
    return res.status(HTTPStatus.BAD_REQUEST).json(err);
  }
}
