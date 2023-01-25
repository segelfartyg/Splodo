const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieParser = require("cookie-parser");
const Splodo = require("./models/SplodoModel").Splodo;
const Category = require("./models/CategoryModel").Category;
const User = require("./models/User").User;
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, req.user.userId + ".png")
  },
})

const upload = multer({ storage: storage })

databaseURI = process.env.MONGODB_URI;

var publicDir = require('path').join(__dirname,'/images'); 
app.use(express.static(publicDir)); 


app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URI, credentials: true }));
app.set("trust proxy", 1);


var store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "segelfartyg123",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.SERVERURI + "/google/callback",
    },
    async (accessToken, refreshToken, profile, callback) => {
      const newUser = {
        userId: profile.id,
        splodoName: profile.name.givenName,
        firstName: profile.name.givenName,
        role: "Traveller"
      };

      try {
        let user = await User.findOne({ userId: profile.id });

        if (user) {
          callback(null, user);
        } else {
          user = await User.create(newUser);
          callback(null, user);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("SERIALIZE");
  console.log(user);
  return done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log("DESERIALIZE");
  User.findById(id, (err, user) => {
    return done(err, user);
  });
});

mongoose.connect(databaseURI).then(() => {});

const connection = mongoose.connection;

// let kategori = new Category({catId: 1, userId: "117006401158785848064", title: "Books", splodos:[]})
// kategori.save();

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", async function () {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  app.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile"],
      prompt: "select_account",
    })
  );

  app.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: process.env.CLIENT_URI,
      session: true,
    }),
    function (req, res) {
     res.redirect(process.env.CLIENT_URI + "/profile");
        //res.redirect("http//localhost:3050/profile");
    }
  );

  app.get("/addCollection", async (req, res) => {
    if (req.user) {
      let newColl = new Category({
        userId: req.user.userId,
        title: "New Collection",
        splodos: [],
      });

      await newColl.save();
    }

    //let result = "hej"
    res.redirect("/profile");
  });

 app.get("/api/hej", async (req, res) => {
    res.send({ response: "hej" });
    
  });



  app.get("/profile", async (req, res) => {
    if (req.user) {
      let categoriesAndSplodos = [];

      let resultCategories = await Category.find({ userId: req.user.userId });
      let resultSplodos = await Splodo.find({ userId: req.user.userId });

      let splodosWithCat = [];
      let splodosWithoutCat = [];
      let categories = [];
      console.log(resultCategories);
      console.log(resultSplodos);

      resultCategories.forEach((cat) => {
        categoriesAndSplodos.push(cat);
        categories.push(cat);
      });

      resultSplodos.forEach((splodo) => {
        if (splodo.catId == "nocat") {
          categoriesAndSplodos.push({
            catId: "nocat",
            splodoId: splodo._id,
            title: splodo.title,
          });

          splodosWithoutCat.push({
            catId: "nocat",
            splodoId: splodo._id,
            title: splodo.title,
          });
        } else if (splodo.catId > 0) {
          splodosWithCat.push({
            catId: splodo.catId,
            splodoId: splodo._id,
            title: splodo.title,
          });
        }
      });

      res.send({
        response: {
          result: categoriesAndSplodos,
          categories: categories,
          splodosWithCat: splodosWithCat,
          splodosWithoutCat: splodosWithoutCat,
        },
      });
    } else {
      res.send({ response: "noauth" });
    }
  });

  app.get("/logout", (req, res) => {
    req.logout(function(err) {
      if (err) { return next(err); }
    
    });

    res.send("Logged out")
  });

  app.get("/getProfile", (req, res) => {
    if (req.user) {
      res.send(req.user)
    }
    else{
      res.send("noauth")
    }
  });

  app.post("/new", async (req, res) => {
    console.log(req.body);

    if (req.user) {
      if (req.body.splodoId) {
        await Splodo.findOneAndUpdate(
          { _id: req.body.splodoId, userId: req.user.userId },
          { catId: req.body.catId, tags: req.body.tags, title: req.body.title, desc: req.body.desc }
        );

        res.send("saved");
      } else {
        let newSplodo = new Splodo({
          userId: req.user.userId,
          title: req.body.title,
          desc: req.body.desc,
          catId: req.body.catId,
          tags: req.body.tags
        });

        newSplodo.save();

        res.send("created");
      }

      console.log(req.user);
    } else {
      res.send({ response: "nono" });
    }
  });

  app.post("/deleteSplodo", async (req, res) => {
    console.log(req.body);

    if (req.user) {
      if (req.body.splodoId) {
        await Splodo.findOneAndDelete(
          { _id: req.body.splodoId, userId: req.user.userId });
        res.send("deleted");
      } 
      console.log(req.user);
    } else {
      res.send({ response: "noauth" });
    }
  });


  app.post("/deleteCat", async (req, res) => {
    console.log(req.body);

    if (req.user) {
      if (req.body.catId) {
        await Category.findOneAndDelete(
          { _id: req.body.catId, userId: req.user.userId });

        res.send("deleted");
      } 
    } else {
      res.send({ response: "noauth" });
    }
  });


  app.post("/nameChange", async (req, res) => {
    console.log(req.body);

    if (req.user) {
      if (req.body.name) {
        console.log(req.body.name)
        await User.findOneAndUpdate(
          { userId: req.user.userId, },
          { splodoName: req.body.name }
        );

        res.send({ response: "user found and name updated" });
      } else {
        res.send("not valid username")
      }
    } else {
      res.send({ response: "noauth" });
    }
  });

  app.post("/catNameChange", async (req, res) => {
    console.log(req.body);
    console.log(req.body.catId);

    if (req.user) {
      if (req.body.name) {
        console.log(req.body.name)
        await Category.findOneAndUpdate(
          { userId: req.user.userId, _id: req.body.catId},
          { title: req.body.name }
        );

        res.send({ response: "cat found and name updated" });
      } else {
        res.send("not valid username")
      }

    } else {
      res.send({ response: "noauth" });
    }
  });


 function authentication (req, res, next) {
     if(req.user){
      return next()
     } 
     else{
      res.send("noauth")
     }    
    }

  app.post('/image', authentication, upload.single('file'), function (req, res) {
    res.json({})
  })

  app.get("/getSplodo", async (req, res) => {
    
    if(req.user){
      let result = await Splodo.find({
        userId: req.user.userId,
        _id: req.query.splodoId,
      });
      res.send({ response: result });
    }
    else{
      res.send("no auth");
    }
   
  });

  app.get("/getCatSplodos", async (req, res) => {
    console.log(req.query.catId);

    let categoryName = await Category.find({
      _id: req.query.catId,
      userId: req.user.userId,
    }).select("title");
    console.log(categoryName);

    let result = await Splodo.find({
      userId: req.user.userId,
      catId: req.query.catId,
    });

    console.log(result);
    //let result = "hej"
    res.send({ title: categoryName[0].title, splodos: result });
  });

  app.get("/getCats", async (req, res) => {
    if (req.user) {
      let collections = await Category.find({ userId: req.user.userId });
      res.send({ response: collections });
    } else {
      res.send({ response: "noauth" });
    }
  });

  app.get("/allCats", (req, res) => {
    
    if(req.user){
      let response = "";
      const collection = connection.db.collection("categories");
      collection.find({}).toArray(function (err, data) {
        res.send(data); // it will print your collection data
      });
    }
    else{
      res.send("noauth")
    }
    
  });
});
