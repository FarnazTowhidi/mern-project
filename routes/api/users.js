const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const user = require("../../models/user");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/register", usersCtrl.create);
router.post("/login", usersCtrl.login);
router.post("/update", usersCtrl.update)
router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;
