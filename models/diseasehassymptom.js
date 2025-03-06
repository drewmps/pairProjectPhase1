'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseHasSymptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DiseaseHasSymptom.init({
    SymptomId: DataTypes.INTEGER,
    DiseaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiseaseHasSymptom',
  });
  return DiseaseHasSymptom;
};