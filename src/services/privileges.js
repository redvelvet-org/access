const boom = require('boom');
const { Privilege } = require('../models');

const read = async (id) => {
  const privilege = await Privilege.findById(id);

  if (!privilege) {
    throw boom.notFound();
  }

  return privilege;
};

const search = async (ids) => {
  const roles = await Privilege.findAll({
    where: {
      id: ids
    }
  });

  if (!roles.length) {
    throw boom.notFound();
  }

  return roles;
};

const create = (privilege) => Privilege.create({
  name: privilege.name,
  scope: privilege.scope
});

const update = async (id, body) => {
  const privilege = await Privilege.findById(id);

  if (!privilege) {
    throw boom.notFound();
  }

  const name = body.name || privilege.name;
  const scope = body.scope || privilege.scope;

  return Privilege.update({
    name,
    scope
  }, {
    where: {
      id
    }
  });
};

const remove = async (id) => {
  const privilege = await Privilege.findById(id);

  if (!privilege) {
    throw boom.notFound();
  }

  return Privilege.destroy({
    where: {
      id
    }
  });
};

const readRoles = async(id) => {
  const privilege = await Privilege.findById(id);

  if (!privilege) {
    throw boom.notFound();
  }

  return privilege.roleIds;
};

module.exports = {
  read,
  search,
  create,
  update,
  remove,
  readRoles
};
