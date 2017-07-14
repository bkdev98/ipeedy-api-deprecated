/* eslint-disable no-param-reassign */

import HTTPStatus from 'http-status';

import User from '../modules/users/user.model';

export const authenticate = async (req, res, next) => {
  const token = req.header('authorization');

  try {
    const user = await User.findByToken(token);
    if (!user) return Promise.reject();

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.sendStatus(HTTPStatus.UNAUTHORIZED);
  }
};
