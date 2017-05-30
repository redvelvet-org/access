const { Router } = require('express');
const boom = require('boom');
const privilegesAction = require('../services/privileges');
const validation = require('../validations/privileges');

const router = new Router();

router.get('/v1/privileges/:id', validation.read, async (req, res, next) => {
  try {
    const privilege = await privilegesAction.read(req.params.id);
    res.json(privilege);
  } catch (e) {
    next(e);
  }
});

router.get('/v1/privileges/', validation.search, async (req, res, next) => {
  try {
    const privileges = await privilegesAction.search(req.query.ids);
    res.json(privileges);
  } catch (e) {
    next(e);
  }
});

router.post('/v1/privileges', validation.create, async (req, res, next) => {
  try {
    const privilege = await privilegesAction.create(req.body);
    res.json(privilege);
  } catch (e) {
    next(e);
  }
});

router.put('/v1/privileges/:id', validation.update, async (req, res, next) => {
  try {
    const privilege = await privilegesAction.update(req.params.id, req.body);
    res.json(privilege);
  } catch (e) {
    next(e);
  }
});

router.delete('/v1/privileges/:id', validation.remove, async (req, res, next) => {
  try {
    const privilege = await privilegesAction.remove(req.params.id);
    res.json(privilege);
  } catch (e) {
    next(e);
  }
});

router.get('/v1/privileges/:id/roles', validation.read, async (req, res, next) => {
  try {
    const roles = await privilegesAction.readRoles(req.params.id);
    res.json(roles);
  } catch (e) {
    next(e);
  }
});

router.put('/v1/privileges/:id/roles', validation.manageRoles, async (req, res, next) => {
  try {
    let roles;

    if (req.body.action === 'add') {
      roles = await privilegesAction.addRoles(req.params.id, req.body.roleIds);
    } else if (req.body.action === 'remove') {
      roles = await privilegesAction.removeRoles(req.params.id, req.body.roleIds);
    } else {
      throw boom.badRequest();
    }

    res.json(roles);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
