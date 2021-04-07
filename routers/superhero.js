const { Router } = require('express');
const paginate = require('../middlewares/paginate.mw');
const SuperheroController = require('../controller/superhero');

const superheroRouter = Router();

superheroRouter.get('/', paginate, SuperheroController.getSuperheroes);
superheroRouter.post('/', SuperheroController.createSuperhero);

superheroRouter.get('/:heroId', SuperheroController.getSuperhero);
superheroRouter.patch('/:heroId', SuperheroController.updateSuperhero);
superheroRouter.delete('/:heroId', SuperheroController.deleteSuperpower);

module.exports = superheroRouter;
