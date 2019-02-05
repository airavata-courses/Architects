const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const Login = require("../../models/Users");
const validateLoginInput=require("../../validation/login");
const jwt = require("jsonwebtoken");
// const passport = require("passport");

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  Login.findOne({ email : req.body.email }).then(login => {
    if (!login) {
      errors.email = "User email not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, login.password).then(isMatch => {
      if (isMatch) {
        //user matched
        const payload = {
          FirstName: login.FirstName,
          Email: login.email
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
  });
});




module.exports = router;