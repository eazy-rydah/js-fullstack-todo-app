const User = require("../models/User.js");

exports.login = (req, res) => {
    let user = new User(req.body);
    user.login().then((result) => {
      req.session.user = {favColor: "blue", username: user.data.username}
      req.session.save(() => {
        res.redirect("/");
      })
    }).catch((err) => {
      req.flash("errors", err);
      req.session.save(() => {
        res.redirect("/");
      });
    });
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
}

exports.register = (req, res) => {
  let user = new User(req.body);
  user.register();
  if (user.errors.length) {
    user.errors.forEach((error) => {
      req.flash("regErrors", error);
    });
    req.session.save(() => {
      res.redirect("/");
    });
  } else {
    res.send("Congrats there are no errors");
  }
}

exports.home = (req, res) => {
  if (req.session.user) {
    res.render("home-dashboard.ejs", {username: req.session.user.username});
  } else {
    res.render("home-guest.ejs", {errors: req.flash("errors"), regErrors: req.flash("regErrors")});
  }
}