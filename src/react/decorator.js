import { create as createOptions } from './options';
import React, { Component as ReactComponent } from 'react';

/**
 * @onResize()
 * @onResize((props) => ({ ... }))
 * @onResize({
 *   select: (props) => {{ ... }),
 *   eventTarget: window,
 *   callOnMounted: true
 * })
 */
export default function onResize(arg) {
  let options;

  if (typeof (arg) === 'object') {
    options = arg;
  } else {
    options = createOptions();

    if (typeof (arg) === 'function') {
      options.select = arg;
    }
  }

  const { select, eventTarget, callOnMounted, bind, unbind } = options;

  return function (Component) {
    class WrappedComponent extends ReactComponent {
      constructor(props) {
        super(props);

        this.state = {
          selected: {},
        };
      }

      onWindowResize = () => {
        this.setState({
          selected: select(this.props),
        });
      }

      componentDidMount() {
        bind(eventTarget, this.onWindowResize);

        if (callOnMounted) {
          this.onWindowResize();
        }
      }

      componentWillUnmount() {
        unbind(eventTarget, this.onWindowResize);
      }

      render() {
        const { selected } = this.state;
        return <Component {...this.props} {...selected} />;
      }
    }

    return WrappedComponent;
  };
}
