const express = require("express");
const path = require("path");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");

const app = express();

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "html");
app.engine(
  "html",
  expressHandlebars({
    extname: ".html",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "/src/views/layouts"),
    partialsDir: path.join(__dirname, "/src/views/partials"),
  })
);

app.use(express.static(path.join(__dirname, "public")));

const port = 8000;
app.listen(port, () => console.log("Server started listening on PORT " + port));

const user = require("./src/controller/user");
const home = require("./src/controller/home");
app.use("/user", user);
app.use("/", home);
