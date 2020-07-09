const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const validateMiddelWare = require("./middleware/validateMiddleWare");
const expressSession = require("express-session");
const authMiddleWare = require("./middleware/authMiddleWare");
const redirectIfAuthenticatedMiddleWare = require("./middleware/redirectIfAuthenticatedMiddleWare");

const homeController = require("./controllers/home");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const newPostController = require("./controllers/newPost");
const registerController = require("./controllers/register");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const storePostController = require("./controllers/storePost");
const storeUserController = require("./controllers/storeUser");
const getPostController = require("./controllers/getPost");
global.loggedIn = null;

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

const app = new express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.set("view engine", "ejs");
app.use("/post/store", validateMiddelWare);
app.use(
  expressSession({
    secret: "keyboard cat",
  })
);
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.get("/", homeController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get("/post/new", authMiddleWare, newPostController);
app.get(
  "/auth/register",
  redirectIfAuthenticatedMiddleWare,
  registerController
);
app.get("/auth/login", redirectIfAuthenticatedMiddleWare, loginController);
app.post("/user/login", redirectIfAuthenticatedMiddleWare, loginUserController);
app.post("/post/store", authMiddleWare, storePostController);
app.post(
  "/user/register",
  redirectIfAuthenticatedMiddleWare,
  storeUserController
);
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
