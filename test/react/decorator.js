import assert from "power-assert";
import React from "react/addons";
import decorator from "../../lib/react/decorator";

const TestUtils = React.addons.TestUtils;

describe("decorator", function () {
  it("returns Function", function () {
    assert(typeof(decorator()) === 'function');
  });

  describe("returned Function", function () {
    var retFun;
    beforeEach(function () {
      retFun = decorator();
    })

    describe("when passing React.Component", function () {
      var MaybeReactComponent;
      beforeEach(function () {
        class Component extends React.Component {
          render () { return <div></div>; }
        }

        MaybeReactComponent = retFun(Component);
      });

      it("returns subclass of React.Component", function () {
        assert(typeof(MaybeReactComponent) === 'function');
        assert.ok(TestUtils.isCompositeComponent(new MaybeReactComponent()));
      })
    })
  });
});
