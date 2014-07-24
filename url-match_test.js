var um = require('./url-match');

module.exports = {
  testBasicMatching: function(test) {
    var matcher = new um.Matcher("http://*.google.com");
    test.ok(matcher.matches("http://www.google.com"));
    test.done();
  }

};
