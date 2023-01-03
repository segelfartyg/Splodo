const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

require("./config/passport.js")(passport)
databaseURI = process.env.MONGODB_URI;

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

app.use(session({
  secret: "segelfartyg123",
  resave: false,
  saveUninitialized: false
}))





app.use(passport.initialize())
app.use(passport.session())

const splodoSchema = new mongoose.Schema({
  splodoId: Number,
  userId: Number,
  title: String,
  catId: Number,
  desc: String,
  url: String,
})

const catSchema = new mongoose.Schema({
  catId: Number,
  userId: Number,
  title: String
})

// const userSchema = new mongoose.Schema({
//   userId: Number,
//   userName: String,
// })





const Splodo = mongoose.model("Splodo", splodoSchema);
//const User = mongoose.model("User", userSchema);
const Category = mongoose.model("Category", catSchema)


mongoose.connect(databaseURI).then(() =>{
})


const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', async function () {

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  

  app.get('/google', passport.authenticate("google", {scope: ["profile"]}, (req, res) =>{
  
  }));

  
  app.get('/google/callback', passport.authenticate("google", {
    failureRedirect: "/allSplodos",
    successRedirect: "/profile" 
  }));


  app.get('/profile', (req, res) => {

    res.redirect("http://localhost:8080/profile")
 
  })



  
  app.get('/allSplodos', (req, res) => {
  
    let response = "";
    const collection  = connection.db.collection("splodos");
    collection.find({}).toArray(function(err, data){
      res.send(data); // it will print your collection data
    });
  
  })


  app.get('/allCats', (req, res) => {
  
    let response = "";
    const collection  = connection.db.collection("categories");
    collection.find({}).toArray(function(err, data){
      res.send(data); // it will print your collection data
    });
  
  })


  

});






