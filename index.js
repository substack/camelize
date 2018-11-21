module.exports = function(obj, opts) {
    if (typeof obj === 'string') return camelCase(obj, opts);
    return walk(obj, opts);
};

function walk (obj, opts) {
    if (!obj || typeof obj !== 'object') return obj;
    if (isDate(obj) || isRegex(obj)) return obj;
    if (isArray(obj)) return map(obj, walk, opts);
    return reduce(objectKeys(obj), function (acc, key) {
        var camel = camelCase(key, opts);
        acc[camel] = walk(obj[key], opts);
        return acc;
    }, {});
}

function camelCase(str, opts) {
    opts = opts || {};
    var acronyms = opts.acronyms || {};
    var transform = opts.transform;
    var skip = opts.skip;
    var acronymsKeys = Object.keys(acronyms);

    if (skip && skip.test(str)) return str;
    if (transform) return transform(str);

    return str.replace(/[_.-]([^_.-]+|$)/g, function (_,x) {
        if (acronymsKeys.indexOf(x) > -1) return acronyms[x];

        return x.substr(0, 1).toUpperCase() + x.substr(1);
    });
}

var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

var isDate = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
};

var isRegex = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var has = Object.prototype.hasOwnProperty;
var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) {
        if (has.call(obj, key)) keys.push(key);
    }
    return keys;
};

function map (xs, f, o) {
    if (xs.map) return xs.map(function (obj) { return f(obj, o); });
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        res.push(f(xs[i], o));
    }
    return res;
}

function reduce (xs, f, acc) {
    if (xs.reduce) return xs.reduce(f, acc);
    for (var i = 0; i < xs.length; i++) {
        acc = f(acc, xs[i], i);
    }
    return acc;
}
