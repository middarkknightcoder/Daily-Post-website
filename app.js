//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash"); // This is used for the make same string for ex : Allastring converting into lowercase ,capitalize or etc
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Here make public folder as a static folder

// Here create global variable

// let Posts = [];

// Here connect mongoose with mongodb database

mongoose.connect("mongodb+srv://host-Ronak:MongodbAtlas2004@ronakdb.gkb7bps.mongodb.net/postsDB", { useNewUrlParser: true });

const postSchema = {

  Title: String,
  Content: String

};

const Post = mongoose.model("Post", postSchema); // This is model / collection of the postsDB 


//Here Home ejs templet route into the root route

app.get("/", function (req, res) {

  Post.find()
    .then(function (foundPosts) {

      res.render("home", { startingContent: homeStartingContent, postsArr: foundPosts });

    })
    .catch(function (err) {

      console.log(err);
    })

});

// Here about ejs templet route into the /about route port

app.get("/about", function (req, res) {

  res.render("about", { aboutparaContent: aboutContent })
});

// Here contact ejs templet route into the /contact route port

app.get("/contact", function (req, res) {

  res.render("contact", { contactparaContent: contactContent })
});

// Here compose ejs templet route into the /compose route root

app.get("/compose", function (req, res) {

  res.render("compose");

});

// Here set a cosutom route path using the express route parameter

app.get("/post/:postId", function (req, res) {


  // You can also this problem solve using the customPost name 

  // const customPost = _.lowerCase(req.params.postName);

  // Post.find()

  //   .then(function (posts) {

  //     posts.forEach(function (post) {
  //       let postT = _.lowerCase(post.Title);

  //       if (postT === customPost) {

  //         res.render("post", { postS: post });

  //         res.redirect("/post/" + customPost);
  //       }
  //     })

  //   })
  //   .catch(function (err) {

  //     console.log(err);
  //   })

  let requestId = req.params.postId;

  Post.findOne({ _id: requestId })
    .then(function (foundPost) {

      res.render("post", { postS: foundPost });

      res.redirect("/post/" + requestId);
    })
    .catch(function (err) {

      console.log(err);
    })
});


app.post("/compose", function (req, res) {

  const post = {

    Title: req.body.postTitle,
    Content: req.body.postBody

  };

  // Posts.push(Post);

  Post.insertMany(post)
    .then(function () {

      console.log("Successfully added data");
    })
    .catch(function (err) {

      console.log(err);
    })

  res.redirect("/");

});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
