const router = require("express").Router();
const Controller = require("../controllers/controller");
router.get("/", Controller.adminHome);
router.get("/edit/:id", Controller.adminRenderEdit);
router.post("/edit/:id", Controller.adminHandleEdit);
router.get("/delete/:id", Controller.adminHandleDelete);
module.exports = router;
