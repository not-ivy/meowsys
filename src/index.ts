import meowh from './meowh';

const init = () => {
  const spawn = Game.spawns['meow'];
  const body = [WORK, CARRY, MOVE];
  const name = 'meowh1';
  spawn.spawnCreep(body, name);
};

const loop = () => {
  Object.keys(Game.creeps).forEach((name) => {
    name.startsWith('meowh') && meowh.run(Game.creeps[name]);
  });
};

Object.keys(Game.creeps).length === 0 && init();

module.exports.loop = loop;
