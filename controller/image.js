const createError = require('http-errors');
const { Image, Superhero } = require('../models');

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

module.exports.getImage = async (req, res, next) => {
  try {
    const {
      params: { imageId },
    } = req;

    const image = await Image.findByPk(imageId);
    if (!image) {
      return next(createError(404, 'Image not found'));
    }
    res.send({ data: image });
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperheroImages = async (req, res, next) => {
  try {
    const {
      params: { heroId },
      pagination = {},
    } = req;

    const images = await Image.findAll({
      where: { superheroId: heroId },
      ...pagination,
    });
    if (!images.length) {
      return next(createError(404, 'Images not found'));
    }
    res.send({ data: images });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteImage = async (req, res, next) => {
  try {
    const {
      params: { imageId },
    } = req;

    const affectedRows = await Image.destroy({
      where: { id: imageId },
    });
    if (affectedRows !== 1) {
      return next(createError(404, 'Image not exist'));
    }
    res.send({ data: affectedRows });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperheroImages = async (req, res, next) => {
  try {
    const {
      params: { heroId },
    } = req;
    const affectedRows = await Image.destroy({
      where: { superheroId: heroId },
    });
    if (!affectedRows) {
      return next(createError(404, 'Images not exist'));
    }
    res.send({ data: affectedRows });
  } catch (err) {
    next(err);
  }
};
