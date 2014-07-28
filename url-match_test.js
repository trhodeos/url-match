var um = require('./url-match');

module.exports = {
  Pattern: {
    testValidity: function(test) {
      var cases = [
        "http://*/*",
        "http://*/foo*",
        "https://*.google.com/foo*bar",
        "http://example.org/foo/bar.html",
        "file:///foo*",
        "http://127.0.0.1/*",
        "*://mail.google.com/*",
        "chrome-extension://*/*",
        "<all_urls>"
      ];
      for (var i = 0; i < cases.length; i++) {
        test.ok(new um.Pattern(cases[i]).isValid(),
            cases[i] + " should be valid, but is not.");
      }
      test.done();
    },
      
    testInvalidity: function(test) {
      var cases = [
        "http://www.google.com",
        "http://*foo/bar",
        "http://foo.*.bar/baz",
        "http:/bar",
        "foo://*"
      ];
      for (var i = 0; i < cases.length; i++) {
        test.ok(!new um.Pattern(cases[i]).isValid(),
            cases[i] + " shouldn't be valid, but is.");
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
