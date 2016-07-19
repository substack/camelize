module.exports = function(obj) {
    if (typeof obj === 'string') return camelCase(obj);
    return walk(obj);
};

module.exports.circular = walkCircular;

function walk (obj) {
    if (!obj || typeof obj !== 'object') return obj;
    if (isDate(obj) || isRegex(obj)) return obj;
    if (isArray(obj)) return map(obj, walk);
    return reduce(objectKeys(obj), function (acc, key) {
        var camel = camelCase(key);
        acc[camel] = walk(obj[key]);
        return acc;
    }, {});
}

function walkCircular (obj) {
    var seen = cache();
    return walk(obj);
    function walkArray(out, xs) {
        for (var i = 0; i < xs.length; i++) {
            out[i] = walk(xs[i]);
        }
        return out;
    }
    function walk (obj) {
        var out;
        if (!obj || typeof obj !== 'object') return obj;
        if (isDate(obj) || isRegex(obj)) return obj;
        out = seen.get(obj);
        if (out) {
            return out;
        }
        if (isArray(obj)) {
            out = [];
            seen.set(obj, out);
            return walkArray(out, obj);
        }
        out = {};
        seen.set(obj, out);
        return reduce(objectKeys(obj), function (acc, key) {
            var camel = camelCase(key);
            acc[camel] = walk(obj[key]);
            return acc;
        }, out);
    }
}

function camelCase(str) {
    return str.replace(/[_.-](\w|$)/g, function (_,x) {
        return x.toUpperCase();
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

var cache = typeof WeakMap === 'function' ?
    function () {
        return new WeakMap();
    } :
    function () {
        var keys = [];
        var values = [];
        return {
            set: function (key, value) {
                keys.push(key);
                values.push(value);
            },
            get: function(key) {
                for (var i = 0; i < keys.length; i++) {
                    if (keys[i] === key) {
                        return values[i];
                    }
                }
            }
        }
    }

var has = Object.prototype.hasOwnProperty;
var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) {
        if (has.call(obj, key)) keys.push(key);
    }
    return keys;
};

function map (xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        res.push(f(xs[i], i));
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

