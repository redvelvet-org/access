const request = require('supertest');
const sinon = require('sinon');
const {
  expect
} = require('chai');
const uuid = require('uuid');
const server = require('../../src');
const {
  Entity
} = require('../../src/models');
const entitiesAction = require('../../src/services/entities');

describe('v1/entities', () => {
  let sandbox = null;
  beforeEach(async() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('get', () => {
    it('should work for valid id', async() => {
      const entity = await Entity.create({
        name: 'entity-A'
      });
      const res = await request(server)
        .get(`/v1/entities/${entity.id}`);
      expect(res.statusCode).to.equal(200);
    });

    it('should throw 404 if not found id', async() => {
      const res = await request(server)
        .get(`/v1/entities/${uuid.v4()}`);
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('search', () => {
    it('should work for valid id', async() => {
      const entity1 = await Entity.create({
        name: 'entity-A'
      });
      const entity2 = await Entity.create({
        name: 'entity-A'
      });
      const res = await request(server)
        .get(`/v1/entities`)
        .query({
          ids: [entity1.id, entity2.id]
        });
      expect(res.statusCode).to.equal(200);
    });

    it('should throw 404 if not found id', async() => {
      const res = await request(server)
        .get(`/v1/entities`)
        .query({
          ids: [uuid.v4(), uuid.v4()]
        });
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('post', () => {
    it('should work for valid body', async() => {
      const res = await request(server)
        .post('/v1/entities')
        .send({
          name: 'entity-A'
        });
      expect(res.statusCode).to.equal(200);
    });
    it('should throw error on invalid req', async() => {
      sandbox.stub(entitiesAction, 'create').throws();
      const res = await request(server)
        .post('/v1/entities')
        .send({
          name: 'entity-A'
        });
      expect(res.statusCode).to.equal(500);
    });
  });

  describe('update', () => {
    it('should work for valid body', async() => {
      const entity = await Entity.create({
        name: 'entity-A'
      });
      const res = await request(server)
        .put(`/v1/entities/${entity.id}`)
        .send({
          name: 'entity-B'
        });
      expect(res.statusCode).to.equal(200);
    });

    it('should throw error for invalid req', async() => {
      await Entity.create({
        name: 'entity-A'
      });
      const res = await request(server)
        .put(`/v1/entities/${uuid.v4()}`)
        .send({
          name: 'entity-B'
        });
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('delete', () => {
    it('should work for valid request', async() => {
      const entity = await Entity.create({
        name: 'entity-A',
        scope: 'admin'
      });
      const res = await request(server)
        .delete(`/v1/entities/${entity.id}`);
      expect(res.statusCode).to.equal(200);
    });
    it('should throw error if failed', async() => {
      const res = await request(server)
        .delete(`/v1/entities/${uuid.v4()}`);
      expect(res.statusCode).to.equal(404);
    });
  });
});
