var um = require('./url-match');

var validCases = {
  "http://*/*": {
    valid: [
      "http://google.com/abc",
      "http://foo/bar",
      "http://foo/bar/baz",
    ],
    invalid: [
      "https://google.com/abc",
      "http://google.com",
      "http://google.com/",
      "http:///bar",
      "://foo/bar",
      "http://"
      ]
  },
  "http://*/foo*": {
    valid: [
      "http://foo/foobar",
      "http://foo/foo",
      "http:///foo",
      "http://bar/food/sandwich",
    ],
    invalid: [
      "https://foo/foo",
      "http://foo/bar",
      "http://",
      "http:///",
      "http://foo/fo"
    ],
  },
  "https://*.google.com/foo*bar": {
    valid: [
      "https://www.google.com/foobar",
      "https://a.b.google.com/foobar",
      "https://www.google.com/foodbar",
    ],
    invalid: [
      "https://.google.com/foobar",
      "https://google.com/foobar",
      "https://www.google.com/fobar",
      "https://www.google.com/foo",
      "http://www.google.com/foobar",
      "https://www.google.com/foobard"
    ]
  }
//  "http://example.org/foo/bar.html",
//  "file:///foo*",
//  "http://127.0.0.1/*",
//  "*://mail.google.com/*",
//  "chrome-extension://*/*",
//  "<all_urls>"
}

module.exports = {
  Pattern: {
    testValidity: function(test) {
      for (var curCase in validCases.keys) {
        test.ok(new um.Pattern(curCase).isValid(),
            curCase + " should be valid, but is not.");
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
    testMatching: function(test) {
      for (var key in validCases) {
        console.log("Testing " + key);
        var curCase = validCases[key];
        var matcher = new um.Matcher(key);
        for (var i = 0; i < curCase.valid; i++) {
          var testString = curCase.valid[i];
          test.ok(matcher.matches(testString), key + " should match " + testString + ", but does not!");
        }
        for (var i = 0; i < curCase.invalid; i++) {
          var testString = curCase.invalid[i];
          test.ok(!matcher.matches(testString), key + " shouldn't match " + testString + ", but does!");
        }
      }
      test.done();
    
    }
  },
};
