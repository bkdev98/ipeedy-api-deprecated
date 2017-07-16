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

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id).populate('user');

    return res.status(HTTPStatus.OK).json(product);
  } catch (err) {
    return res.status(HTTPStatus.BAD_REQUEST).json(err);
  }
}

export async function getNearbyProduct(req, res) {
  try {
    const longitude = parseFloat(req.query.lng);
    const latitude = parseFloat(req.query.lat);
    const distance = parseInt(req.query.distance, 10);

    const products = await Product.geoNear(
      {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      {
        maxDistance: distance || 5000,
        spherical: true,
      },
    );

    return res.status(HTTPStatus.OK).json(products);
  } catch (err) {
    return res.status(HTTPStatus.BAD_REQUEST).json(err);
  }
}
