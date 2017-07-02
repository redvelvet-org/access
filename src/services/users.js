const boom = require('boom');
const _ = require('lodash');
const { User, Role, Entity } = require('../models');

const read = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw boom.notFound();
  }

  return user;
};

const search = async (ids) => {
  const users = await User.findAll({
    where: {
      id: ids
    }
  });

  if (!users.length) {
    throw boom.notFound();
  }

  return users;
};

const create = (user) => User.create({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  hash: user.hash
});

const update = async (id, body) => {
  const user = await User.findById(id);

  if (!user) {
    throw boom.notFound();
  }

  return User.update({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    hash: user.hash
  }, {
    where: {
      id
    }
  });
};

const remove = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw boom.notFound();
  }

  return Role.destroy({
    where: {
      id
    }
  });
};

const readRoles = async(id) => {
  const user = await User.findById(id);

  if (!user) {
    throw boom.notFound();
  }

  const roles = await Role.findAll({
    where: {
      id: user.roleIds
    }
  });

  const roleIds = roles.map(p => p.id);
  return roleIds;
};

const readEntities = async(id) => {
  const user = await User.findById(id);

  if (!user) {
    throw boom.notFound();
  }

  const entities = await Entity.findAll({
    where: {
      id: user.entityIds
    }
  });

  const entityIds = entities.map(p => p.id);
  return entityIds;
};

const addRoles = async(id, roleIds) => {
  const user = await User.findById(id);

  if (!user) {
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

  const newRoles = _.uniq([...user.roleIds, ...roleIds]);

  await User.update({
    roleIds: newRoles
  }, {
    where: {
      id
    }
  });

  return User.findById(id);
};

const addEntities = async(id, entityIds) => {
  const user = await User.findById(id);

  if (!user) {
    throw boom.notFound();
  }

  const entities = await Entity.findAll({
    where: {
      id: entityIds
    }
  });

  if (entities.length !== _.uniq(entityIds).length) {
    throw boom.badRequest();
  }

  const newEntities = _.uniq([...user.entityIds, ...entityIds]);

  await User.update({
    entityIds: newEntities
  }, {
    where: {
      id
    }
  });

  return User.findById(id);
};

const removeRoles = async(id, roleIds, action) => {
  const user = await User.findById(id);

  if (!user) {
    throw boom.notFound();
  }

  const filtered = user.roleIds.filter(p => !roleIds.includes(p));

  await User.update({
    roleIds: filtered
  }, {
    where: {
      id
    }
  });
  return User.findById(id);
};

const removeEntities = async(id, entityIds, action) => {
  const user = await User.findById(id);

  if (!user) {
    throw boom.notFound();
  }

  const filtered = user.entityIds.filter(p => !entityIds.includes(p));

  await User.update({
    entityIds: filtered
  }, {
    where: {
      id
    }
  });
  return User.findById(id);
};

module.exports = {
  read,
  search,
  create,
  update,
  remove,
  readRoles,
  addRoles,
  removeRoles,
  readEntities,
  addEntities,
  removeEntities
};
