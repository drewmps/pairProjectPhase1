"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DiseaseHasSymptoms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      SymptomId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Symptoms",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      DiseaseId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Diseases",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DiseaseHasSymptoms");
  },
};
