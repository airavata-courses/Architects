const router = require("express").Router();
const Axios = require("axios");
const register = require("../../static/Registry.json");

router.post("/",
  (req, res) => {
    console.log(req);
    const errors = {};
    Axios.post(register.userModule+register.services.route.postUser, req.body )
        .then((Response) => {
          return res.json(Response.data);       
        })
        .catch(error => {
          //console.log(error);
          errors.data="Unable to register"
          return res.status(400).json(errors);
         // res.json(error);
        });
  }
);


module.exports = router;
