import Joi from 'joi';
import { password } from './custom.validation';

const registerUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
  }),
};

const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export default {
  registerUser,
  loginUser,
};
