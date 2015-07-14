on-resize
=========

[![npm package](https://nodei.co/npm/on-resize.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/on-resize/)

[![Build status](https://img.shields.io/travis/pirosikick/on-resize.svg?style=flat-square)](https://travis-ci.org/pirosikick/on-resize)
[![Dependency Status](https://img.shields.io/david/pirosikick/on-resize.svg?style=flat-square)](https://david-dm.org/pirosikick/on-resize)

ES7 Decorator & Higher-Order Component for React, which is useful on resize event.

## Installation

```
$ npm install --save on-resize
```

## Usage

### ES7 Decorator

```javascript
import React from "react";
import {onResize} from "on-resize/react";

@onResize()
class Example extends React.Component {
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

If you want to customize that prop name or value, you can pass function or use `select` option:

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

### Higher-Order Component

```javascript
function bindOnResize(Component, options = {Function|Object})
```

```javascript
import React from "react";
import {bindOnResize} from "on-resize/react";

class Example extends Component {
  render () {
    let {width, height, children} = this.props;
    return <div style={{ width, height }}>{children}</div>;
  }
}

Example = bindOnResize(Example)

React.render(<Example><h1>Hello</h1></Example>, document.body);
```

## Todo

- [ ] Add tests more
- [X] Support Higher-Order Component
- [ ] Support other Virtual DOM libraries

## License

[MIT](http://pirosikick.mit-license.org/)
