var camelCase = require("camelcase");

var defaults = {
  blacklist: []
};

module.exports = function(obj, options = {}) {
  if (typeof obj === "string") return camelCase(obj);
  return walk(obj, { ...defaults, ...options });
};

function walk(obj, options) {
  if (!obj || typeof obj !== "object") return obj;
  if (isDate(obj) || isRegex(obj)) return obj;
  if (isArray(obj)) return map(obj, walk, options);
  return reduce(
    objectKeys(obj),
    function(acc, key) {
      var newKey = options.blacklist.includes(key) ? key : camelCase(key);
      acc[newKey] = walk(obj[key], options);
      return acc;
    },
    {},
    options
  );
}

var isArray =
  Array.isArray ||
  function(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

var isDate = function(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
};

var isRegex = function(obj) {
  return Object.prototype.toString.call(obj) === "[object RegExp]";
};

var has = Object.prototype.hasOwnProperty;
var objectKeys =
  Object.keys ||
  function(obj) {
    var keys = [];
    for (var key in obj) {
      if (has.call(obj, key)) keys.push(key);
    }
    return keys;
  };

function map(xs, f, options) {
  if (xs.map) return xs.map((x, i) => f(x, options));
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

function reduce(xs, f, acc, options) {
  if (xs.reduce) return xs.reduce((e, i) => f(e, i, options), acc);
  for (var i = 0; i < xs.length; i++) {
    acc = f(acc, xs[i], i);
  }
  return acc;
}
