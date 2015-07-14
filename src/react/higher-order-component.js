import {create as createOptions} from "./options";
import {Component as ReactComponent} from "react";

export default function bindOnResize (Component, options) {
  let _options;

  if (typeof(options) === 'object') {
    _options = options;
  } else {
    _options = createOptions();

    if (typeof(options) === 'function') {
      _options.select = options;
    }
  }

  let {select, eventTarget, callOnMounted, bind, unbind} = _options;

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
