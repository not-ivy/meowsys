import config from './config';

export default {
  run: (creep: Creep) => {
    if (creep.store.getFreeCapacity() > 0) {
      const path = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
      if (path && creep.harvest(path) === ERR_NOT_IN_RANGE) creep.moveTo(path);
    } else if (creep.transfer(Game.spawns[config.spawn], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      const path = creep.pos.findClosestByPath(creep.room.find(FIND_MY_SPAWNS));
      if (path) creep.moveTo(path);
    }
  },
};
