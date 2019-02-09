const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const Register = require("../../models/Users");
const validateRegisterInput = require("../../validation/register");

router.post("/register", (req, res) => {
  console.log(req);
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    Register.findOne({email : req.body.email }).then(register => {
        if (register) {
          errors.email = "Email already exists";
          return res.status(400).json(errors);
        }});
        const newUser = new Register({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            skills: req.body.skills,
            contactNumber: req.body.contactNumber,
            userType: req.body.userType

          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(register => res.json(register))
                .catch(err => console.log(err));
            });
          });
})


module.exports = router;