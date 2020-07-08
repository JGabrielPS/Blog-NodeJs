const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const validateMiddelWare = require("./middleware/validateMiddleWare");

const homeController = require("./controllers/home");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const newPostController = require("./controllers/newPost");
const registerController = require("./controllers/register");
const storePostController = require("./controllers/storePost");
const storeUserController = require("./controllers/storeUser");
const getPostController = require("./controllers/getPost");

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

const app = new express();

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.set("view engine", "ejs");

app.use("/post/store", validateMiddelWare);

app.get("/", homeController);

app.get("/about", aboutController);

app.get("/contact", contactController);

app.get("/post/new", newPostController);

app.get("/auth/register", registerController);

app.post("/post/store", storePostController);

app.post("/user/register", storeUserController);

app.get("/post/:id", getPostController);

app.listen(4000, () => {
  console.log("App listening in port 4000");
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
