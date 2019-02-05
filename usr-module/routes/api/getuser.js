const express = require("express");
const router = express.Router();

const Users = require("../../models/Users");

router.get("/:email",(req, res) => {
    Users.findOne({ email: req.params.email })
      .then(Users => {
        res.json({email: Users.email, password: Users.password});
      })
      .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;