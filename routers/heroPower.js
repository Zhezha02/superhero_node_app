const { Router } = require('express');
const SuperpowerController = require('../controller/superpower');

const heroPowerRouter = Router();

heroPowerRouter
  .route('/:heroId/superpowers/:powerId')
  .put(SuperpowerController.addPowerToHero);

heroPowerRouter
  .route('/:heroId/superpowers/')
  .get(SuperpowerController.getHeroPowers)
  .delete(SuperpowerController.deleteHeroPowers);

module.exports = heroPowerRouter;
