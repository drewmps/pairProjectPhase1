"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Consultation);
    }

    static async findByEmail(email) {
      let user = await User.findOne({
        where: {
          email,
        },
      });
      return user;
    }

    get getRegistrationDate() {
      let registrationDate = new Date(this.createdAt);
      return registrationDate.toISOString().split("T")[0];
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "email is required",
          },
          notNull: {
            msg: "email is required",
          },
          isEmail: {
            msg: "email must be of format email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "password is required",
          },
          notNull: {
            msg: "password is required",
          },
          len: {
            args: [8, Infinity],
            msg: "minimal password length is 8 characters",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((x) => {
    x.role = "Customer";
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(x.password, salt);
    x.password = hash;
  });

  User.beforeUpdate((x) => {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(x.password, salt);
    x.password = hash;
  });
  return User;
};
