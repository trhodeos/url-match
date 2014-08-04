# url-match
`url-match` is a simple url-matching library, taken from [here](https://developer.chrome.com/extensions/match_patterns).

# installing
`bower install url-match`

# using
This package is compatible with CommonJS/NodeJS, anonymous AMD/RequireJS, or window scoping.

```
var matcher = new um.Matcher('http://www.google.com/*');
console.log(matcher.test('http://www.google.com/foo'); // -> true
console.log(matcher.test('http://foo.google.com/bar'); // -> false
```
