const { Router } = require('express');
const entityActions = require('../services/entities');
const validation = require('../validations/entities');

const router = new Router();

router.get('/v1/entities/:id', validation.read, async (req, res, next) => {
  try {
    const entity = await entityActions.read(req.params.id);
    res.json(entity);
  } catch (e) {
    next(e);
  }
});

router.get('/v1/entities/', validation.search, async (req, res, next) => {
  try {
    const entities = await entityActions.search(req.query.ids);
    res.json(entities);
  } catch (e) {
    next(e);
  }
});

router.post('/v1/entities', validation.create, async (req, res, next) => {
  try {
    const entity = await entityActions.create(req.body);
    res.json(entity);
  } catch (e) {
    next(e);
  }
});

router.put('/v1/entities/:id', validation.update, async (req, res, next) => {
  try {
    const entity = await entityActions.update(req.params.id, req.body);
    res.json(entity);
  } catch (e) {
    next(e);
  }
});

router.delete('/v1/entities/:id', validation.remove, async (req, res, next) => {
  try {
    const entity = await entityActions.remove(req.params.id);
    res.json(entity);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
