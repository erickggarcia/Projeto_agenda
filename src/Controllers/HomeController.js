const Contact = require("../Models/ContactModel");

exports.index = async (req, res) => {
  const contatos = await Contact.buscaContato();
  res.render("index", { contatos });
};
