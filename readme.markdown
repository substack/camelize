# camelize

recursively transform key strings to camel-case

[![build status](https://secure.travis-ci.org/substack/camelize.png)](http://travis-ci.org/substack/camelize)

[![browser support](https://ci.testling.com/substack/camelize.png)](http://ci.testling.com/substack/camelize)

# example

``` js
var camelize = require('camelize');
var obj = {
    fee_fie_foe: 'fum',
    beep_boop: [
        { 'abc.xyz': 'mno' },
        { 'foo-bar': 'baz' }
    ]
};
var res = camelize(obj);
console.log(JSON.stringify(res, null, 2));
```

output:

```
{
  "feeFieFoe": "fum",
  "beepBoop": [
    {
      "abcXyz": "mno",
    },
    {
      "fooBar": "baz"
    }
  ]
}
```

Also supports ignoring certain keys by second parameter.  This parameter should be an object with an "ignore" property, which is an array of key names to ignore.  Useful for mongo "_id" fields.

``` js
var camelize = require('camelize');
var obj = {
    _id: "abc123",
    fee_fie_foe: 'fum',
    beep_boop: [
        { 'abc.xyz': 'mno', _id: "def456" },
        { 'foo-bar': 'baz' }
    ]
};
var res = camelize(obj, { ignore: ["_id"] });
console.log(JSON.stringify(res, null, 2));
```

output

```
{
  "_id": "abc123",
  "feeFieFoe": "fum",
  "beepBoop": [
    {
      "abcXyz": "mno",
      "_id": "def456"
    },
    {
      "fooBar": "baz"
    }
  ]
}
```

# methods

``` js
var camelize = require('camelize')
```

## camelize(obj, [options])

Convert the key strings in `obj` to camel-case recursively.

If provided, the second parameter should be an object that can have the following properties

- ignore: should be an array of keys to ignore (leave as-is) when converting.

# install

With [npm](https://npmjs.org) do:

```
npm install camelize
```

To use in the browser, use [browserify](http://browserify.org).

# license

MIT
