const boom = require('boom');
const { Entity } = require('../models');

const read = async (id) => {
  const entity = await Entity.findById(id);

  if (!entity) {
    throw boom.notFound();
  }

  return entity;
};

const search = async (ids) => {
  const entities = await Entity.findAll({
    where: {
      id: ids
    }
  });

  if (!entities.length) {
    throw boom.notFound();
  }

  return entities;
};

const create = (entity) => Entity.create({
  name: entity.name
});

const update = async (id, body) => {
  const entity = await Entity.findById(id);

  if (!entity) {
    throw boom.notFound();
  }

  return Entity.update({
    name: body.name
  }, {
    where: {
      id
    }
  });
};

const remove = async (id) => {
  const entity = await Entity.findById(id);

  if (!entity) {
    throw boom.notFound();
  }

  return Entity.destroy({
    where: {
      id
    }
  });
};


module.exports = {
  read,
  search,
  create,
  update,
  remove
};
