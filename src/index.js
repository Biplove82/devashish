const express = require('express');
const mongoose= require("mongoose");
const app = express();
const bodyParser=require('body-parser');
const cors = require('cors');
const route=require("../src/routes/routes");
const options = {
    origin: "*",
  };
  app.use(cors(options));
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  mongoose
    .connect(
      "mongodb+srv://devashsih:EfKnwbuOVVx4xMiS@cluster0.mvj0vin.mongodb.net/user?retryWrites=true&w=majority",
     
    )
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log(err));


    
app.use("/v1", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});

 
