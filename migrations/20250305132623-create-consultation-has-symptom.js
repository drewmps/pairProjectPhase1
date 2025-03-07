"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ConsultationHasSymptoms", {
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
      ConsultationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Consultations",
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
    await queryInterface.dropTable("ConsultationHasSymptoms");
  },
};
