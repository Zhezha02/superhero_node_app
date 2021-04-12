const createError = require('http-errors');
const _ = require('lodash');
const { Superhero, Image, Superpower } = require('../models');

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const {
      body,
      files,
      body: { superpowers = [] },
    } = req;

    const createdHero = await Superhero.create(
      _.pick(body, ['realName', 'nickname', 'originDescription', 'catchPhrase'])
    );
    if (!createdHero) {
      return next(createError(400, 'Superhero cant be create'));
    }

    const {
      dataValues: { id },
    } = createdHero;

    if (files) {
      const createdImages = await Image.bulkCreate(
        files.map(({ filename }) => ({
          name: filename,
          superheroId: id,
        })),
        {
          fields: ['name', 'superheroId'],
          returning: true,
        }
      );

      if (!createdImages.length && files.length) {
        return next(createError(400, "Can't uploud images"));
      }
    }

    if (superpowers.length) {
      const powers = await Superpower.findAll({
        where: { id: [...superpowers] },
      });
      await createdHero.addSuperpowers(powers);
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
      body: { superpowers = [] },
      params: { heroId },
      files,
    } = req;

    if (files) {
      const createdImages = await Image.bulkCreate(
        files.map(({ filename }) => ({
          name: filename,
          superheroId: heroId,
        })),
        {
          fields: ['name', 'superheroId'],
          returning: true,
        }
      );

      if (!createdImages.length && files.length) {
        return next(createError(400, "Can't uploud images"));
      }
    }
    const validateBody = _.pick(body, [
      'realName',
      'nickname',
      'originDescription',
      'catchPhrase',
    ]);
    console.log('validateBody', validateBody);
    console.log('heroId', heroId);

    const [affectedRows, [updatedHero]] = await Superhero.update(validateBody, {
      where: { id: heroId },
      returning: true,
    });

    console.log('updatedHero', updatedHero);

    if (affectedRows !== 1) {
      return next(createError(400, 'Superhero cant be updated'));
    }

    if (superpowers.length) {
      const powers = await Superpower.findAll({
        where: { id: [...superpowers] },
      });
      console.log('POWERS', powers);
      await updatedHero.addSuperpowers(powers);
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
