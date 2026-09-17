import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveJson<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadJson<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (raw === null) {
    return null;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    // Contenu corrompu : on le traite comme absent plutôt que de faire planter l'app.
    return null;
  }
}

export async function removeJson(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}
