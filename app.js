//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "As a verb, to quote means to repeat someone’s words, attributing them to their originator. If you’re giving a speech on personal organization, you might want to quote Ben Franklin in it — he’s the master. When you write out a quote, you put the other person’s words in quotation marks (“Aha!”). Sometimes a price estimate is called a quote, like when a mechanic looks at your engine and gives you a quote for the cost of repair..";
const aboutContent ="Thats been one of my mantras focus and simplicity. Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple. But its worth it in the end because once you get there, you can move mountains.";
const contactContent="Contact Me on this SocialMedia Account";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Deepesh:deep123@cluster0.zswoo.mongodb.net/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){


    res.render("home")



  });

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/quotes");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});


app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/quotes",function(req,res){
  Post.find({}, function(err, posts){
    res.render("quotes", {
    startingContent: homeStartingContent,
      posts: posts
      });
})
})
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server  has started Successfully");
});
