'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superhero extends Model {
    static associate (models) {
      Superhero.belongsToMany(models.Superpower, {
        through: 'superpowers_to_superheroes',
        foreignKey: 'superheroId',
      });
      Superhero.hasMany(models.Image, {
        foreignKey: 'superheroId',
      });
    }
  }
  Superhero.init(
    {
      realName: {
        field: 'real_name',
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      originDescription: {
        field: 'origin_description',
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      catchPhrase: {
        field: 'catch_phrase',
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Superhero',
      tableName: 'superheroes',
      underscored: true,
    }
  );
  return Superhero;
};
