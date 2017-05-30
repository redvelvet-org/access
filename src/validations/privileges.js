const Joi = require('joi');
const Celebrate = require('celebrate');

const read = Celebrate({
  params: {
    id: Joi.string().guid().description('Privilege ID').required()
  }
});

const search = Celebrate({
  query: {
    ids: Joi.array().items(Joi.string().guid()).description('Privilege IDs').required()
  }
});

const create = Celebrate({
  body: {
    name: Joi.string().min(3).max(20).description('Privilege Name').required(),
    scope: Joi.string().min(3).max(20).description('Privilege Scope')
  }
});

const update = Celebrate({
  params: {
    id: Joi.string().guid().description('Privilege ID').required()
  },
  body: {
    name: Joi.string().min(3).max(20).description('Privilege Name'),
    scope: Joi.string().min(3).max(20).description('Privilege Scope')
  }
});

const remove = Celebrate({
  params: {
    id: Joi.string().guid().description('Privilege ID').required()
  }
});

const manageRoles = Celebrate({
  params: {
    id: Joi.string().guid().description('Privilege ID').required()
  },
  body: {
    roleIds: Joi.array().items(Joi.string().guid().description('Role Id')),
    action: Joi.string().description('Action').required()
  }
});

module.exports = {
  read,
  search,
  create,
  update,
  remove,
  manageRoles
};
