import AsyncStorage from "@react-native-async-storage/async-storage";

export const retrieveFromStorage = async <T>(
  key: string
): Promise<T | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch (error) {
    console.error("Error retrieving from storage", error);
    return null;
  }
};

export const storeInStorage = async <T>(
  key: string,
  value: T
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error storing in storage", error);
  }
};

export const deleteFromStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error deleting from storage", error);
  }
};
