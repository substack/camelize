var assert = require("assert");
var camelize = require("../");

var options = {
  blacklist: ["foo_biz"]
};

var obj = {
  fee_fie_foe: "fum",
  beep_boop: [
    { "abc.xyz": "mno" },
    { "foo-bar": "baz" },
    {
      biz_foo: {
        foo_biz: "biz",
        beep_boop: [{ "bar-foo": 100 }]
      }
    }
  ]
};

describe("camelize2", function() {
  it("nested object", function() {
    var res = camelize(obj, options);
    assert.deepEqual(res, {
      feeFieFoe: "fum",
      beepBoop: [
        { abcXyz: "mno" },
        { fooBar: "baz" },
        {
          bizFoo: {
            foo_biz: "biz",
            beepBoop: [{ barFoo: 100 }]
          }
        }
      ]
    });
  });

  it("string", function() {
    assert.equal(camelize("one_two"), "oneTwo");
  });

  it("date", function() {
    var d = new Date();
    assert.equal(camelize(d), d);
  });

  it("regex", function() {
    var r = /1234/;
    assert.equal(camelize(r), r);
  });

  it("only camelize strings that are the root value", function() {
    assert.equal(camelize("foo-bar"), "fooBar");
    var res = camelize({ "foo-bar": "baz-foo" });
    assert.deepEqual(res, { fooBar: "baz-foo" });
  });
});
