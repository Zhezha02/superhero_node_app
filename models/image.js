'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate (models) {
      Image.belongsTo(models.Superhero, {
        foreignKey: 'superheroId',
      });
    }
  }
  Image.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      superheroId: {
        field: 'superhero_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'images',
      underscored: true,
    }
  );
  return Image;
};
