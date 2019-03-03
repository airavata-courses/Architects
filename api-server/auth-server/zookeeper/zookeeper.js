const zkObject=require("../../server.js");

const checkNodeExists=(path)=>{
    const zookeeperClient=zkObject.client;
    return new Promise((resolve,reject)=>{
        zookeeperClient.exists(path,function (error, stat) {
            if (error) {
                reject(false)
            }
            if (stat) {
                resolve(true)
            } else {
                reject(false)
            }})
    })
    

}

const getZnodeData=(path)=>{
    const zookeeperClient=zkObject.client;
    console.log(zookeeperClient);
    return new Promise((resolve,reject)=>{
        zookeeperClient.getData(
            path,
            function (event) {
                console.log('Got event: %s.', event);
            },
            function (error, data, stat) {
                if (error) {
                    console.log(error.stack);
                    reject(error.stack)
                }
                console.log('Got data: %s', data.toString('utf8'));
                resolve(data.toString('utf8'))          
            }
        );
    })
   
}

module.exports.znodeData=getZnodeData;
module.exports.znodeExists=checkNodeExists;
   