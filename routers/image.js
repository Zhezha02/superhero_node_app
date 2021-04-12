const { Router } = require('express');
const ImageController = require('../controller/image');
const upload = require('../middlewares/multer.mw');
const pagination = require('../middlewares/paginate.mw');

const imageRouter = Router();

imageRouter
  .route('/:heroId/images')
  .post(upload.single('image'), ImageController.createImage)
  .delete(ImageController.deleteSuperheroImages)
  .get(pagination, ImageController.getSuperheroImages);

imageRouter
  .route('/:heroId/images/:imageId')
  .delete(ImageController.deleteImage);

module.exports = imageRouter;
