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
    const { pagination = {} } = req;
    const powers = await Superpower.findAll({ ...pagination });
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

//Power_to_hero

module.exports.getHeroPowers = async (req, res, next) => {
  try {
    const {
      params: { heroId },
    } = req;

    const hero = await Superhero.findByPk(heroId);
    if (!hero) {
      return next(createError(404, 'Superhero not found'));
    }

    const powers = await hero.getSuperpowers();

    if (!powers.length) {
      return next(createError(404, 'Superpowers not found'));
    }

    res.send({ data: powers });
  } catch (err) {
    next(err);
  }
};

module.exports.addPowerToHero = async (req, res, next) => {
  try {
    const {
      params: { heroId, powerId },
      params,
    } = req;

    const hero = await Superhero.findByPk(heroId);
    if (!hero) {
      return next(createError(404, 'Superhero not found'));
    }

    const power = await Superpower.findByPk(powerId);
    if (!power) {
      return next(createError(404, 'Superpower not found'));
    }

    await hero.addSuperpowers(power);

    const heroWithPowers = await Superhero.findByPk(heroId, {
      include: [
        {
          model: Superpower,
          attributes: [['name', 'power']],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.send({ data: heroWithPowers });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteHeroPowers = async (req, res, next) => {
  try {
    const {
      params: { heroId },
    } = req;

    const hero = await Superhero.findByPk(heroId);

    if (!hero) {
      return next(createError(404, 'Superhero not found'));
    }

    const powers = await hero.getSuperpowers();

    if (!powers.length) {
      return next(createError(404, 'Superpowers not found'));
    }

    const result = await hero.removeSuperpowers(powers);

    res.send({ data: { result } });
  } catch (err) {
    next(err);
  }
};
