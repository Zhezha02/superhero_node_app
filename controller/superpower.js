const createError = require('http-errors');
const { Superpower } = require('../models');

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
    const powers = findAll();
    if (!powers.length) {
      return next(createError(404, 'Superheroes not found'));
    }
    res.send({ data: heroes });
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


