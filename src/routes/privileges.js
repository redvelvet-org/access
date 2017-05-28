const { Router } = require('express');
const privilegesAction = require('../services/privileges');
const validation = require('../validations/privileges');

const router = new Router();

router.get('/v1/privileges/:id', validation.read, async (req, res, next) => {
  try {
    const role = await privilegesAction.read(req.params.id);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.get('/v1/privileges/', validation.search, async (req, res, next) => {
  try {
    const role = await privilegesAction.search(req.query.ids);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.post('/v1/privileges', validation.create, async (req, res, next) => {
  try {
    const role = await privilegesAction.create(req.body);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.put('/v1/privileges/:id', validation.update, async (req, res, next) => {
  try {
    const role = await privilegesAction.update(req.params.id, req.body);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

router.delete('/v1/privileges/:id', validation.remove, async (req, res, next) => {
  try {
    const role = await privilegesAction.remove(req.params.id, req.body);
    res.json(role);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
