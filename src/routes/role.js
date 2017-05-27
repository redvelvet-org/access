const { Router } = require('express');
const Joi = require('joi');
const Celebrate = require('celebrate');

const router = new Router();

const validation = Celebrate({
  params: {
    id: Joi.string().guid().description('Role ID').required()
  }
});

router.get('/v1/roles/:id', validation, (req, res) => {
  res.json({ under: 'construction' });
});

module.exports = router;
