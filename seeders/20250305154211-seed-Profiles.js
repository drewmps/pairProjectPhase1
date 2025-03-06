"use strict";
const fs = require("fs").promises;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let rows = JSON.parse(await fs.readFile("./data/profiles.json", "utf8"));
    rows = rows.map((el) => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Profiles", rows);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Profiles", null, {});
  },
};
