import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value, storageKey) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    // saving error
  }
};
export const getData = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const checkData = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    if (jsonValue != null) {
      // console.log(JSON.parse(jsonValue))
      console.log("Checking data2");

      const value = JSON.parse(jsonValue);
      console.log(value);
    } else {
      console.log("empty value");
    }
  } catch (e) {
    console.log("errorr man", e);
  }
};
