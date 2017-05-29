const request = require('supertest');
const sinon = require('sinon');
const {
  expect
} = require('chai');
const uuid = require('uuid');
const server = require('../../src');
const { Privilege, Role } = require('../../src/models');
const privilegesAction = require('../../src/services/privileges');

describe('v1/privilege', () => {
  let sandbox = null;
  beforeEach(async() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('get', () => {
    it('should work for valid id', async() => {
      const privilege = await Privilege.create({
        name: 'privilege-A',
        scope: 'admin'
      });
      const res = await request(server)
        .get(`/v1/privileges/${privilege.id}`);
      expect(res.statusCode).to.equal(200);
    });

    it('should throw 404 if not found id', async() => {
      const res = await request(server)
        .get(`/v1/privileges/${uuid.v4()}`);
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('search', () => {
    it('should work for valid id', async() => {
      const privilege1 = await Privilege.create({
        name: 'privilege-A',
        scope: 'admin'
      });
      const privilege2 = await Privilege.create({
        name: 'privilege-A',
        scope: 'customer'
      });
      const res = await request(server)
        .get(`/v1/privileges`)
        .query({
          ids: [privilege1.id, privilege2.id]
        });
      expect(res.statusCode).to.equal(200);
    });

    it('should throw 404 if not found id', async() => {
      const res = await request(server)
        .get(`/v1/privileges`)
        .query({
          ids: [uuid.v4(), uuid.v4()]
        });
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('post', () => {
    it('should work for valid body', async() => {
      const res = await request(server)
        .post('/v1/privileges')
        .send({
          name: 'privilege-A',
          scope: 'admin'
        });
      expect(res.statusCode).to.equal(200);
    });
    it('should throw error on invalid req', async() => {
      sandbox.stub(privilegesAction, 'create').throws();
      const res = await request(server)
        .post('/v1/privileges')
        .send({
          name: 'privilege-A',
          scope: 'admin'
        });
      expect(res.statusCode).to.equal(500);
    });
  });

  describe('update', () => {
    it('should work for valid body', async() => {
      const privilege = await Privilege.create({
        name: 'privilege-A',
        scope: 'admin'
      });
      const res = await request(server)
        .put(`/v1/privileges/${privilege.id}`)
        .send({
          name: 'privilege-B',
          scope: 'admin'
        });
      expect(res.statusCode).to.equal(200);
    });

    it('should throw error for invalid req', async() => {
      await Privilege.create({
        name: 'privilege-A',
        scope: 'admin'
      });
      const res = await request(server)
        .put(`/v1/privileges/${uuid.v4()}`)
        .send({
          name: 'privilege-B',
          scope: 'admin'
        });
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('delete', () => {
    it('should work for valid request', async() => {
      const privilege = await Privilege.create({
        name: 'privilege-A',
        scope: 'admin'
      });
      const res = await request(server)
        .delete(`/v1/privileges/${privilege.id}`);
      expect(res.statusCode).to.equal(200);
    });
    it('should throw error if failed', async() => {
      const res = await request(server)
        .delete(`/v1/privileges/${uuid.v4()}`);
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('get roles', () => {
    it('should work for valid id', async() => {
      const role = await Role.create({
        name: 'Role-A'
      });

      const privilege = await Privilege.create({
        name: 'privilege-A',
        scope: 'admin',
        roleIds: [ role.id ]
      });

      const res = await request(server)
        .get(`/v1/privileges/${privilege.id}/roles`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.deep.equal([ role.id ]);
    });

    it('should throw 404 if not found id', async() => {
      const res = await request(server)
        .get(`/v1/privileges/${uuid.v4()}/roles`);
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('add role', () => {
    it('should add role for valid request', async () => {
      const role = await Role.create({
        name: 'Role-A'
      });

      const privilege = await Privilege.create({
        name: 'privilege-A',
        scope: 'admin'
      });

      const res = await request(server)
        .put(`/v1/privileges/${privilege.id}/roles`)
        .send({
          roleIds: [role.id]
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body.roleIds).to.deep.equal([ role.id ]);
    });
  });
  it('should throw error on invalid roles', async() => {
    const privilege = await Privilege.create({
      name: 'privilege-A',
      scope: 'admin'
    });

    const res = await request(server)
      .put(`/v1/privileges/${privilege.id}/roles`)
      .send({
        roleIds: [uuid.v4()]
      });

    expect(res.statusCode).to.equal(400);
  });

  it('should throw error on invalid privilege', async() => {
    const res = await request(server)
      .put(`/v1/privileges/${uuid.v4()}/roles`)
      .send({
        roleIds: [uuid.v4()]
      });

    expect(res.statusCode).to.equal(404);
  });

  it('should throw error on invalid privilege id format', async() => {
    const res = await request(server)
      .put(`/v1/privileges/123/roles`)
      .send({
        roleIds: [uuid.v4()]
      });
    expect(res.statusCode).to.equal(400);
  });

  it('should work on duplicate role ids', async() => {
    const role = await Role.create({
      name: 'Role-A'
    });

    const privilege = await Privilege.create({
      name: 'privilege-A',
      scope: 'admin'
    });
    const res = await request(server)
      .put(`/v1/privileges/${privilege.id}/roles`)
      .send({
        roleIds: [role.id, role.id]
      });

    expect(res.statusCode).to.equal(200);
    expect(res.body.roleIds).to.deep.equal([ role.id ]);
  });
});
