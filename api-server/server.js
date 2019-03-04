const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const passport = require("passport");
const register = require("./static/Registry.json");
const ZooKeeper = require('node-zookeeper-client');
const publicIp = require('public-ip');
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

  const client = ZooKeeper.createClient('149.165.171.39:2181',{ sessionTimeout: 5000 });

  publicIp.v4().then(ip => {
    console.log("your public ip address", ip);
    client.once('connected', function () {
    console.log('Connected to the server.');
     
        client.create("/ensemble/apiServer",new Buffer(ip +":"+port),ZooKeeper.CreateMode.EPHEMERAL, function (error) {
            if (error) {
                console.log('Failed to create node: %s due to: %s.', error);
            } else {
                console.log('Node: %s is successfully created.');
            }
     
            //client.close();
        });
    });
    client.connect();
  });
 // console.log("here")
 //console.log(client)
  

module.exports.client=client; //this is a pure hack!!! should be removed sometime later
