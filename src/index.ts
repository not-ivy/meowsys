import meowh from './meowh';
import meowu from './meowu';
import bodies from './utils/bodies';
import config from './config';
import logger from './utils/logger';
import rand from './utils/rand';

const meowm: { [meows: string]: { run: (creep: Creep) => void } } = {
  meowh,
  meowu,
};

const init = () => {
  Game.spawns[config.spawn].spawnCreep(bodies.meowh, `meowh-${rand.str()}`);
};

const loop = () => {
  const ameowh = Object.keys(Game.creeps).filter((name) => name.slice(0, 5) === 'meowh').length;
  const ameowu = Object.keys(Game.creeps).filter((name) => name.slice(0, 5) === 'meowu').length;

  Object.keys(Game.creeps).forEach((name) => {
    meowm[name.slice(0, 5)].run(Game.creeps[name]); // why use memory :tro:
  });

  if (Game.spawns[config.spawn].store[RESOURCE_ENERGY] > 200) {
    if (ameowh > 0 && ameowu < config.amount_meowu) {
      logger.info('spawning meowu');
      Game.spawns[config.spawn].spawnCreep(bodies.meowu, `meowu-${rand.str()}`);
    }
    if (ameowh < config.amount_meowh) {
      logger.info('spawning meowh');
      Game.spawns[config.spawn].spawnCreep(bodies.meowh, `meowh-${rand.str()}`);
    }
  }
};

if (Object.keys(Game.creeps).length === 0) init();

logger.info('meowsys is running!');

module.exports.loop = loop;
