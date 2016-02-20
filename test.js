// Require all the modules
var chai = require('chai');
chai.should();
var request = require('request');

describe('fake test',function() {
  it('should be true',function() {
    var x = true;
    x.should.be.true;
  });
});

describe('save values frome one test to another',function() {
  var saveThis;
  describe('make the first request',function() {
    it('should get dateTime', function (done){
      this.slow(500); this.timeout(1500);
      makeRequest('http://www.timeapi.org/pdt/next+monday',function(x){
        var y = JSON.parse(x)
        saveThis = y.dateString;
        y.should.have.property('dateString');
        done();
      });
    });
  });
  describe('make the second request',function() {
    it('should have identical dateTime to first request', function (done){
      this.slow(500); this.timeout(1500);
      makeRequest('http://www.timeapi.org/pdt/next+monday',function(x){
        var y = JSON.parse(x)
        y.dateString.should.equal(saveThis);
        done();
      });
    });
  });
});




function makeRequest(urlV,callback){
  if(callback === undefined) return;
  request({
    method: 'GET',
    url: urlV,
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'request'
    },
  },
  function (error, response, body) {
    if(response.statusCode == 200){
      callback(body);
    } else {
      console.log("error statusCode:" + response.statusCode);
      callback(body);
    }
  });
}
