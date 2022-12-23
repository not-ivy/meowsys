const init = () => {
  const spawn = Game.spawns["meow"];
  const body = [WORK, CARRY, MOVE];
  const name = "meowh1";
  spawn.spawnCreep(body, name);
};

export const loop = () => {};

Object.keys(Game.creeps).length === 0 && init();

module.exports.loop = loop;
