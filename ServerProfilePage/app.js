const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config()
const mongoose = require("mongoose");

databaseURI = process.env.MONGODB_URI;


const splodoSchema = new mongoose.Schema({
  name: {
    type: String,
  }
})


const Splodo = mongoose.model("Splodo", splodoSchema);



mongoose.connect(databaseURI).then(() =>{
})


const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', async function () {

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
  
  
  app.get('/', (req, res) => {
  
    let response = "";
    const collection  = connection.db.collection("splodo");
    collection.find({}).toArray(function(err, data){
      res.send(data); // it will print your collection data
    });
  

  })


  

});






