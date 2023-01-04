const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require("cookie-parser");

const{ ensureAuth, ensureGuest } = require("./services/auth")


databaseURI = process.env.MONGODB_URI;


app.use(express.json())
app.use(cors({origin: "http://localhost:8080", credentials:true}));
app.set("trust proxy", 1)

var store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions"
});


app.use(session({
  secret: "segelfartyg123",
  resave: true,
  saveUninitialized: true,
}))


app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session())


const userSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  createdAt:{
      type: Date,
      default: Date.now
  }
})


const User = mongoose.model("User", userSchema);

module.exports = mongoose.model('User', userSchema)






passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/google/callback"
},
async (accessToken, refreshToken, profile, callback) => {
  
  const newUser ={
      userId: profile.id,
      userName: profile.displayName,
      firstName: profile.name.givenName
  }

  try{
      let user = await User.findOne({userId: profile.id})

      if(user){
      
          callback(null, user)
      }
      else{
          
       
          user = await User.create(newUser)
          callback(null, user)
      }
  }
  catch(err){
      console.log(err)

  }

}))

passport.serializeUser((user,done) => {
  console.log("SERIALIZE")
  console.log(user)
  return done(null, user._id)
})

passport.deserializeUser((id, done) => {
  console.log("DESERIALIZE")
  User.findById(id, (err, user) => {
      return done(err, user)
  })
})


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
  

  app.get('/google', passport.authenticate("google", {scope: ["profile"], prompt: "select_account"}));

  
  app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:8080/', session: true }),
  function (req, res) {
    res.redirect('http://localhost:8080/');
  });



  app.get('/profile', (req, res) => {

    if(req.user){

      res.send("you are logged in")
    }
    else{
      res.send("you are not logged in")
    }
    
  })

  app.get("/logout", (req, res) =>{

    if(req.user){
      req.logout(function(err) {
        if (err) { return next(err); }
        res.send('logged out');
      });
     
    }


  })



  
  app.get('/allSplodos', ensureAuth, (req, res) => {
  
    // let response = "";
    // const collection  = connection.db.collection("splodos");
    // collection.find({}).toArray(function(err, data){
    //   res.send(data); // it will print your collection data
    // });
    console.log(req.user)

  res.send({"allSplodos": "hej"})    
  
  })


  app.get('/allCats', (req, res) => {
  
    let response = "";
    const collection  = connection.db.collection("categories");
    collection.find({}).toArray(function(err, data){
      res.send(data); // it will print your collection data
    });
  
  })


  

});






