const { Router } = require('express');
const rolePrivilegeActions = require('../services/role_privileges');
const validation = require('../validations/role_privileges');

const router = new Router();

router.get('/v1/role-privileges/:id', validation.read, async (req, res, next) => {
  try {
    const role = await rolePrivilegeActions.read(req.params.id);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.get('/v1/role-privileges/', validation.search, async (req, res, next) => {
  try {
    const role = await rolePrivilegeActions.search(req.query.ids);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.post('/v1/role-privileges', validation.create, async (req, res, next) => {
  try {
    const role = await rolePrivilegeActions.create(req.body);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.put('/v1/role-privileges/:id', validation.update, async (req, res, next) => {
  try {
    const role = await rolePrivilegeActions.update(req.params.id, req.body);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.delete('/v1/role-privileges/:id', validation.remove, async (req, res, next) => {
  try {
    const role = await rolePrivilegeActions.remove(req.params.id, req.body);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
