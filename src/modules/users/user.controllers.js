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
        "Error": "Request OTP failed!"
      });
    }

    user.code = result.code;
    user.codeValid = true;

    return res.status(HTTPStatus.OK).json(await user.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
