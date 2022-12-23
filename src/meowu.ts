import logger from './utils/logger';

export default {
  run: (creep: Creep) => {
    if (creep.store.getFreeCapacity() > 0) {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    } else {
      if (creep.upgradeController(creep.room.controller!) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller!);
      }
    }
  },
};
