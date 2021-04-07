const { Router } = require('express');
const paginate = require('../middlewares/paginate.mw');
const SuperpowerController = require('../controller/superpower');

const superpowerRouter = Router();

// superpowerRouter.get('/');
superpowerRouter.post('/', SuperpowerController.createSuperpower);

superpowerRouter.get('/:powerId', SuperpowerController.getSuperpower);
superpowerRouter.patch('/:powerId', SuperpowerController.updateSuperpower);
superpowerRouter.delete('/:powerId', SuperpowerController.deleteSuperpower);

module.exports = superpowerRouter;
