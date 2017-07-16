import Joi from 'joi';

export default {
  create: {
    name: Joi.string().min(4).max(25).required(),
    category: Joi.string(),
    price: Joi.number().required(),
    description: Joi.string().min(10).max(50).required(),
  },
};
