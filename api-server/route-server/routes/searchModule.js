const router = require("express").Router();
const Axios = require("axios");
const register = require("../../static/Registry.json");

router.get("/",
  (req, res) => {
    //console.log(req);
    const errors = {};
    console.log(`Connectingsss to : ${register.searchModule + register.services.route.getSearch}  ${req.url}`)
    Axios.get(register.searchModule + register.services.route.getSearch + req.url )
        .then((Response) => {
          res.json(Response.data);
        })
        .catch(error => {
          console.log(error);
        });
  }
);

module.exports = router;