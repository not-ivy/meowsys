import meowh from './meowh';
import meowu from './meowu';
import bodies from './utils/bodies';
import config from './config';
import logger from './utils/logger';
import rand from './utils/rand';
import meowb from './meowb';

const meowm: { [meows: string]: { run: (creep: Creep) => void } } = {
  meowh,
  meowu,
  meowb,
};

const init = () => {
  Game.spawns[config.spawn].spawnCreep(bodies.meowh, `meowh-${rand.str()}`);
};

const loop = () => {
  spawnCreeps();
  runCreeps();
  buildExtensions();
};

const spawnCreeps = () => {
  const amounts = new Map<keyof typeof meowm, number>();
  const controller = Game.spawns[config.spawn].room.controller;

  if (!controller) {
    logger.error('no controller present');
    return;
  }

  Object.keys(meowm).forEach((name) => {
    amounts.set(name, Object.keys(Game.creeps).filter((creep) => creep.slice(0, 5) === name).length);
  });

  if (Game.spawns[config.spawn].room.energyAvailable > 200) {
    amounts.forEach((amount, name) => {
      if (amount < config[`amount_${name}`]) {
        const result = Game.spawns[config.spawn].spawnCreep(bodies[name], `${name}-${rand.str()}`);
        if (result === OK) {
          logger.info(`spawning ${name}`);
        } else if (result === ERR_NAME_EXISTS) {
          logger.error(`${name} already exists`);
        } else {
          logger.error(`spawnCreep failed with ${result}`);
        }
      }
    });
  }
};

const runCreeps = () => {
  Object.keys(Game.creeps).forEach((name) => {
    meowm[name.slice(0, 5)].run(Game.creeps[name]);
  });
};

const buildExtensions = () => {
  const controller = Game.spawns[config.spawn].room.controller;

  if (!controller) {
    logger.error('no controller present');
    return;
  }

  if (controller.level >= 2) {
    const extensions = Game.spawns[config.spawn].room.find(FIND_MY_STRUCTURES, {
      filter: { structureType: STRUCTURE_EXTENSION },
    });
    if (extensions.length < 5) {
      const x = Game.spawns[config.spawn].pos.x;
      const y = Game.spawns[config.spawn].pos.y;
      Game.spawns[config.spawn].room.createConstructionSite(x, y - 1, STRUCTURE_EXTENSION);
      Game.spawns[config.spawn].room.createConstructionSite(x + 1, y, STRUCTURE_EXTENSION);
      Game.spawns[config.spawn].room.createConstructionSite(x, y + 1, STRUCTURE_EXTENSION);
      Game.spawns[config.spawn].room.createConstructionSite(x - 1, y, STRUCTURE_EXTENSION);
      Game.spawns[config.spawn].room.createConstructionSite(x - 1, y - 1, STRUCTURE_EXTENSION);
    }
  }
};

if (Object.keys(Game.creeps).length === 0) init();

logger.info('meowsys is running!');

module.exports.loop = loop;
