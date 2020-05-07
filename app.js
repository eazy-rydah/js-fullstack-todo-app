const express = require("express");
const app = express();

const router = require("./router.js");

app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home-guest.ejs");
});

app.listen(3000);