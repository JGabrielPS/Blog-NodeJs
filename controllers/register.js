module.exports = (req, res) => {
  res.status(200).render("register", {
    errors: req.flash("validationErrors"),
  });
};
