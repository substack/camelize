var test = require('tape');
var camelize = require('../');

var obj = {
    fee_fie_foe: 'fum',
    beep_boop: [
        { 'abc.xyz': 'mno' },
        { 'foo-bar': 'baz' }
    ]
};

test('camelize a nested object', function (t) {
    t.plan(1);
    var res = camelize(obj);
    t.deepEqual(res, {
        "feeFieFoe": "fum",
        "beepBoop": [
            { "abcXyz": "mno" },
            { "fooBar": "baz" }
        ]
    });
});

test('string', function (t) {
    t.plan(1);
    t.equal(camelize('one_two'), 'oneTwo');
});

test('date', function (t) {
    t.plan(1);
    var d = new Date();
    t.equal(camelize(d), d);
});

test('regex', function (t) {
    t.plan(1);
    var r = /1234/;
    t.equal(camelize(r), r);
});

test('only camelize strings that are the root value', function (t) {
    t.plan(2);
    t.equal(camelize('foo-bar'), 'fooBar');
    var res = camelize({ 'foo-bar': 'baz-foo' });
    t.deepEqual(res, { fooBar: 'baz-foo' });
});

test('uses passed acronyms', function(t) {
    var opts = { acronyms: { id: 'ID' } };

    t.plan(3);
    t.equal(camelize('my_id', opts), 'myID');

    var obj = camelize({ 'my_id': 'nested', 'id': 'foo' }, opts);
    t.deepEqual(obj, { myID: 'nested', id: 'foo' });

    var arr = camelize(['my_id'], opts);
    t.deepEqual(arr, ['my_id']);
});

test('uses transform function passed', function(t) {
    var opts = {
      transform: function (x) { return 'foo'; },
    };

    t.plan(1);
    t.equal(camelize('bar', opts), 'foo');
});

