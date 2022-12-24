import logger from './utils/logger';

export default {
  run: (creep: Creep) => {
    if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) creep.memory.harvesting = false;
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) creep.memory.harvesting = true;

    if (creep.memory.harvesting) {
      // harvesting
      const source = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
      if (!source) return logger.warn(`${creep.name} failed to find source with ${source}`);

      const tryHarvest = creep.harvest(source);
      if (tryHarvest === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      } else if (tryHarvest !== OK && !creep.spawning && tryHarvest !== ERR_NOT_ENOUGH_RESOURCES) {
        logger.warn(`${creep.name} harvesting failed with ${tryHarvest}`);
      }
    } else {
      // transferring
      const controller = creep.room.controller;
      if (!controller) return logger.warn(`${creep.name} failed to find controller with ${controller}`);

      const tryTransfer = creep.transfer(controller, RESOURCE_ENERGY);
      if (tryTransfer === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#f0a' } });
      } else if (tryTransfer !== OK && tryTransfer !== ERR_FULL && !creep.spawning) {
        logger.warn(`${creep.name} transferring failed with ${tryTransfer}`);
      }
    }
  },
};
