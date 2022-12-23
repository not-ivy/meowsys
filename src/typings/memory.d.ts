declare global {
  interface Memory {
    // Global memory
  }

  interface CreepMemory {
    // Creep memory
    building: boolean;
    harvesting: boolean;
  }
}

export {};
