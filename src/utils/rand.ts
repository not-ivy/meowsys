export default {
  str: (len: number = 5) =>
    Math.random()
      .toString(36)
      .substring(2, len + 2),
  uuid: () => {
    const time = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line no-bitwise
      const r = (time + Math.random() * 16) % 16 | 0;
      // eslint-disable-next-line no-bitwise
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  },
};
