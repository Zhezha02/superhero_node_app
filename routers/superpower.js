const { Router } = require('express');
const paginate = require('../middlewares/paginate.mw');
const SuperpowerController = require('../controller/superpower');

const superpowerRouter = Router();

superpowerRouter
  .route('/')
  .get(paginate, SuperpowerController.getSuperpowers)
  .post(SuperpowerController.createSuperpower);

superpowerRouter
  .route('/:powerId')
  .get(SuperpowerController.getSuperpower)
  .patch(SuperpowerController.updateSuperpower)
  .delete(SuperpowerController.deleteSuperpower);

module.exports = superpowerRouter;
