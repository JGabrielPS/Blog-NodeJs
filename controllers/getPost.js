const BlogPost = require("../models/blogPost");

module.exports = async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  res.status(200).render("post", {
    blogpost,
  });
};
