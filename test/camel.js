var assert = require('assert');
var camelize = require('../');

var obj = {
    fee_fie_foe: 'fum',
    beep_boop: [
        { 'abc.xyz': 'mno' },
        { 'foo-bar': 'baz' }
    ]
};

describe('camelize2', function () {
    it('nested object', function () {
        var res = camelize(obj);
        assert.deepEqual(res, {
            'feeFieFoe': 'fum',
            'beepBoop': [
                { 'abcXyz': 'mno' },
                { 'fooBar': 'baz' }
            ]
        });
    });

    it('string', function () {
        assert.equal(camelize('one_two'), 'oneTwo');
    });

    it('date', function () {
        var d = new Date();
        assert.equal(camelize(d), d);
    });

    it('regex', function () {
        var r = /1234/;
        assert.equal(camelize(r), r);
    });

    it('only camelize strings that are the root value', function () {
        assert.equal(camelize('foo-bar'), 'fooBar');
        var res = camelize({'foo-bar': 'baz-foo'});
        assert.deepEqual(res, {fooBar: 'baz-foo'});
    });
});
