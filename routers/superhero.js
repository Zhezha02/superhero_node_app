const { Router } = require('express');
const paginate = require('../middlewares/paginate.mw');
const SuperheroController = require('../controller/superhero');
const upload = require('../middlewares/multer.mw');
const imageRouter = require('./image');
const heroPowerRouter = require('./heroPower');

const superheroRouter = Router();

superheroRouter
  .route('/')
  .get(paginate, SuperheroController.getSuperheroes)
  .post(upload.any(), SuperheroController.createSuperhero);

superheroRouter
  .route('/:heroId')
  .get(SuperheroController.getSuperhero)
  .patch(upload.any(), SuperheroController.updateSuperhero)
  .delete(SuperheroController.deleteSuperpower);

superheroRouter.use(heroPowerRouter);
superheroRouter.use(imageRouter);

module.exports = superheroRouter;
