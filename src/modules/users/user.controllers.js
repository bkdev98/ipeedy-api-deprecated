import HTTPStatus from 'http-status';

import User from './user.model';
import { requestOTP } from '../../services/auth.services';

export async function authenticate(req, res) {
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      await User.create(req.body);
    }

    const result = await requestOTP(req.body.phone);

    if (result.CodeResult !== '100') {
      return res.status(HTTPStatus.BAD_REQUEST).json({
        error: true,
        message: 'Request OTP failed!',
      });
    }

    user.code = result.code;

    return res.status(HTTPStatus.OK).json(await user.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function verify(req, res) {
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user || !user.code) {
      return res
        .status(HTTPStatus.BAD_GATEWAY)
        .json({ error: true, message: 'Verify user failed!' });
    }

    if (user.code !== parseInt(req.body.code, 10)) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ error: true, message: 'Invalid code!' });
    }

    await user.generateAuthToken();
    user.code = null;
    await user.save();

    return res.status(HTTPStatus.CREATED).json(user.toAuthJson());
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}
