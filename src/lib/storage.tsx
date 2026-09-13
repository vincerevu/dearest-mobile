import { createMMKV } from 'react-native-mmkv';

// MMKV uses native persistent storage on Android/iOS and localStorage on web.
// It deliberately stores only local product state; secrets and auth tokens need
// a dedicated secure-store policy when they are introduced.
const mmkv = createMMKV({ id: 'dearest-local-state' });

export const storage = {
  getString: (key: string) => mmkv.getString(key),
  remove: (key: string) => mmkv.remove(key),
  set: (key: string, value: string) => mmkv.set(key, value),
};

export function getItem<T>(key: string): T | null {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.remove(key);
}
