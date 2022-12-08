import Joi from 'joi';

const createAdmin = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
const createAdminUser = {
  body: Joi.object().keys({
    email: Joi.string().required(),
  }),
};

export default {
  createAdmin,
  createAdminUser,
};
