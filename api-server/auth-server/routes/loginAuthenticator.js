const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const validateLoginInput=require("../validation/login");
const jwt = require("jsonwebtoken");
const Axios = require("axios");
const register = require("../../static/Registry.json");

router.post("/", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

    console.log(req.body.email);
  Axios.get(register.userModule+ register.services.route.getUserForAuth+"/"+ req.body.email).then(login => {
    console.log(login.data);
  if (!login.data) {
    console.log(login);
    errors.email = "User email not found";
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
        errors.password = "Password incorrect";
         return res.status(400).json(errors);
       }
    });
  }).catch(error => {console.log(error)});
});

module.exports = router;