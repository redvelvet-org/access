const request = require('supertest');
const sinon = require('sinon');
const {
  expect
} = require('chai');
const uuid = require('uuid');
const server = require('../../src');
const { Role, Privilege, RolePrivilege } = require('../../src/models');
const rolePrivilegeActions = require('../../src/services/role_privileges');

describe.skip('v1/role-privilege', () => {
  let sandbox = null;
  beforeEach(async() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('get', () => {
    it('should work for valid id', async() => {
      const role = await Role.create({
        name: 'Role-A'
      });
      const privilege = await Privilege.create({
        name: 'Privilege-A',
        scope: 'admin'
      });
      const rolePrivilege = await RolePrivilege.create({
        roleId: role.id,
        privilegeId: privilege.id
      });
      const res = await request(server)
        .get(`/v1/role-privileges/${rolePrivilege.id}`);
      expect(res.statusCode).to.equal(200);
    });

    it('should throw 404 if not found id', async() => {
      const res = await request(server)
        .get(`/v1/role-privileges/${uuid.v4()}`);
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('search', () => {
    it('should work for valid id', async() => {
      const role1 = await Role.create({
        name: 'Role-A'
      });
      const privilege1 = await Privilege.create({
        name: 'Privilege-A',
        scope: 'admin'
      });
      const rolePrivilege1 = await RolePrivilege.create({
        roleId: role1.id,
        privilegeId: privilege1.id
      });
      const role2 = await Role.create({
        name: 'Role-A'
      });
      const privilege2 = await Privilege.create({
        name: 'Privilege-A',
        scope: 'admin'
      });
      const rolePrivilege2 = await RolePrivilege.create({
        roleId: role2.id,
        privilegeId: privilege2.id
      });
      const res = await request(server)
        .get(`/v1/role-privileges`)
        .query({
          ids: [rolePrivilege1.id, rolePrivilege2.id]
        });
      expect(res.statusCode).to.equal(200);
    });

    it('should throw 404 if not found id', async() => {
      const res = await request(server)
        .get(`/v1/role-privileges`)
        .query({
          ids: [uuid.v4(), uuid.v4()]
        });
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('post', () => {
    it('should work for valid body', async() => {
      const role = await Role.create({
        name: 'Role-A'
      });
      const privilege = await Privilege.create({
        name: 'Privilege-A',
        scope: 'admin'
      });
      const res = await request(server)
        .post('/v1/role-privileges')
        .send({
          roleId: role.id,
          privilegeId: privilege.id
        });
      expect(res.statusCode).to.equal(200);
    });
    it('should throw error on invalid req', async() => {
      sandbox.stub(rolePrivilegeActions, 'create').throws();
      const res = await request(server)
        .post('/v1/role-privileges')
        .send({
          roleId: uuid.v4(),
          privilegeId: uuid.v4()
        });
      expect(res.statusCode).to.equal(500);
    });
  });

  describe('update', () => {
    it('should work for valid body', async() => {
      const role = await Role.create({
        name: 'Role-A'
      });
      const privilege = await Privilege.create({
        name: 'Privilege-A',
        scope: 'admin'
      });
      const rolePrivilege = await RolePrivilege.create({
        roleId: role.id,
        privilegeId: privilege.id
      });

      const newPrivilege = await Privilege.create({
        name: 'Privilege-B',
        scope: 'admin'
      });
      const res = await request(server)
        .put(`/v1/role-privileges/${rolePrivilege.id}`)
        .send({
          roleId: role.id,
          privilegeId: newPrivilege.id
        });
      expect(res.statusCode).to.equal(200);
    });

    it('should throw error for invalid req', async() => {
      const role = await Role.create({
        name: 'Role-A'
      });
      const privilege = await Privilege.create({
        name: 'Privilege-A',
        scope: 'admin'
      });
      const res = await request(server)
        .put(`/v1/role-privileges/${uuid.v4()}`)
        .send({
          roleId: role.id,
          privilegeId: privilege.id
        });
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('delete', () => {
    it('should work for valid request', async() => {
      const role = await Role.create({
        name: 'Role-A'
      });
      const privilege = await Privilege.create({
        name: 'Privilege-A',
        scope: 'admin'
      });
      const rolePrivilege = await RolePrivilege.create({
        roleId: role.id,
        privilegeId: privilege.id
      });
      const res = await request(server)
        .delete(`/v1/role-privileges/${rolePrivilege.id}`);
      expect(res.statusCode).to.equal(200);
    });
    it('should throw error if failed', async() => {
      const res = await request(server)
        .delete(`/v1/role-privileges/${uuid.v4()}`);
      expect(res.statusCode).to.equal(404);
    });
  });
});
