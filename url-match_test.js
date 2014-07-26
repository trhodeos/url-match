var um = require('./url-match');

module.exports = {
  Pattern: {
    testValidity: function(test) {
      var cases = [
        "http://*.google.com"
      ];
      for (var i = 0; i < cases.length; i++) {
        test.equal(true, new um.Pattern(cases[i]).isValid());
      }
      test.done();
    },
      
    testInvalidity: function(test) {
      var cases = [
        "http://*"
      ];
      for (var i = 0; i < cases.length; i++) {
        test.equal(false, new um.Pattern(cases[i]).isValid());
      }
      test.done();
    }
  },
  PatternFactory: {

  },
  Matcher: {
    testBasicMatching: function(test) {
      var matcher = new um.Matcher("http://*.google.com");
      test.ok(matcher.matches("http://www.google.com"));
      test.done();
    },
  },

};
