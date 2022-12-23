import logger from './utils/logger';

export default {
  run: (creep: Creep) => {
    if (creep.store.getFreeCapacity() > 0) {
      harvest(creep);
    } else {
      transfer(creep);
    }
  },
};

const harvest = (creep: Creep) => {
  const path = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
  if (!path) return logger.error('no path found, aborting');
  const tryHarvest = creep.harvest(path);
  if (tryHarvest === ERR_NOT_IN_RANGE) {
    return creep.moveTo(path);
  }
};

const transfer = (creep: Creep) => {
  if (!creep.room.controller) {
    return;
  }
  const tryTransfer = creep.transfer(creep.room.controller, RESOURCE_ENERGY);
  if (tryTransfer === ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller);
  }
};
