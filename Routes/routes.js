const express = require("express");
const app = express();
const route = express.Router();
const HomeController = require("../src/Controllers/HomeController");
const LoginController = require("../src/Controllers/LoginController");

route.get("/", HomeController.index);
route.get("/login", LoginController.index);
route.post("/login/register", LoginController.register);
route.post("/login/login", LoginController.login);
route.get("/login/logout", LoginController.logout);

module.exports = route;
