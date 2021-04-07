const createError = require('http-errors');
const { Superhero } = require('../models');

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body } = req;

    const createdHero = await Superhero.create(body);

    if (!createdHero) {
      return next(createError(400, 'Superhero cant be create'));
    }

    res.status(201).send({ data: createdHero });
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperheroes = async (req, res, next) => {
  try {
    const heroes = findAll();
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

    const hero = await Superhero.findByPk(heroId);

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
      params: {  heroId },
    } = req;

    console.log('!!!');
    const [affectedRows, [updatedHero]] = await Superhero.update(body, {
      where: { id: heroId },
      returning: true,
    });

    console.log(affectedRows);

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
