'use strict';

(function(factory) {
  // Support three module loading scenarios
  if (typeof require === 'function' 
    && typeof exports === 'object' 
    && typeof module === 'object') {
    // [1] CommonJS/Node.js
    var target = module['exports'] || exports; // module.exports is for Node.js
    factory(target, require);
  } else if (typeof define === 'function' && define['amd']) {
    // [2] AMD anonymous module
    define(['exports', 'require'], factory);
  } else {
    // [3] No module loader (plain <script> tag) - put directly in global 
    // namespace
    factory(window['um'] = {});
  }
} (function(exp, require) {
  
  /**
   * @param pattern {!String}
   */
  var Matcher = function(patternString) {
    this.patternString_ = patternString;

    this.isValid.bind(this);
    this.getMatcherRegex_.bind(this);
    this.test.bind(this);
  };

  // split this regex out for regex-clarity.
  Matcher.VALID_ALL_URL_REGEX = /^<all_urls>$/;
  // taken from http://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149
  Matcher.ALL_URL_REGEX = /^(\*|http|https|file|ftp|chrome-extension):\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  Matcher.VALID_MATCHER_REGEX = /^(\*|http|https|file|ftp|chrome-extension):\/\/(\*|(\*\.)?[^\/\*]+)?\/(.*)$/;

  Matcher.prototype.isValid = function() {
    return Matcher.VALID_ALL_URL_REGEX.test(this.patternString_) 
        || Matcher.VALID_MATCHER_REGEX.test(this.patternString_);   
  };

  Matcher.prototype.getMatcherRegex_ = function(patternString) {
    if (!this.matcher_ && this.isValid()) {
      if (Matcher.VALID_ALL_URL_REGEX.test(this.patternString_)) {
        this.regExp_ = Matcher.ALL_URL_REGEX;
      } else {
        var matchResults = Matcher.VALID_MATCHER_REGEX.exec(this.patternString_);
        var output = '/^';
        output += matchResults[1].replace(/\*/, '[^:]*');
        output += ':\\/\\/';
        if (matchResults.length > 2) {
          output += matchResults[2].replace(/\./, '\\.').replace(/\*/, '[^\\/]*');
        }
        output += '\\/.*$';
        this.matcher_ = new RegExp(output);
      }
    }
    return this.matcher_;
  };

  Matcher.prototype.test = function(string) {
    if (!this.isValid()) {
      console.log('Pattern "' + this.patternString_ + '" is not valid! Not matching any strings.');
      return false;
    }
    return this.getMatcherRegex_().test(string);
  };

  // exports!
  exp.Matcher = Matcher;
}));
