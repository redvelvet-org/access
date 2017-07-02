const { Router } = require('express');
const boom = require('boom');
const userActions = require('../services/users');
const validation = require('../validations/user');

const router = new Router();

router.get('/v1/users/:id', validation.read, async (req, res, next) => {
  try {
    const role = await userActions.read(req.params.id);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.get('/v1/users/', validation.search, async (req, res, next) => {
  try {
    const role = await userActions.search(req.query.ids);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.post('/v1/users', validation.create, async (req, res, next) => {
  try {
    const role = await userActions.create(req.body);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.put('/v1/users/:id', validation.update, async (req, res, next) => {
  try {
    const role = await userActions.update(req.params.id, req.body);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.delete('/v1/users/:id', validation.remove, async (req, res, next) => {
  try {
    const role = await userActions.remove(req.params.id);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.get('/v1/users/:id/roles', validation.read, async (req, res, next) => {
  try {
    const roles = await userActions.readRoles(req.params.id);
    res.json(roles);
  } catch (e) {
    next(e);
  }
});

router.get('/v1/users/:id/entities', validation.read, async (req, res, next) => {
  try {
    const entities = await userActions.readEntities(req.params.id);
    res.json(entities);
  } catch (e) {
    next(e);
  }
});

router.put('/v1/users/:id/entities', validation.managePrivileges, async (req, res, next) => {
  try {
    let user;

    if (req.body.action === 'add') {
      user = await userActions.addEntities(req.params.id, req.body.entityIds);
    } else if (req.body.action === 'remove') {
      user = await userActions.removeEntities(req.params.id, req.body.entityIds);
    } else {
      throw boom.badRequest();
    }

    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.put('/v1/users/:id/roles', validation.managePrivileges, async (req, res, next) => {
  try {
    let user;

    if (req.body.action === 'add') {
      user = await userActions.addRoles(req.params.id, req.body.roleIds);
    } else if (req.body.action === 'remove') {
      user = await userActions.removeRoles(req.params.id, req.body.roleIds);
    } else {
      throw boom.badRequest();
    }

    res.json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
