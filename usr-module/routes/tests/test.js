var should= require("should");
var request= require("request");
var expect= require("chai").expect;
var util=require("util");

it('register on post', function(done) {
    request
      .post({ url: 'http://149.165.171.205:30038/getuser/dhan@iu.edu' })
      .send(
          {"firstName":"Deepak"},{
        "lastName":"hhhh"},{
        "userName":"dhanuman"},{
        "password":"hi12345"},{
        "email":"dhan@iu.edu"},{
        "skills":"node,react"},{
        "contactNumber":"812558"},{
        "userType":"Organization"}
     )
      .expect(200)
      .expect('Content-Type', /json/)
      done();
  });

describe('test getuserRoute', function() {
    it('test getuserRoute', function(done) {
        request.get({ url: 'http://149.165.171.205:30038/getuser/dhan@iu.edu' },
            function(error, response, body) {
            		const bodyObj = JSON.parse(body);
            		expect(bodyObj.email).to.equal("dhan@iu.edu");
                    expect(response.statusCode).to.equal(200);
                    console.log(body);
                done();
            });
    });
});


