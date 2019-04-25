const router = require("express").Router();
const Axios = require("axios");
const register = require("../../static/Registry.json");
const passport = require("passport");

router.post("/",
  (req, res) => {
    //console.log(req);
    const errors = {};
    Axios.post(register.projectModule+ register.services.route.postProject, req.body )
        .then((Response) => {
          return res.status(200).json(Response.data);
        })
        .catch(error => {
          errors.data="Unable to add projects"
          return res.status(400).json(errors);
         // console.log(error);
        });
    }
);

module.exports = router;