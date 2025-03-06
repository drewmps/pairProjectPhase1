const { Op } = require("sequelize");
const qr = require("qrcode");
const { determineLocation } = require("../helpers/helper");
const {
  User,
  Profile,
  Consultation,
  ConsultationHasSymptom,
} = require("../models");
const bcrypt = require("bcryptjs");
class Controller {
  static async renderRegister(req, res) {
    try {
      let { error } = req.query;
      res.render("formRegister", { error });
    } catch (error) {
      res.send(error);
    }
  }
  static async handleRegister(req, res) {
    try {
      let { name, email, password } = req.body;
      let user = await User.create({
        email,
        password,
      });

      await Profile.create({
        UserId: user.id,
        name,
        location: await determineLocation(req.ip),
      });
      res.redirect("/login");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let msg = error.errors.map((el) => {
          return el.message;
        });
        res.redirect(`/register?error=${msg}`);
      } else if (error.name === "SequelizeUniqueConstraintError") {
        let msg = error.errors.map((el) => {
          return "email is already registered";
        });
        res.redirect(`/register?error=${msg}`);
      } else {
        res.send(error);
      }
    }
  }

  static async renderLogin(req, res) {
    try {
      let { error } = req.query;
      res.render("formLogin", { error });
    } catch (error) {
      res.send(error);
    }
  }
  static async handleLogin(req, res) {
    try {
      let { email, password } = req.body;
      let user = await User.findByEmail(email);
      if (user) {
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (isValidPassword) {
          req.session.userId = user.id;
          req.session.role = user.role;
          if (user.role === "Admin") {
            res.redirect("/admin");
          } else {
            res.redirect("/home");
          }
        } else {
          throw {
            name: "LoginError",
          };
        }
      } else {
        throw {
          name: "LoginError",
        };
      }
    } catch (error) {
      if (error.name === "LoginError") {
        let msg = "Invalid email or password";
        res.redirect(`/login?error=${msg}`);
      } else {
        res.send(error);
      }
    }
  }

  static async handleLogout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw err;
        } else {
          res.redirect("/login");
        }
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async landing(req, res) {
    try {
      res.render("landing-page");
    } catch (error) {
      res.send(error);
    }
  }

  static async customerHome(req, res) {
    try {
      let { error } = req.query;
      res.render("customer/customer-home", { error });
    } catch (error) {
      res.send(error);
    }
  }
  static generateQr(req, res) {
    res.redirect("/qr-customer");
  }
  static renderQr(req, res) {
    qr.toDataURL("tes", (err, src) => {
      res.render("customer/customer-qr", {
        qr: src,
      });
    });
  }

  static async renderDiagnose(req, res) {
    try {
      let id = req.session.userId;
      res.render("customer/form-diagnose");
    } catch (error) {
      res.send(error);
    }
  }

  static async handleDiagnose(req, res) {
    try {
      let id = req.session.userId;
      let { fever, cough, shortBreath } = req.body;
      let symptoms = [fever, cough, shortBreath];
      let result = await Consultation.createConsultation(
        id,
        symptoms,
        ConsultationHasSymptom
      );
      let user = await User.findOne({ include: Profile, where: { id } });
      res.render("customer/end-of-consultation", { result, user });
    } catch (error) {
      res.send(error);
    }
  }

  static async adminHome(req, res) {
    try {
      let { search, deleted, updated } = req.query;
      let option = {
        include: { model: Profile },
        where: { role: { [Op.ne]: "Admin" } },
      };
      if (search) {
        option.include.where = {
          name: { [Op.iLike]: `%${search}%` },
        };
      }

      let users = await User.findAll(option);
      res.render("admin/admin-home", { users, deleted, updated });
    } catch (error) {
      res.send(error);
    }
  }

  static async adminRenderEdit(req, res) {
    try {
      let { id } = req.params;
      let { error } = req.query;
      let user = await User.findOne({ include: Profile, where: { id } });
      res.render("admin/admin-edit-password", { user, error });
    } catch (error) {
      res.send(error);
    }
  }
  static async adminHandleEdit(req, res) {
    try {
      let { id } = req.params;
      let { password } = req.body;
      let user = await User.findOne({ include: Profile, where: { id } });
      await user.update({
        password,
      });
      res.redirect(`/admin?updated=${user.Profile.name}`);
    } catch (error) {
      let { id } = req.params;
      if (error.name === "SequelizeValidationError") {
        let msg = error.errors.map((el) => {
          return el.message;
        });
        res.redirect(`/admin/edit/${id}?error=${msg}`);
      } else {
        res.send(error.message);
      }
    }
  }

  static async adminHandleDelete(req, res) {
    try {
      let { id } = req.params;
      let user = await User.findOne({ include: Profile, where: { id } });
      await User.destroy({
        where: { id: user.id },
      });

      res.redirect(`/admin?deleted=${user.Profile.name}`);
    } catch (error) {
      res.send(error);
    }
  }
}
module.exports = Controller;
