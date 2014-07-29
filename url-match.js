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
   * @param patternString {!String} The url match pattern that this instance represents.
   * @constructor
   */
  var Pattern = function(patternString) {
    this.patternString_ = patternString;
  };

  // split this regex out for regex-clarity.
  Pattern.VALID_ALL_URL_REGEX = /^<all_urls>$/;
  // taken from http://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149
  Pattern.ALL_URL_REGEX = /^(\*|http|https|file|ftp|chrome-extension):\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  Pattern.VALID_MATCHER_REGEX = /^(\*|http|https|file|ftp|chrome-extension):\/\/(\*|(\*\.)?[^\/\*]+)?\/(.*)$/;

  /**
   * Is this pattern valid with regards to 
   * https://developer.chrome.com/extensions/match_patterns
   * @return true if valid, false otherwise
   */
  Pattern.prototype.isValid = function() {
    return Pattern.VALID_ALL_URL_REGEX.test(this.patternString_) 
        || Pattern.VALID_MATCHER_REGEX.test(this.patternString_);   
  };

  /**
   * Turns this pattern into a valid javascript regexp.
   * @return {!RegExp}
   */
  Pattern.prototype.toRegExp = function() {
    //TODO(tyler.s.rhodes): validity check.
    if (!this.regExp_ && this.isValid()) {
      if (Pattern.VALID_ALL_URL_REGEX.test(this.patternString_)) {
        this.regExp_ = Pattern.ALL_URL_REGEX;
      } else {
        var matchResults = Pattern.VALID_MATCHER_REGEX.exec(this.patternString_);
        var output = '/^';
        output += matchResults[1].replace(/\*/, '[^:]*');
        output += ':\\/\\/';
        if (matchResults.length > 2) {
          output += matchResults[2].replace(/\./, '\\.').replace(/\*/, '[^\\/]*');
        }
        output += "\\/.*$";
        this.regExp_ = new RegExp(output);
      }
    }

    return this.regExp_;
  };

  var PatternFactory = {};
  /**
   * @param obj {!Pattern|String} Object to create a pattern for.
   */
  PatternFactory.create = function(obj) {
    if (obj instanceof Pattern) {
      return obj;
    }

    // TODO(tyler.s.rhodes): caching of some sort
    return new Pattern(obj);
  };

  /**
   * @param pattern {!Pattern|String}
   */
  var Matcher = function(pattern) {
    this.pattern_ = PatternFactory.create(pattern);
    if (!this.pattern_.isValid()) {
      // TODO(tyler.s.rhodes): what to do?
    }
  };
  Matcher.prototype.matches = function(string) {
    return true;
  };

  // exports!
  exp.Matcher = Matcher;
  exp.Pattern = Pattern;
  exp.PatternFactory = PatternFactory;
}));
