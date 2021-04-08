const createError = require('http-errors');
const { Superhero, Image, Superpower } = require('../models');

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body, files } = req;

    const createdHero = await Superhero.create(body);

    if (!createdHero) {
      return next(createError(400, 'Superhero cant be create'));
    }

    const {
      dataValues: { id },
    } = createdHero;

    const insertImageRecords = files.map(({ filename }) => ({
      name: filename,
      superheroId: id,
    }));

    const createdImages = await Image.bulkCreate(insertImageRecords, {
      fields: ['name', 'superheroId'],
      returning: true,
    });

    if (!createdImages.length && files.length) {
      return next(createError(400, "Can't uploud images"));
    }

    res.status(201).send({ data: createdHero });
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperheroes = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const heroes = await Superhero.findAll({
      ...pagination,
      include: [
        {
          model: Image,
          attributes: [['name', 'image']],
        },
        {
          model: Superpower,
          attributes: [['name', 'superpower']],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!heroes.length) {
      return next(createError(404, 'Superheroes not found'));
    }

    res.send({ data: heroes });
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperhero = async (req, res, next) => {
  try {
    const {
      params: { heroId },
    } = req;

    const hero = await Superhero.findByPk(heroId, {
      include: [
        {
          model: Image,
          attributes: [['name', 'image']],
        },
        {
          model: Superpower,
          attributes: [['name', 'superpower']],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!hero) {
      return next(createError(404, "Superhero doesn't exist"));
    }

    res.send({ data: hero });
  } catch (err) {
    next(err);
  }
};

module.exports.updateSuperhero = async (req, res, next) => {
  try {
    const {
      body,
      params: { heroId },
      files,
    } = req;

    const insertImageRecords = files.map(({ filename }) => ({
      name: filename,
      superheroId: heroId,
    }));

    const createdImages = await Image.bulkCreate(insertImageRecords, {
      fields: ['name', 'superheroId'],
      returning: true,
    });

    if (!createdImages.length && files.length) {
      return next(createError(400, "Can't uploud images"));
    }

    const [affectedRows, [updatedHero]] = await Superhero.update(body, {
      where: { id: heroId },
      returning: true,
    });

    if (affectedRows !== 1) {
      return next(createError(400, 'Superhero cant be updated'));
    }

    res.send({ data: updatedHero });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperpower = async (req, res, next) => {
  try {
    const {
      params: { heroId },
    } = req;

    const affectedRows = await Superhero.destroy({ where: { id: heroId } });

    if (affectedRows !== 1) {
      return next(createError(404, "Superhero doesn't exist"));
    }
    res.send({ data: affectedRows });
  } catch (err) {
    next(err);
  }
};
