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
  var Pattern = function(patternString) {
    this.patternString_ = patternString;
  };

  // split this regex out for regex-clarity.
  Pattern.VALID_ALL_URL_REGEX = /^<all_urls>$/;
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

  var PatternFactory = {};
  PatternFactory.create = function(obj) {
    if (obj instanceof Pattern) {
      return obj;
    }

    // TODO(tyler.s.rhodes): caching of some sort
    return new Pattern(obj);
  };

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
