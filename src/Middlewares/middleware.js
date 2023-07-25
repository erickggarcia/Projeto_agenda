exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user;
  next();
};

exports.checkCSRFError = (err, req, res, next) => {
  if (err === "EBADCSRFTOKEN") {
    return res.render("404");
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    req.flash("errors", "Você precisa estar logado");
    req.session.save(() => res.redirect("/"));
    return;
  }
  next();
};
