import logger from './utils/logger';

export default {
  run: (creep: Creep) => {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) creep.memory.building = false;
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) creep.memory.building = true;

    if (creep.memory.building) {
      // building or upgrading
      let target: ConstructionSite | AnyStructure | null;
      target =
        creep.pos.findClosestByPath(creep.room.find(FIND_CONSTRUCTION_SITES)) ??
        creep.pos.findClosestByPath(
          creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
              return (
                (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
              );
            },
          })
        );
      if (!target) return logger.warn(`${creep.name} failed to find target with ${target}`);

      const tryAction =
        target instanceof ConstructionSite ? creep.build(target) : creep.transfer(target, RESOURCE_ENERGY);
      if (tryAction === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#9ba' } });
      } else if (tryAction !== OK && tryAction !== ERR_FULL) {
        logger.warn(`${creep.name} building failed with ${tryAction}`);
      }
    } else {
      // harvesting
      const source = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
      if (!source) return logger.warn(`${creep.name} failed to find source with ${source}`);

      const tryHarvest = creep.harvest(source);
      if (tryHarvest === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#9ba' } });
      } else if (tryHarvest !== OK && !creep.spawning) {
        logger.warn(`${creep.name} harvesting failed with ${tryHarvest}`);
      }
    }
  },
};
