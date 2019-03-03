const router = require("express").Router();
const Axios = require("axios");
const register = require("../../static/Registry.json");
const zkObject=require("../../auth-server/zookeeper/zookeeper.js");

router.get("/",
  (req, res) => {

  const zookeeperData=zkObject.znodeData;
  const zooKeeperExists=zkObject.znodeExists;
//  console.log(zookeeperData);
  
let connectionString
  zooKeeperExists("/ensemble/find")
  .then(doesExist=>{
    return zookeeperData("/ensemble/find")
  })
  .then(data=>{
    connectionString="http://"+data
    console.log(data + "data")
      // console.log("temporary data"+ temp)
      const errors = {};
      console.log(`Connectingsss to : ${connectionString + register.services.route.getSearch}  ${req.url}`)
      Axios.get(connectionString + register.services.route.getSearch + req.url )
          .then((Response) => {
            res.json(Response.data);
          })
          .catch(error => {
            errors.data="Something went wrong with the server. Please try again later!"
            return res.status(400).json(errors);
            //console.log(error);
          });
  })
  .catch(error=>{
    console.log(error+"erorr")
    return res.status(400).json(error);
  });



  }
);

module.exports = router;