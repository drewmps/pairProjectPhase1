"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ConsultationHasSymptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ConsultationHasSymptom.init(
    {
      SymptomId: DataTypes.INTEGER,
      ConsultationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ConsultationHasSymptom",
    }
  );
  return ConsultationHasSymptom;
};
