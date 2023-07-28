const express = require("express");
const route = express.Router();
const { isLoggedIn } = require("../src/Middlewares/middleware");
const HomeController = require("../src/Controllers/HomeController");
const LoginController = require("../src/Controllers/LoginController");
const ContactController = require("../src/Controllers/ContactController");

route.get("/", HomeController.index);

route.get("/login", LoginController.index);
route.post("/login/register", LoginController.register);
route.post("/login/login", LoginController.login);
route.get("/login/logout", LoginController.logout);

route.get("/contact", isLoggedIn, ContactController.index);
route.post("/contact/register", isLoggedIn, ContactController.register);
route.get("/contact/:id", isLoggedIn, ContactController.editIndex);
route.post("/contact/edit/:id", isLoggedIn, ContactController.edit);
route.get("/contact/delete/:id", isLoggedIn, ContactController.delete);

module.exports = route;
