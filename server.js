const express = require("express");
const routes = require("./Routes/routes");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const helmet = require("helmet");
const csrf = require("csurf");
const {
  middlewareGlobal,
  checkCSRFError,
  csrfMiddleware,
} = require("./src/Middlewares/middleware");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("conectou à base de dados");
    app.emit("pronto");
  })
  .catch((e) => console.log(e));

app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
  secret: "dsaipadsiouasdiuasdopi9owqeihbjc554645v8",
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTIONSTRING,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "Views"));
app.set("view engine", "ejs");

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCSRFError);
app.use(csrfMiddleware);
app.use(routes);

app.on("pronto", () => {
  app.listen(3000, () => {
    console.log("Acessar http://localhost:3000");
    console.log("Servidor executando na porta 3000");
  });
});
