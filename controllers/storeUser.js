const User = require("../models/User");

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    console.log(error);
    if (error) {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      console.log(validationErrors);
      req.flash("validationErrors", validationErrors);
      return res.redirect("/auth/register");
    }

    res.redirect("/");
  });
};
