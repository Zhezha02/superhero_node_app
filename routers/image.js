const { Router } = require('express');
const ImageController = require('../controller/image');
const upload = require('../middlewares/multer.mw');
const pagination = require('../middlewares/paginate.mw');

const imageRouter = Router();

imageRouter
  .path('/')
  .post(upload.single('image'), ImageController.createImage)
  .delete(ImageController.deleteSuperheroImages)
  .get(pagination, ImageController.getSuperheroImages);

imageRouter
  .path('/:imageId')
  .get(ImageController.getImage)
  .delete(ImageController.deleteImage);

module.exports = imageRouter;
