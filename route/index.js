const router = require("express").Router();
const Controller = require("../controllers/controller");
const Middleware = require("../middleware/middleware");
const routerAdmin = require("./admin");

router.get("/", Middleware.isLoggedInLandingPage, Controller.landing);

router.get("/register", Controller.renderRegister);
router.post("/register", Controller.handleRegister);

router.get("/login", Controller.renderLogin);
router.post("/login", Controller.handleLogin);

router.use(Middleware.isLoggedIn);
router.get("/home", Controller.customerHome);
router.get("/logout", Controller.handleLogout);
router.get("/qr", Controller.generateQr);
router.get("/qr-customer", Controller.renderQr);

router.get("/diagnose", Controller.renderDiagnose);
router.post("/diagnose", Controller.handleDiagnose);

router.use(Middleware.isAdmin);
router.use("/admin", routerAdmin);

module.exports = router;
