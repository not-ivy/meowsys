import logger from './utils/logger';

export default {
  run: (creep: Creep) => {
    if (creep.store.getFreeCapacity() > 0) {
      const path = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
      if (path && creep.harvest(path) === ERR_NOT_IN_RANGE) creep.moveTo(path);
    } else {
      if (!creep.room.controller) {
        logger.error('no controller found, aborting');
        return;
      }
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  },
};
