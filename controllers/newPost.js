module.exports = (req, res) => {
  res.status(200).render("create", {
    createPost: true,
  });
};
