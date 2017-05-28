const request = require('supertest');
const sinon = require('sinon');
const {
  expect
} = require('chai');
const uuid = require('uuid');
const server = require('../../src');
const { Role } = require('../../src/models');
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
});
