const router = require("express").Router();
const Axios = require("axios");
const register = require("../../static/Registry.json");
const zkObject=require("../../auth-server/zookeeper/zookeeper.js");

router.post("/",
  (req, res) => {
    console.log(req);


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
      const errors = {};
      Axios.post(connectionString+register.services.route.postUser, req.body )
          .then((Response) => {
            return res.json(Response.data);       
          })
          .catch(error => {
            //console.log(error);
            errors.data="Unable to register"
            return res.status(400).json(errors);
           // res.json(error);
          });
      console.log(data + "data")
    })
    .catch(error=>{
      return res.status(400).json(error);
    });




   
  }
);


module.exports = router;
