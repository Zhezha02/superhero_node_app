const { Router } = require('express');
const paginate = require('../middlewares/paginate.mw');
const SuperheroController = require('../controller/superhero');
const upload = require('../middlewares/multer.mw');
const imageRouter = require('./image');
const heroPowerRouter = require('./heroPower');

const superheroRouter = Router();

superheroRouter
  .path('/')
  .get(paginate, SuperheroController.getSuperheroes)
  .post(upload.any(), SuperheroController.createSuperhero);

superheroRouter
  .path('/:heroId')
  .get(SuperheroController.getSuperhero)
  .patch(upload.any(), SuperheroController.updateSuperhero)
  .delete(SuperheroController.deleteSuperpower);

superheroRouter.use('/:heroId/superpowers', heroPowerRouter);
superheroRouter.use('/:heroId/images', imageRouter);

module.exports = superheroRouter;
