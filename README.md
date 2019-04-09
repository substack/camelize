# camelize2

Super handy and flexible library for transforming any-shape key strings to camel-case

[![build status](https://secure.travis-ci.org/DenysIvko/camelize2.png)](http://travis-ci.org/DenysIvko/camelize2)

## Why do we need camelize2?

[camelize](https://github.com/substack/camelize) is a great and simple library.
But unfortunately repository seems to be dead and has not been updated for a long time.

**Camelize2 for the resque!**

:white_check_mark: This library provides new features according to developer needs.

:white_check_mark: This library fixes issues of [camelize](https://github.com/substack/camelize).

:white_check_mark: This library uses Mocha for testing

:white_check_mark: This library is opened for [contributing](#contributing).

Initially was forked from [camelize](https://github.com/substack/camelize).


## Examples

``` js
const camelize = require('camelize2')

// You can pass strings
camelize('Foo-Bar')
//=> 'fooBar'


// You can pass objects
camelize({
    'abc.xyz': 'mno'
})
//=> {'abcXyz': 'mno'}


// You can pass arrays 
camelize([
     { 'abc.xyz': 'mno' },
     { 'foo-bar': 'baz' }
 ])
//=> [{'abcXyz': 'mno'}, {'fooBar': 'baz'}]


// Also you can pass more complex structures
camelize({
    fee_fie_foe: 'fum',
    beep_boop: [
        { 'abc.xyz': 'mno' },
        { 'foo-bar': 'baz' }
    ]
});
//=>    {
//=>        "feeFieFoe": "fum",
//=>        "beepBoop": [
//=>            {
//=>                "abcXyz": "mno"
//=>            },
//=>            {
//=>                "fooBar": "baz"
//=>            }
//=>        ]
//=>    }


// In case you passed other types, you get them back
camelize(true)
//=> true
```

## When to use camelize2?

Let's say you've got following response from backend:
```json
{
  "items": [
    {
      "product_name": "Table",
      "product_category_tags": [
        "chip",
        "handy"
      ],
      "short_url": "http://as.is/941"
    },
    {
      "product_name": "Chair",
      "product_category_tags": [
      ],
      "short_url": "http://as.is/943"
    }
  ],
  "count": 2
}
```

With camelcase2 you can easily convert to camel case: 

```json
{
  "items": [
    {
      "productName": "Table",
      "productCategoryTags": [
        "chip",
        "handy"
      ],
      "shortUrl": "http://as.is/941"
    },
    {
      "productName": "Chair",
      "productCategoryTags": [
      ],
      "shortUrl": "http://as.is/943"
    }
  ],
  "count": 2
}
```

### Installing

NPM

```
npm install camelize2
```


## Running the tests

You can run Mocha tests with the following command:

```
npm run test
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **James Halliday** - *Initial work* - [camelize](https://github.com/substack/camelize)
* **Denys Ivko** - *Inspired follower* -

See also the list of [contributors](https://github.com/DenysIvko/camelize2/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

