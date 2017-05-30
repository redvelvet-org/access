const boom = require('boom');
const _ = require('lodash');
const { Privilege, Role } = require('../models');

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

  const roles = await Role.findAll({
    where: {
      id: privilege.roleIds
    }
  });

  const roleIds = roles.map(r => r.id);
  return roleIds;
};

const addRoles = async(id, roleIds) => {
  const privilege = await Privilege.findById(id);

  if (!privilege) {
    throw boom.notFound();
  }

  const roles = await Role.findAll({
    where: {
      id: roleIds
    }
  });

  if (roles.length !== _.uniq(roleIds).length) {
    throw boom.badRequest();
  }

  const newRoles = _.uniq([...privilege.roleIds, ...roleIds]);

  await Privilege.update({
    roleIds: newRoles
  }, {
    where: {
      id
    }
  });

  return Privilege.findById(id);
};

const removeRoles = async(id, roleIds, action) => {
  const privilege = await Privilege.findById(id);

  if (!privilege) {
    throw boom.notFound();
  }

  const filtered = privilege.roleIds.filter(p => !roleIds.includes(p));

  await Privilege.update({
    roleIds: filtered
  }, {
    where: {
      id
    }
  });
  return Privilege.findById(id);
};

module.exports = {
  read,
  search,
  create,
  update,
  remove,
  readRoles,
  addRoles,
  removeRoles
};
