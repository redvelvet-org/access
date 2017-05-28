const { Router } = require('express');
const roles = require('./roles');
const privileges = require('./privileges');
const rolePrivileges = require('./role_privileges');

const router = new Router();

router.get('/health', (req, res) => {
  res.status(200).send('💪');
});

router.use(roles);
router.use(privileges);
router.use(rolePrivileges);

module.exports = router;
