import config from './config';
import logger from './utils/logger';

const isIdle = (creep: Creep) => {
  const creepCarryCapacity = creep.store.getFreeCapacity();
  const spawnEnergyCapacity = Game.spawns[config.spawn].store[RESOURCE_ENERGY];
  return creepCarryCapacity === 0 && spawnEnergyCapacity === 300;
};

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

  if (isIdle(creep)) {
    if (creep.transfer(controller, RESOURCE_ENERGY, 50) === ERR_NOT_IN_RANGE) {
      creep.moveTo(controller);
    }
  } else if (creep.transfer(spawn, RESOURCE_ENERGY, 50) === ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn);
  }
};

export default {
  run: (creep: Creep) => {
    if (creep.store.getFreeCapacity() > 0) {
      harvest(creep);
    }
    transfer(creep);
  },
};
