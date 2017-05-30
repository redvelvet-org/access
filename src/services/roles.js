const boom = require('boom');
const _ = require('lodash');
const { Role, Privilege } = require('../models');

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

const readPrivileges = async(id) => {
  const role = await Role.findById(id);

  if (!role) {
    throw boom.notFound();
  }

  const privileges = await Privilege.findAll({
    where: {
      id: role.privilegeIds
    }
  });

  const privilegeIds = privileges.map(p => p.id);
  return privilegeIds;
};

const addPrivileges = async(id, privilegeIds) => {
  const role = await Role.findById(id);

  if (!role) {
    throw boom.notFound();
  }

  const privileges = await Privilege.findAll({
    where: {
      id: privilegeIds
    }
  });

  if (privileges.length !== _.uniq(privilegeIds).length) {
    throw boom.badRequest();
  }

  const newPrivileges = _.uniq([...role.privilegeIds, ...privilegeIds]);

  await Role.update({
    privilegeIds: newPrivileges
  }, {
    where: {
      id
    }
  });

  return Role.findById(id);
};

const removePrivileges = async(id, privilegeIds, action) => {
  const role = await Role.findById(id);

  if (!role) {
    throw boom.notFound();
  }

  const filtered = role.privilegeIds.filter(p => !privilegeIds.includes(p));

  await Role.update({
    privilegeIds: filtered
  }, {
    where: {
      id
    }
  });
  return Role.findById(id);
};

module.exports = {
  read,
  search,
  create,
  update,
  remove,
  readPrivileges,
  addPrivileges,
  removePrivileges
};
