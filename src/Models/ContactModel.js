const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const schema = new Schema({
  nome: {
    type: "string",
    required: true,
  },
  sobrenome: {
    type: "string",
    required: false,
    default: "",
  },
  telefone: {
    type: "string",
    required: false,
    default: "",
  },
  email: {
    type: "string",
    required: false,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ContactModel = mongoose.model("Contact", schema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContactModel.create(this.body);
  }

  valida() {
    this.cleanUp();

    if (!this.body.nome) this.errors.push("Nome é obrigatório");

    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push("E-mail inválido");
    }

    if (!this.body.telefone && !this.body.email) {
      this.errors.push(
        "Pelo menos um contato deve ser enviado, telefone ou e-mail"
      );
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      telefone: this.body.telefone,
      email: this.body.email,
    };
  }

  async edit(id) {
    if (typeof id !== "string") return;
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContactModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
  }

  static async buscaPorId(id) {
    if (typeof id !== "string") return;
    const contato = await ContactModel.findById(id);
    return contato;
  }

  static async buscaContato() {
    const contatos = await ContactModel.find().sort({ createdAt: -1 });
    return contatos;
  }

  static async delete(id) {
    if (typeof id !== "string") return;

    const contato = await ContactModel.findOneAndDelete({ _id: id });
    return contato;
  }
}

module.exports = Contact;
