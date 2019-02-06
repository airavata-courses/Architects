const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const passport = require("passport");
const register = require("./static/Registry.json");

const app=express();
app.use(bodyParser.json());
app.use(cors());


app.use(passport.initialize());

// Passport Config
  require(register.authServerLoc + "/../config/passport")(passport);

  app.use(register.client.route.postLogin, require(register.authServerLoc+"/loginAuthenticator"));
  app.use(register.client.route.postProject, require(register.routeServerLoc+"/projectManagementModule"));
  app.use(register.client.route.postUser, require(register.routeServerLoc+"/userManagementModule"));
  app.use(register.client.route.getSearch, require(register.routeServerLoc+"/searchModule"));


  const port= process.env.PORT || 4000

  app.listen(port, () => console.log(`Server started on port ${port}`));