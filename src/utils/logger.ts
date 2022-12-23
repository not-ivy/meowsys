export default {
  info: (message: string) => {
    console.log('%c[meowsys]', 'color: #555', '%[info]', 'color: #fff', message);
  },
  warn: (message: string) => {
    console.log('%c[meowsys]', 'color: #555', '%[warn]', 'color: #ff0', message);
  },
  error: (message: string) => {
    console.log('%c[meowsys]', 'color: #555', '%[error]', 'color: #f00', message);
  },
};
