import {create as createOptions} from "./options";
import {Component as ReactComponent} from "react";

/**
 * @onResize()
 * @onResize((props) => ({ ... }))
 * @onResize({
 *   select: (props) => {{ ... }),
 *   eventTarget: window,
 *   callOnMounted: true
 * })
 */
export default function onResize (arg) {
  let options;

  if (typeof(arg) === 'object') {
    options = arg;
  } else {
    options = createOptions();

    if (typeof(arg) === 'function') {
      options.select = arg;
    }
  }

  let {select, eventTarget, callOnMounted, bind, unbind} = options;

  return function (Component) {
    class WrappedComponent extends ReactComponent {
      constructor (props) {
        super(props);

        this.state = { selected: {} };
        this._onWindowResize = this.onWindowResize.bind(this);
      }

      onWindowResize () {
        this.setState({ selected: select(this.props) });
      }

      componentDidMount () {
        bind(eventTarget, this._onWindowResize);

        if (callOnMounted) this._onWindowResize();
      }

      componentWillUnmount () {
        unbind(eventTarget, this._onWindowResize);
      }

      render () {
        let {selected} = this.state;
        return <Component {...this.props} {...selected} />;
      }
    }

    return WrappedComponent;
  }
}
