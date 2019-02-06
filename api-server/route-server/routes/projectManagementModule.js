const router = require("express").Router();
const Axios = require("axios");
const register = require("../../static/Registry.json");
const passport = require("passport");

router.post("/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    //console.log(req);
    const errors = {};
    sAxios.post(register.projectModule+ register.services.route.postProject, req.body )
        .then((Response) => {
          return res.set(Response.data);
        })
        .catch(error => {
          return res.set(error);
          console.log(error);
        });
    }
);

module.exports = router;