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
  },
  "http://example.org/foo/bar.html": {
    valid: [
      "http://example.org/foo/bar.html"
    ],
    invalid: [
      "http://example.org/foo/bar.htm",
      "http://example.org/foo/bar.htmls"
    ]
  },
  "file:///foo*": {
    valid: [
      "file:///foo",
      "file:///foobar"
    ],
    invalid: [
      "files://foo",
      "file://fo",
      "file://fooo"
    ]
  },
  "http://127.0.0.1/*": {
    valid: [
      "http://127.0.0.1/",
      "http://127.0.0..//",
      "http://127.0.0../foobar123"
    ],
    invalid: [
      "http://127.0.0../",
      "http://127.0.01/"
    ]
  },
  "*://mail.google.com/*": {
    valid: [
      "http://mail.google.com/",
      "https://mail.google.com/",
      "https://mail.google.com/foo",
      "chrome-extension://mail.google.com/"
    ],
    invalid: [
      "foo://mail.google.com/",
      "https://mail.google.com"
    ]
  },
  "chrome-extension://*/*": {
    "valid": [
      "chrome-extension://foo/bar",
      "chrome-extension:///bar"
    ],
    "invalid": [
      "chrome-extension://"
    ]
  },
  "<all_urls>": {
    "valid": [
      "http://google.com"
      ],
    "invalid": [
      "blah://google.com"
      ]
  }
}

module.exports = {
  testValidity: function(test) {
    for (var curCase in validCases.keys) {
      test.ok(new um.Matcher(curCase).isValid(),
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
      test.ok(!new um.Matcher(cases[i]).isValid(),
          cases[i] + " shouldn't be valid, but is.");
    }
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
};
