const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const validateLoginInput=require("../validation/login");
const jwt = require("jsonwebtoken");
const Axios = require("axios");
const register = require("../../static/Registry.json");
const zkObject = require("../zookeeper/zookeeper");

router.post("/", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);


  const zookeeperData=zkObject.znodeData;
  const zooKeeperExists=zkObject.znodeExists;
  console.log("User Management !! connecting string ");
  let connectionString
  zooKeeperExists("/ensemble/userManagement")
  .then(doesExist=>{
    return zookeeperData("/ensemble/userManagement")
  })
  .then(data=>{
    connectionString="http://"+data
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
  
      console.log(req.body.email);
    Axios.get(connectionString + register.services.route.getUserForAuth+"/"+ req.body.email).then(login => {
      console.log(login.data);
    if (!login.data) {
      console.log(login);
      errors.data = "User email not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, login.data.password).then(isMatch => {
      if (isMatch) {
        //user matched
        const payload = {
          FirstName: login.data.FirstName,
          Email: login.data.email
        };
        
          //sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 36000 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        }
      
         else {
          errors.data = "Password incorrect";
           return res.status(400).json(errors);
         }
      });
    })
    .catch(error => {
      errors.data="Email Incorrect";
      return res.status(400).json(errors);
      //console.log(error)
    });
  })
  .catch(error=>{
    return res.status(400).json(error);
  });









});

module.exports = router;
