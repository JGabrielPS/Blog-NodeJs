const BlogPost = require("../models/blogPost");

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({}).populate("userid");
  //Veridicar si los datos de sesion tienen el userId
  // console.log(req.session);
  res.status(200).render("index", {
    blogposts,
  });
};
