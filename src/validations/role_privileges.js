const Joi = require('joi');
const Celebrate = require('celebrate');

const read = Celebrate({
  params: {
    id: Joi.string().guid().description('Role Privilege ID').required()
  }
});

const search = Celebrate({
  query: {
    ids: Joi.array().items(Joi.string().guid()).description('Role Privilege IDs').required()
  }
});

const create = Celebrate({
  body: {
    roleId: Joi.string().guid().description('Role ID').required(),
    privilegeId: Joi.string().guid().description('Privilege ID').required()
  }
});

const update = Celebrate({
  params: {
    id: Joi.string().guid().description('Role Privilege ID').required()
  },
  body: {
    roleId: Joi.string().guid().description('Role ID'),
    privilegeId: Joi.string().guid().description('Privilege ID')
  }
});

const remove = Celebrate({
  params: {
    id: Joi.string().guid().description('Role Privilege ID').required()
  }
});

module.exports = {
  read,
  create,
  update,
  remove,
  search
};
