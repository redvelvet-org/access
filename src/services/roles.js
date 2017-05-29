const boom = require('boom');
const { Role } = require('../models');

const read = async (id) => {
  const role = await Role.findById(id);

  if (!role) {
    throw boom.notFound();
  }

  return role;
};

const search = async (ids) => {
  const roles = await Role.findAll({
    where: {
      id: ids
    }
  });

  if (!roles.length) {
    throw boom.notFound();
  }

  return roles;
};

const create = (role) => Role.create({
  name: role.name
});

const update = async (id, body) => {
  const role = await Role.findById(id);

  if (!role) {
    throw boom.notFound();
  }

  return Role.update({
    name: body.name
  }, {
    where: {
      id
    }
  });
};

const remove = async (id) => {
  const role = await Role.findById(id);

  if (!role) {
    throw boom.notFound();
  }

  return Role.destroy({
    where: {
      id
    }
  });
};

const readPrivileges = async (id) => {
  const role = await Role.findById(id);

  if (!role) {
    throw boom.notFound();
  }

  return role.privilegeIds;
};

module.exports = {
  read,
  search,
  create,
  update,
  remove,
  readPrivileges
};
