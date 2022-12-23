import logger from './utils/logger';

export default {
  run: (creep: Creep) => {
    if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
      creep.memory.harvesting = false;
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.harvesting = true;
    }

    if (creep.memory.harvesting) {
      const source = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
      if (source) {
        const result = creep.harvest(source);
        if (result === ERR_NOT_IN_RANGE) {
          creep.moveTo(source, { visualizePathStyle: { stroke: '#9bc' } });
        } else if (result !== OK) {
          logger.error(`Error harvesting energy from source: ${result}`);
        }
      }
    } else {
      if (creep.transfer(creep.room.controller!, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller!, { visualizePathStyle: { stroke: '#9bc' } });
      }
    }
  },
};
