const { Router } = require('express');
const SuperpowerController = require('../controller/superpower');

const heroPowerRouter = Router();

heroPowerRouter
  .path('/:powerId')
  .put(SuperpowerController.addSuperpowerToSuperhero)
  .delete(SuperpowerController.deleteSuperpowersbySuperhero);

module.exports = heroPowerRouter;
