const router = require("express").Router();
const Axios = require("axios");
const register = require("../../static/Registry.json");
const passport = require("passport");
const zkObject=require("../../auth-server/zookeeper/zookeeper.js");

router.post("/",
  //passport.authenticate("jwt", {
    //session: false
  //}),
  (req, res) => {


    const zookeeperData=zkObject.znodeData;
    const zooKeeperExists=zkObject.znodeExists;
    console.log("add projects !! connecting string ");
    let connectionString
    zooKeeperExists("/ensemble/addProjects")
    .then(doesExist=>{
      return zookeeperData("/ensemble/addProjects")
    })
    .then(data=>{
      connectionString="http://"+data
      const errors = {};
      Axios.post(connectionString+ register.services.route.postProject, req.body )
          .then((Response) => {
	    console.log("****************In then of add project API server **********\n")
            return res.status(200).json(Response.data);
          })
          .catch(error => {
            error.data="Unable to add projects"
            return res.status(400).json(error);
           // console.log(error);
          });
      console.log(data + "data")
    })
    .catch(error=>{
      console.log(error+"erorr***********************************************************")
      return res.status(400).json(error);
    });


   
    }
);

module.exports = router;
