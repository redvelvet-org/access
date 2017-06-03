const Joi = require('joi');
const Celebrate = require('celebrate');

const read = Celebrate({
  params: {
    id: Joi.string().guid().description('Entity ID').required()
  }
});

const search = Celebrate({
  query: {
    ids: Joi.array().items(Joi.string().guid()).description('Entity IDs').required()
  }
});

const create = Celebrate({
  body: {
    name: Joi.string().min(3).max(20).description('Entity Name').required()
  }
});

const update = Celebrate({
  params: {
    id: Joi.string().guid().description('Entity ID').required()
  },
  body: {
    name: Joi.string().min(3).max(20).description('Entity Name')
  }
});

const remove = Celebrate({
  params: {
    id: Joi.string().guid().description('Entity ID').required()
  }
});

module.exports = {
  read,
  search,
  create,
  update,
  remove
};
