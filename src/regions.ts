export interface RegionConfig {
  name: string;
  id: string;
  backendUrl: string;
  vmManagerUrl: string;
  foxglovePort: number;
  ros2Port: number;
  description: string;
  icon: string;
  devOnly?: boolean;
}

export const DEFAULT_REGION = "eu";

export const REGIONS: Record<string, RegionConfig> = {
  eu: {
    id: "eu",
    name: "EU Central",
    backendUrl: "https://app.tensorfleet.net",
    vmManagerUrl: "https://eu.vm.tensorfleet.net",
    foxglovePort: 8765,
    ros2Port: 9091,
    description: "Europe - Central",
    icon: "🇪🇺",
  },
  asia: {
    id: "asia",
    name: "Asia",
    backendUrl: "https://app.tensorfleet.net",
    vmManagerUrl: "http://vm-manager-asia-1.tail4f6a7.ts.net",
    foxglovePort: 8765,
    ros2Port: 9091,
    description: "Asia - Southeast (beta/staging)",
    icon: "🇹🇭",
    devOnly: true,
  },
  local: {
    id: "local",
    name: "Local Development",
    backendUrl: "https://app.tensorfleet.net",
    vmManagerUrl: "http://localhost:8080",
    foxglovePort: 8765,
    ros2Port: 9091,
    description: "Local development server",
    icon: "💻",
    devOnly: true,
  },
};

export function getAvailableRegions(includeDevOnly = false): Record<string, RegionConfig> {
  if (includeDevOnly) {
    return REGIONS;
  }
  return Object.fromEntries(Object.entries(REGIONS).filter(([, config]) => !config.devOnly));
}

export function getRegionById(regionId: string | undefined, includeDevOnly = false): RegionConfig {
  const availableRegions = getAvailableRegions(includeDevOnly);
  if (regionId && availableRegions[regionId]) {
    return availableRegions[regionId];
  }
  return availableRegions[DEFAULT_REGION] ?? REGIONS[DEFAULT_REGION];
}

export function getFoxgloveUrl(ipAddress: string, region: RegionConfig): string {
  return `ws://${ipAddress}:${region.foxglovePort}`;
}

export function getRos2WebsocketUrl(ipAddress: string, region: RegionConfig): string {
  return `ws://${ipAddress}:${region.ros2Port}`;
}
