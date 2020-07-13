module.exports = (req, res) => {
  let username = "";
  let password = "";
  const data = req.flash("data")[0];
  console.log(data);
  if (data !== undefined) {
    username = data.username;
    password = data.password;
  }

  res.status(200).render("register", {
    errors: req.flash("validationErrors"),
    username,
    password,
  });
};
