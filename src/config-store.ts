const configStore = new Map<string, unknown>();

export function setConfig<T = unknown>(key: string, value: T): void {
  configStore.set(key, value);
}

export function getConfig<T = unknown>(key: string): T | undefined {
  // First check the config store
  if (configStore.has(key)) {
    return configStore.get(key) as T | undefined;
  }
  // Fall back to runtime globals (set by extension or CLI host)
  if (key in globalThis) {
    return (globalThis as any)[key] as T | undefined;
  }
  return undefined;
}

export function clearConfig(): void {
  configStore.clear();
}
