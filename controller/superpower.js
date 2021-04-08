const createError = require('http-errors');
const { Superpower, Superhero } = require('../models');

module.exports.createSuperpower = async (req, res, next) => {
  try {
    const { body } = req;

    const createdPower = await Superpower.create(body);

    if (!createdPower) {
      return next(createError(400, 'Superpower cant be create'));
    }

    res.status(201).send({ data: createdPower });
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperpower = async (req, res, next) => {
  try {
    const {
      params: { powerId },
    } = req;

    const power = await Superpower.findByPk(powerId);

    if (!power) {
      return next(createError(404, "Superpower doesn't exist"));
    }

    res.send({ data: power });
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperpowers = async (req, res, next) => {
  try {
    const powers = await findAll();
    if (!powers.length) {
      return next(createError(404, 'Superheroes not found'));
    }
    res.send({ data: heroes });
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperpowersByHero = async (req, res, next) => {
  try {
    const {
      params: { heroId },
    } = req;

    const powers = await findAll({ where: { id: heroId } });

    if (!powers.length) {
      return next(createError(404, 'Superpowers not found'));
    }

    res.send({ data: powers });
  } catch (err) {
    next(err);
  }
};

module.exports.updateSuperpower = async (req, res, next) => {
  try {
    const {
      body,
      params: { powerId },
    } = req;

    const [affectedRows, [updatedPower]] = await Superpower.update(body, {
      where: { id: powerId },
      returning: true,
    });

    if (affectedRows !== 1) {
      return next(createError(400, 'Superpower cant be updated'));
    }

    res.send({ data: updatedPower });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperpower = async (req, res, next) => {
  try {
    const {
      params: { powerId },
    } = req;

    const affectedRows = await Superpower.destroy({ where: { id: powerId } });

    if (affectedRows !== 1) {
      return next(createError(404, "Superpower doesn't exist"));
    }
    res.send({ data: affectedRows });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteSuperpowersbySuperhero = async (req, res, next) => {
  try {
    const {
      params: { heroId },
    } = req;

    const hero = await Superhero.findByPk(heroId);

    if (!hero) {
      return next(createError(404, 'Superhero not found'));
    }

    const powers = await Superpower.getSuperpowers();

    if (!powers.length) {
      return next(createError(404, 'Superpowers not found'));
    }

    const result = await hero.removeSuperpowers(powers);
    // console.log(result);
    res.send({ data: { result } });
  } catch (err) {
    next(err);
  }
};

module.exports.addSuperpowertoSuperhero = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
