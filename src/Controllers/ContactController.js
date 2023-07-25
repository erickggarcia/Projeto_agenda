const Contato = require("../Models/ContactModel");
exports.index = (req, res) => {
  res.render("contact", { contato: {} });
};

exports.register = async (req, res) => {
  const contato = new Contato(req.body);
  try {
    await contato.register();
    console.log(contato.errors.length);
    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => res.redirect("/contact"));
      return;
    }

    req.flash("success", "Contato criado com sucesso");
    req.session.save(() => res.redirect(`/contact/${contato.contato._id}`));
    return;
  } catch (e) {
    res.render("404");
    console.log(e);
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) res.render("404");
  const contato = await Contato.buscaPorId(req.params.id);

  if (!contato) res.render("404");
  res.render("contact", { contato });
};
