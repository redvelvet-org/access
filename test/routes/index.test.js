const request = require('supertest');
const sinon = require('sinon');
const {
  expect
} = require('chai');
const server = require('../../src');

describe('/health', () => {
  let sandbox = null;
  beforeEach(async() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('should work', () => {
    it('200', async() => {
      const res = await request(server)
        .get('/health');
      expect(res.statusCode).to.equal(200);
    });
  });
});
