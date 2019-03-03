const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const ZooKeeper = require('node-zookeeper-client');
const register = require("./routes/api/register");
const getuser=require("./routes/api/getuser");
const ip = require("ip");

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

  const client = ZooKeeper.createClient('149.165.171.39:2181',{ sessionTimeout: 5000 });
 // console.log("here")
 console.log(client)
  client.once('connected', function () {
    console.log('Connected to the server.');
 
    client.create("/ensemble/userManagement",new Buffer(ip.address() +":"+port),ZooKeeper.CreateMode.EPHEMERAL, function (error) {
        if (error) {
            console.log('Failed to create node: %s due to: %s.', error);
        } else {
            console.log('Node: %s is successfully created.');
        }
 
        //client.close();
    });
});
client.connect();