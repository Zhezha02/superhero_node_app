const path = require('path');
const { Router } = require('express');
const multer = require('multer');
// const paginate = require('../middlewares/paginate.mw');
const ImageController = require('../controller/image');
const { STATIC_PATH } = require('../config/config');

const imageRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STATIC_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({ storage });


imageRouter.post('/:heroId', upload.single('image'), ImageController.createImage);

module.exports = imageRouter;
