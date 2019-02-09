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
          console.log(error);
          res.json(error);
        });
  }
);


module.exports = router;