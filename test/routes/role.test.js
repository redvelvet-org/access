const request = require('supertest');
const sinon = require('sinon');
const {
  expect
} = require('chai');
const uuid = require('uuid');
const server = require('../../src');
const { Role, Privilege } = require('../../src/models');
const roleActions = require('../../src/services/roles');

describe('v1/role', () => {
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
      const res = await request(server)
        .get(`/v1/roles/${role.id}`);
      expect(res.statusCode).to.equal(200);
    });

    it('should throw 404 if not found id', async() => {
      const res = await request(server)
        .get(`/v1/roles/${uuid.v4()}`);
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('search', () => {
    it('should work for valid id', async() => {
      const role1 = await Role.create({
        name: 'Role-A'
      });
      const role2 = await Role.create({
        name: 'Role-A'
      });
      const res = await request(server)
        .get(`/v1/roles`)
        .query({
          ids: [role1.id, role2.id]
        });
      expect(res.statusCode).to.equal(200);
    });

    it('should throw 404 if not found id', async() => {
      const res = await request(server)
        .get(`/v1/roles`)
        .query({
          ids: [uuid.v4(), uuid.v4()]
        });
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('post', () => {
    it('should work for valid body', async() => {
      const res = await request(server)
        .post('/v1/roles')
        .send({
          name: 'Role-A'
        });
      expect(res.statusCode).to.equal(200);
    });
    it('should throw error on invalid req', async() => {
      sandbox.stub(roleActions, 'create').throws();
      const res = await request(server)
        .post('/v1/roles')
        .send({
          name: 'Role-A'
        });
      expect(res.statusCode).to.equal(500);
    });
  });

  describe('update', () => {
    it('should work for valid body', async() => {
      const role = await Role.create({
        name: 'Role-A'
      });
      const res = await request(server)
        .put(`/v1/roles/${role.id}`)
        .send({
          name: 'Role-B'
        });
      expect(res.statusCode).to.equal(200);
    });

    it('should throw error for invalid req', async() => {
      await Role.create({
        name: 'Role-A'
      });
      const res = await request(server)
        .put(`/v1/roles/${uuid.v4()}`)
        .send({
          name: 'Role-B'
        });
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('delete', () => {
    it('should work for valid request', async() => {
      const role = await Role.create({
        name: 'Role-A'
      });
      const res = await request(server)
        .delete(`/v1/roles/${role.id}`);
      expect(res.statusCode).to.equal(200);
    });
    it('should throw error if failed', async() => {
      const res = await request(server)
        .delete(`/v1/roles/${uuid.v4()}`);
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('get privilges ', () => {
    it('should work for valid id', async() => {
      const privilege = await Privilege.create({
        name: 'privilege-A',
        scope: 'admin'
      });

      const role = await Role.create({
        name: 'Role-A',
        privilegeIds: [privilege.id]
      });

      const res = await request(server)
        .get(`/v1/roles/${role.id}/privileges`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.deep.equal([privilege.id]);
    });

    it('should throw 404 if not found id', async() => {
      const res = await request(server)
        .get(`/v1/roles/${uuid.v4()}/privileges`);
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('add privilege', () => {
    it('should add privilege for valid request', async() => {
      const privilege = await Privilege.create({
        name: 'privilege-A',
        scope: 'admin'
      });

      const role = await Role.create({
        name: 'Role-A'
      });

      const res = await request(server)
        .put(`/v1/roles/${role.id}/privileges`)
        .send({
          privilegeIds: [privilege.id],
          action: 'add'
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body.privilegeIds).to.deep.equal([privilege.id]);
    });

    it('should throw error on invalid privileges', async() => {
      const role = await Role.create({
        name: 'Role-A'
      });

      const res = await request(server)
        .put(`/v1/roles/${role.id}/privileges`)
        .send({
          privilegeIds: [uuid.v4()],
          action: 'add'
        });

      expect(res.statusCode).to.equal(400);
    });

    it('should throw error on invalid role', async() => {
      const res = await request(server)
        .put(`/v1/roles/${uuid.v4()}/privileges`)
        .send({
          privilegeIds: [uuid.v4()],
          action: 'add'
        });

      expect(res.statusCode).to.equal(404);
    });

    it('should throw error on invalid role id format', async() => {
      const res = await request(server)
        .put(`/v1/roles/123/privileges`)
        .send({
          privilegeIds: [uuid.v4()],
          action: 'add'
        });
      expect(res.statusCode).to.equal(400);
    });

    it('should work on duplicate privilege ids', async() => {
      const role = await Role.create({
        name: 'Role-A'
      });

      const privilege = await Privilege.create({
        name: 'privilege-A',
        scope: 'admin'
      });
      const res = await request(server)
        .put(`/v1/roles/${role.id}/privileges`)
        .send({
          privilegeIds: [privilege.id, privilege.id],
          action: 'add'
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body.privilegeIds).to.deep.equal([privilege.id]);
    });
  });

  describe('remove privileges', () => {
    it('should remove privilege for valid request', async() => {
      const privilege1 = await Privilege.create({
        name: 'Priv-A',
        scope: 'admin'
      });

      const privilege2 = await Privilege.create({
        name: 'Priv-B',
        scope: 'admin'
      });

      const role = await Role.create({
        name: 'Role-A',
        privilegeIds: [privilege1.id, privilege2.id]
      });

      const res = await request(server)
        .put(`/v1/roles/${role.id}/privileges`)
        .send({
          privilegeIds: [privilege1.id],
          action: 'remove'
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body.privilegeIds).to.deep.equal([privilege2.id]);
    });

    it('should not remove privilege for invalid request', async() => {
      const privilege1 = await Privilege.create({
        name: 'privilege-A',
        scope: 'admin'
      });

      const privilege2 = await Privilege.create({
        name: 'privilege-B',
        scope: 'admin'
      });

      const role = await Role.create({
        name: 'Role-A',
        privilegeIds: [privilege1.id, privilege2.id]
      });

      const res = await request(server)
        .put(`/v1/roles/${role.id}/privileges`)
        .send({
          privilegeIds: [uuid.v4()],
          action: 'remove'
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body.privilegeIds).to.deep.equal([privilege1.id, privilege2.id]);
    });

    it('should not respond with 200 if role id is wrong', async() => {
      const res = await request(server)
        .put(`/v1/roles/${uuid.v4()}/privileges`)
        .send({
          privilegeIds: [uuid.v4()],
          action: 'remove'
        });
      expect(res.statusCode).to.equal(404);
    });

    it('should not respond with 200 if action is wrong', async() => {
      const res = await request(server)
        .put(`/v1/roles/${uuid.v4()}/privileges`)
        .send({
          privilegeIds: [uuid.v4()],
          action: 'unknown'
        });
      expect(res.statusCode).to.equal(400);
    });
  });
});
