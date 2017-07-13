import Joi from 'joi';

export default {
  authenticate: {
    phone: Joi.string().required(),
    name: Joi.string().min(2).max(25),
    email: Joi.string().email(),
    role: Joi.number().integer().required(),
  }
}
