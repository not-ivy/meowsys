export default {
  info: (message: string) => {
    console.log(`<font color="#555">[${Date.now()}]</font> <font color="#0ff">[info]</font>`, message);
  },
  warn: (message: string) => {
    console.log(`<font color="#555">[${Date.now()}]</font> <font color="#ff0">[warn]</font>`, message);
  },
  error: (message: string) => {
    console.log(`<font color="#555">[${Date.now()}]</font> <font color="#f00">[error]</font>`, message);
  },
};
