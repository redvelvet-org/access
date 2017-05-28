const boom = require('boom');
const { RolePrivilege } = require('../models');

const read = async (id) => {
  const rolePrivilege = await RolePrivilege.findById(id);

  if (!rolePrivilege) {
    throw boom.notFound();
  }

  return rolePrivilege;
};

const search = async (ids) => {
  const roles = await RolePrivilege.findAll({
    where: {
      id: ids
    }
  });

  if (!roles.length) {
    throw boom.notFound();
  }

  return roles;
};

const create = (rolePrivilege) => RolePrivilege.create({
  roleId: rolePrivilege.roleId,
  privilegeId: rolePrivilege.privilegeId
});

const update = async (id, body) => {
  const rolePrivilege = await RolePrivilege.findById(id);

  if (!rolePrivilege) {
    throw boom.notFound();
  }

  const roleId = body.roleId || rolePrivilege.roleId;
  const privilegeId = body.privilegeId || rolePrivilege.privilegeId;

  return RolePrivilege.update({
    roleId,
    privilegeId
  }, {
    where: {
      id
    }
  });
};

const remove = async (id) => {
  const rolePrivilege = await RolePrivilege.findById(id);

  if (!rolePrivilege) {
    throw boom.notFound();
  }

  return RolePrivilege.destroy({
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
