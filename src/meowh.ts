import logger from './utils/logger';

export default {
  run: (creep: Creep) => {
    if (creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) creep.memory.harvesting = false;
    if (!creep.memory.harvesting && creep.store.getFreeCapacity() === 0) creep.memory.harvesting = true;

    if (creep.memory.harvesting) {
      // harvesting
      const source = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
      if (!source) return logger.error(`${creep.name} failed to find source with ${source}`);

      const tryHarvest = creep.harvest(source);
      if (tryHarvest === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#68f' } });
      } else if (tryHarvest !== OK && !creep.spawning) {
        logger.warn(`${creep.name} harvesting failed with ${tryHarvest}`);
      }
    } else {
      // transferring
      const spawn = creep.pos.findClosestByPath(creep.room.find(FIND_MY_SPAWNS));
      if (!spawn) return logger.error(`${creep.name} failed to find spawn with ${spawn}`);

      const tryTransfer = creep.transfer(spawn, RESOURCE_ENERGY);
      if (tryTransfer === ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn, { visualizePathStyle: { stroke: '#68f' } });
      } else if (tryTransfer !== OK && tryTransfer !== ERR_FULL) {
        logger.warn(`${creep.name} transferring failed with ${tryTransfer}`);
      }
    }
  },
};
