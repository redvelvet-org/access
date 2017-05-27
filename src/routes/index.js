const { Router } = require('express');
const role = require('./role');

const router = new Router();

router.get('/health', (req, res) => {
  res.status(200).send('💪');
});

router.use(role);

module.exports = router;
