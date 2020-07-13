const BlogPost = require("../models/blogPost");

module.exports = async (req, res) => {
  const blogpost = await (await BlogPost.findById(req.params.id)).populate(
    "userid"
  );
  res.status(200).render("post", {
    blogpost,
  });
};
