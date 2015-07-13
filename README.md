on-resize
=========

[![npm package](https://nodei.co/npm/on-resize.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/on-resize/)

[![Build status](https://img.shields.io/travis/on-resize/on-resize.svg?style=flat-square)](https://travis-ci.org/on-resize/on-resize)
[![Dependency Status](https://img.shields.io/david/on-resize/on-resize.svg?style=flat-square)](https://david-dm.org/on-resize/on-resize)

ES7 Decorator for React, which is useful on resize event.

## Installation

```
$ npm install --save on-resize
```

## Usage

### ES7 Decorator

```javascript
import {Component} from "react";
import onResize from "on-resize/react/decorator";

@onResize()
class Example extends Component {
  render () {
    // By default, when window.onresize emits, passes following props:
    //  `width`  : window.innerWidth - this.props.offsetWidth
    //  `height` : window.innerHeight - this.props.offsetHeight
    let {width, height, children} = this.props;

    return <div style={{ width, height }}>{children}</div>;
  }
}

React.render(<Example><h1>Hello</h1></Example>, document.body);
```

If you want to customize that prop name or value, you can 

```javascript
@onResize((props) => ({
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight
}))

// OR

@onResize({
  select: (props) => ({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  })
})
```

## Todo

- [ ] Add tests more
- [ ] Support Higher-Order Component
- [ ] Support other Virtual DOM libraries

## License

[MIT](http://pirosikick.mit-license.org/)
