const { Router } = require('express');
const ImageController = require('../controller/image');
const upload = require('../middlewares/multer.mw');
const pagination = require('../middlewares/paginate.mw');

const imageRouter = Router();

imageRouter.post(
  '/:heroId',
  upload.single('image'),
  ImageController.createImage
);

imageRouter.get('/:imageId', ImageController.getImage);
imageRouter.get(
  '/superhero/:heroId',
  pagination,
  ImageController.getSuperheroImages
);

imageRouter.delete('/:imageId', ImageController.deleteImage);
imageRouter.delete('/superhero/:heroId', ImageController.deleteSuperheroImages);

module.exports = imageRouter;
