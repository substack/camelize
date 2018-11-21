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
      "abcXyz": "mno"
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

## camelize(obj, opts = {})

Convert the key strings in `obj` to camel-case recursively.

### options

You can pass an object of options. Available options:

- `acronyms`

Replaces found coincidences with their corresponding value:

```js
var camelize = require('camelize');
var acronyms = { id: 'ID', url: 'URL' };
var obj = { id: 1, image_url 'example.com', category_id: 2 };
var res = camelize(obj, { acronyms: acronyms });
```

output:

```json
{
  "id": 1,
  "imageURL": "example.com",
  "categoryID": 2
}
```

- `transform`

Uses passed function to transform key:

```js
var camelize = require('camelize'):
var transform = function(x) { return x.replace(/\d/g, 'x'); }
var obj = { id: 1, foo1: 'bar' };
var res = camelize(obj, { transform: transform });
```

output:

```json
{
  "id": 1,
  "foox": "bar"
}
```

- `skip`

Skips transformation if key matches passed regex.

```js
var camelize = require('camelize'):
var skip = /\d{4}-\d{1,2}-\d{1,2}/;
var obj = { id: 1, '1970-01-01': 'bar' };
var res = camelize(obj, { skip: skip });
```

output:

```json
{
  "id": 1,
  "1970-01-01": "bar"
}
```

# install

With [npm](https://npmjs.org) do:

```
npm install camelize
```

To use in the browser, use [browserify](http://browserify.org).

# license

MIT
