const { Router } = require('express');
const superheroRouter = require('./superhero');
const superpowerRouter = require('./superpower');

const router = Router();

router.use('/superhero', superheroRouter);
router.use('/superpower', superpowerRouter);

module.exports = router;
