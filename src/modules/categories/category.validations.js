import Joi from 'joi';

export default {
  create: {
    name: Joi.string().min(3).max(15).required(),
    icon: Joi.string().required(),
    image: Joi.string().required(),
  }
}
