const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

const app = new express();

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.get("/post/new", (req, res) => {
  res.render("create");
});

app.post("/post/store", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

app.listen(4000, () => {
  console.log("App listening in port 4000");
});
