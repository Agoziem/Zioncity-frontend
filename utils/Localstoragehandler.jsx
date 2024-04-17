export function getDataOrDefault(key, defaultValue) {
  try {
    const storedData = localStorage.getItem(key);
    if (storedData !== null) {
      return JSON.parse(storedData);
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return JSON.parse(JSON.stringify(defaultValue)); // Return a deep copy of the defaultValue
    }
    
  } catch (error) {
    return defaultValue;
  }
}

// function to only store data
export function storeData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    // Handle error if needed
  }
}
