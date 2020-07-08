const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogPost = require("./models/blogPost");
const fileUpload = require("express-fileupload");

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

const app = new express();

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.set("view engine", "ejs");

const validateMiddelWare = (req, res, next) => {
  if (req.files === null || req.body.title === '' || req.body.body === '') {
    return res.redirect("/post/new");
  }
  next();
};

app.use("/post/store", validateMiddelWare);

app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render("index", {
    blogposts,
  });
});

//Funcionalidad de busqueda de post
// app.use("/search/post", async (req, res) => {
//   console.log(req.body);
//   const blogposts = await BlogPost.find(
//     {
//       title: req.body,
//     },
//     (error, blogpost) => {
//       console.log(error, blogpost);
//     }
//   );
//   res.render("index", {
//     blogposts,
//   });
// });

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/new", (req, res) => {
  res.render("create");
});

app.post("/post/store", (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
    await BlogPost.create({ ...req.body, image: "/img/" + image.name });
    res.redirect("/");
  });
});

app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  res.render("post", {
    blogpost,
  });
});

app.listen(4000, () => {
  console.log("App listening in port 4000");
});
