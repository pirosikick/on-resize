import {Component as ReactComponent} from "react";

const defaultOptions = {
  select: (props) => ({
    width: window.innerWidth - ((props.offsetWidth - 0) || 0),
    height: window.innerHeight - ((props.offsetHeight - 0) || 0),
  }),
  eventTarget: typeof(window) === 'object' ? window : false,
  callOnMounted: true,
  bind: (target, listener) => {
    target && target.addEventListener('resize', listener, false);
  },
  unbind: (target, listener) => {
    target && target.removeEventListener('resize', listener, false);
  }
};

/**
 * @onResize()
 * @onResize((props) => ({ ... }))
 * @onResize({
 *   select: (props) => {{ ... }),
 *   eventTarget: window,
 *   callOnMounted: true
 * })
 */
export default function onResizeDecorator (arg) {
  let options;

  if (typeof(arg) === 'object') {
    options = arg;
  } else {
    options = Object.create(defaultOptions);

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
