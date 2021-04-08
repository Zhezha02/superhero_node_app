const { Router } = require('express');
const paginate = require('../middlewares/paginate.mw');
const SuperheroController = require('../controller/superhero');
const upload = require('../middlewares/multer.mw');

const superheroRouter = Router();

superheroRouter.get('/', paginate, SuperheroController.getSuperheroes);
superheroRouter.post('/', upload.any(), SuperheroController.createSuperhero);

superheroRouter.get('/:heroId', SuperheroController.getSuperhero);
superheroRouter.patch('/:heroId', upload.any(), SuperheroController.updateSuperhero);
superheroRouter.delete('/:heroId', SuperheroController.deleteSuperpower);

module.exports = superheroRouter;
