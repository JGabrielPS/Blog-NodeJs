const BlogPost = require('../models/blogPost');

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({});
  //Veridicar si los datos de sesion tienen el userId
  // console.log(req.session);
  res.render("index", {
    blogposts,
  });
};
