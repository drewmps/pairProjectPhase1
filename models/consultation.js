"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Consultation.belongsTo(models.User);
      Consultation.belongsToMany(models.Symptom, {
        through: models.ConsultationHasSymptom,
      });
    }

    static async createConsultation(id, symptoms, ConsultationHasSymptom) {
      symptoms = symptoms
        .filter((el) => el !== undefined)
        .filter((el) => el !== "");

      let consultation = await Consultation.create({
        date: new Date(),
        UserId: id,
      });
      if (symptoms.length > 0) {
        symptoms.forEach(async (el) => {
          await ConsultationHasSymptom.create({
            ConsultationId: consultation.id,
            SymptomId: +el,
          });
        });
        return "Covid";
      } else {
        await ConsultationHasSymptom.create({
          ConsultationId: consultation.id,
          SymptomId: 3,
        });
        return "Not Covid";
      }
    }
  }
  Consultation.init(
    {
      date: DataTypes.DATE,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Consultation",
    }
  );
  return Consultation;
};
