import logger from './utils/logger';

const harvest = (creep: Creep) => {
  const source = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
  if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }
};

const transfer = (creep: Creep) => {
  const spawn = creep.pos.findClosestByPath(creep.room.find(FIND_MY_SPAWNS));
  if (!spawn) return logger.error(`${creep.name} failed to find spawn`);

  const controller = creep.room.controller;
  if (!controller) return logger.error(`${creep.name} failed to find controller`);

  if (creep.transfer(spawn, RESOURCE_ENERGY, 50) === ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn);
  }
};

export default {
  run: (creep: Creep) => {
    if (creep.store.getFreeCapacity() > 0) {
      harvest(creep);
    } else {
      transfer(creep);
    }
  },
};
