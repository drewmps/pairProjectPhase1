"use strict";
const fs = require("fs").promises;
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let rows = JSON.parse(await fs.readFile("./data/users.json", "utf8"));
    rows = rows.map((el) => {
      delete el.id;
      const salt = bcrypt.genSaltSync(8);
      const hash = bcrypt.hashSync(el.password, salt);
      el.password = hash;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Users", rows);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
