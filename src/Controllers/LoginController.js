const Login = require("../Models/LoginModel");
exports.index = (req, res) => {
  if (req.session.user) {
    return res.render("login-logado");
  }
  return res.render("login");
};

exports.register = async (req, res) => {
  const login = new Login(req.body);
  try {
    await login.register();
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("/login");
      });
      return;
    }
    req.flash("success", "Usuário cadastrado com sucesso");
    req.session.save(function () {
      return res.redirect("/login");
    });
  } catch (e) {
    res.render("404");
    console.log(e);
  }
};

exports.login = async (req, res) => {
  const login = new Login(req.body);
  try {
    await login.login();
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("/");
      });
      return;
    }
    req.flash("success", "Login realizado");
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("/login");
    });
  } catch (e) {
    res.render("404");
    console.log(e);
  }
};

exports.logout = async (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
