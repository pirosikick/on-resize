export const defaultOptions = {
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

export function create () {
  return Object.create(defaultOptions);
}

