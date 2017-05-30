const Joi = require('joi');
const Celebrate = require('celebrate');

const read = Celebrate({
  params: {
    id: Joi.string().guid().description('Role ID').required()
  }
});

const search = Celebrate({
  query: {
    ids: Joi.array().items(Joi.string().guid()).description('Role IDs').required()
  }
});

const create = Celebrate({
  body: {
    name: Joi.string().min(3).max(20).description('Role Name').required()
  }
});

const update = Celebrate({
  params: {
    id: Joi.string().guid().description('Role ID').required()
  },
  body: {
    name: Joi.string().min(3).max(20).description('Role Name').required()
  }
});

const remove = Celebrate({
  params: {
    id: Joi.string().guid().description('Role ID').required()
  }
});

const managePrivileges = Celebrate({
  params: {
    id: Joi.string().guid().description('Role ID').required()
  },
  body: {
    privilegeIds: Joi.array().items(Joi.string().guid().description('Privilege Id')),
    action: Joi.string().description('Action').required()
  }
});

module.exports = {
  read,
  search,
  create,
  update,
  remove,
  managePrivileges
};
