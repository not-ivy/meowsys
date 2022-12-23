export default {
  info: (message: string) => {
    console.log(`%c[${Date.now()}] %c[info]`, 'color: #555', 'color: #0ff', message);
  },
  warn: (message: string) => {
    console.log(`%c[${Date.now()}] %c[warn]`, 'color: #555', 'color: #ff0', message);
  },
  error: (message: string) => {
    console.log(`%c[${Date.now()}] %c[error]`, 'color: #555', 'color: #f00', message);
  },
};
