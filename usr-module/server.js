const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

const register = require("./routes/api/register");
const getuser=require("./routes/api/getuser");
const ip = require("ip");
const publicIp = require('public-ip');

const app=express();
app.use(bodyParser.json());
app.use(cors());



const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  app.use("/", register);
  app.use("/getuser", getuser);


  const port= process.env.PORT || 22000

  app.listen(port, () => console.log(`Server started on port ${port}`));
  
  
