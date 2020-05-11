const Post = require("../models/Post.js");

exports.viewCreateScreen = function (req,res) {
  res.render("create-post.ejs");
}

exports.create = function(req, res) {
  let post = new Post(req.body, req.session.user._id);
  post.create().then(function () {
    res.send("New post created.");
  }).catch(function (errors) {
    res.send(errors);
  })
}

exports.viewSingle = async function (req,res) {
  try {
    let post = await Post.findSingleById(req.params.id);
    res.render("single-post-screen.ejs", {post: post});
  } catch (error) {
    res.render("404.ejs");
  }
}