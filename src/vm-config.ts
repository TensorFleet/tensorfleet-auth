export interface VMConfig {
  id: string;
  name: string;
  description: string;
  sim_config: {
    config_version: string;
    world_components?: string;
    [key: string]: unknown;
  };
}

export const VM_CONFIGS: Record<string, VMConfig> = {
  px4: {
    id: "px4",
    name: "PX4 Autopilot",
    description: "PX4 flight stack with Gazebo simulation",
    sim_config: {
      config_version: "0.0.1",
      world_components: "static_obstacles_01;static_ground",
      gazebo_px4_enabled: "true",
    },
  },
  ardupilot: {
    id: "ardupilot",
    name: "ArduPilot",
    description: "ArduPilot flight stack with Gazebo simulation",
    sim_config: {
      config_version: "0.0.1",
      world_components: "static_obstacles_01;static_ground",
      gazebo_ardupilot_enabled: "true",
    },
  },
  simple_robot: {
    id: "simple_robot",
    name: "Simple Robot",
    description: "Basic ground robot with Gazebo simulation",
    sim_config: {
      config_version: "0.0.1",
      world_components: "static_obstacles_01;static_ground",
      simple_robot_enabled: "true",
    },
  },
  lerobot: {
    id: "lerobot",
    name: "Lerobot arm",
    description: "Basic robotics arm simulation",
    sim_config: {
      config_version: "0.0.1",
      world_components: "lerobot/lerobot_world_01;static_ground",
      gazebo_lerobot_enabled: "true",
    },
  },
};

export const DEFAULT_CONFIG_ID = "simple_robot";

export const TEMPLATE_TO_CONFIG_ID: Record<string, string> = {
  "drone-js": "px4",
  "robotic-js": "simple_robot",
  robotic: "simple_robot",
  "lerobot-arm": "lerobot",
};

export function isValidVmConfigId(configId?: string): configId is string {
  return Boolean(configId && VM_CONFIGS[configId]);
}

export function getVmConfig(configId?: string): VMConfig {
  const selected = configId && VM_CONFIGS[configId] ? VM_CONFIGS[configId] : VM_CONFIGS[DEFAULT_CONFIG_ID];
  if (selected) {
    return selected;
  }
  const firstConfig = Object.values(VM_CONFIGS)[0];
  if (!firstConfig) {
    throw new Error("No VM configurations available");
  }
  return firstConfig;
}

export function getVmConfigIdForTemplate(template?: string): string | undefined {
  return template ? TEMPLATE_TO_CONFIG_ID[template] : undefined;
}
