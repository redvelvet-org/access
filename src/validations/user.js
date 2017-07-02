const Joi = require('joi');
const Celebrate = require('celebrate');

const validId = Joi.string().guid().description('User ID');
const validEmail = Joi.string().email().description('Email');
const validFirstName = Joi.string().alphanum().min(3).max(30);
const validLastName = Joi.string().alphanum().min(3).max(30);
const validPassword = Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);
const validToken = Joi.string().min(10);

const login = Celebrate({
  body: {
    payload: {
      email: validEmail.required(),
      password: validPassword.required()
    }
  }
});

const logout = Celebrate({
  params: {
    id: validId.required()
  }
});

const resetPassword = Celebrate({
  query: {
    resetToken: validToken.required()
  },
  body: {
    password: validPassword.required()
  }
});

const forgotPassword = Celebrate({
  payload: {
    email: validEmail.required()
  }
});

const signup = Celebrate({
  body: {
    email: validEmail.required(),
    password: validPassword.required(),
    firstName: validFirstName.required(),
    lastName: validLastName.required()
  }
});

const profile = Celebrate({
  params: {
    id: validId.required()
  }
});

module.exports = {
  login,
  logout,
  resetPassword,
  forgotPassword,
  signup,
  profile
};
