import Joi from 'joi';

export default {
  signup: {
    phone: Joi.string().required(),
    name: Joi.string().min(2).max(25),
    email: Joi.string().email(),
    role: Joi.number().integer().required(),
  }
}
