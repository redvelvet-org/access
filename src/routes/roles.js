const { Router } = require('express');
const boom = require('boom');
const roleActions = require('../services/roles');
const validation = require('../validations/roles');

const router = new Router();

router.get('/v1/roles/:id', validation.read, async (req, res, next) => {
  try {
    const role = await roleActions.read(req.params.id);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.get('/v1/roles/', validation.search, async (req, res, next) => {
  try {
    const role = await roleActions.search(req.query.ids);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.post('/v1/roles', validation.create, async (req, res, next) => {
  try {
    const role = await roleActions.create(req.body);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.put('/v1/roles/:id', validation.update, async (req, res, next) => {
  try {
    const role = await roleActions.update(req.params.id, req.body);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.delete('/v1/roles/:id', validation.remove, async (req, res, next) => {
  try {
    const role = await roleActions.remove(req.params.id);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.get('/v1/roles/:id/privileges', validation.read, async (req, res, next) => {
  try {
    const role = await roleActions.readPrivileges(req.params.id);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.put('/v1/roles/:id/privileges', validation.managePrivileges, async (req, res, next) => {
  try {
    let role;

    if (req.body.action === 'add') {
      role = await roleActions.addPrivileges(req.params.id, req.body.privilegeIds);
    } else if (req.body.action === 'remove') {
      role = await roleActions.removePrivileges(req.params.id, req.body.privilegeIds);
    } else {
      throw boom.badRequest();
    }

    res.json(role);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
