class Middleware {
  static isLoggedIn(req, res, next) {
    if (!req.session.userId) {
      const error = "Please login first";
      res.redirect(`/login?error=${error}`);
    } else {
      next();
    }
  }

  static isLoggedInLandingPage(req, res, next) {
    if (req.session.userId) {
      if (req.session.role === "Customer") {
        res.redirect("/home");
      } else {
        res.redirect("/admin");
      }
    } else {
      next();
    }
  }

  static isAdmin(req, res, next) {
    if (req.session.userId && req.session.role !== "Admin") {
      const error = "You are not authorized";
      res.redirect(`/home?error=${error}`);
    } else {
      next();
    }
  }
}
module.exports = Middleware;
