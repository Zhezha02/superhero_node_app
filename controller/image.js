const createError = require('http-errors');
const { Image } = require('../models');

module.exports.createImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { heroId },
    } = req;

    const imageInstanse = await Image.create({
      name: filename,
      superheroId: heroId,
    });
    console.log(imageIstan);

    if (!imageInstanse) {
      return next(createError(400, "Image can't be upload"));
    }

    res.send(imageInstanse);
  } catch (err) {
    next(err);
  }
};
