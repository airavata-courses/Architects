const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const login = require("./routes/api/login");
const passport = require("passport");

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

  app.use(passport.initialize());

// Passport Config
  require("./config/passport")(passport);


  app.use("/", login);


  const port= process.env.PORT || 5000

  app.listen(port, () => console.log(`Server started on port ${port}`));