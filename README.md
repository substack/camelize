# camelize2

Recursively transform key strings to camel-case

[![build status](https://secure.travis-ci.org/DenysIvko/camelize2.png)](http://travis-ci.org/DenysIvko/camelize2)

## Why do we need camelize2?

[camelize](https://github.com/substack/camelize) is a great and simple library.
But unfortunately repository seems to be dead and has not been updated for a long time.

Camelize2 for the resque!

This library provides new features according to developer needs.
This library fixes issues of [camelize](https://github.com/substack/camelize).
This library is opened for [contributing](#contributing).

was initially forked from [camelize](https://github.com/substack/camelize).


## Example

``` js
const camelize = require('camelize');

const obj = {
    fee_fie_foe: 'fum',
    beep_boop: [
        { 'abc.xyz': 'mno' },
        { 'foo-bar': 'baz' }
    ]
};

const res = camelize(obj);

console.log(JSON.stringify(res, null, 2));
```

Output:

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

### Installing

NPM

```
npm install camelize2
```


## Running the tests

You can run tests with the following command:

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

