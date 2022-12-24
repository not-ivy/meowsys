export default {
  spawn: 'Spawn1',
  amounts: {
    meowh: 3,
    meowu: 5,
    meowb: 5,
  },
  warn_filter: (input) => input !== 0,
} as {
  spawn: string;
  amounts: {
    [meows: string]: number;
  };
  warn_filter: (input: ScreepsReturnCode) => boolean;
};
