export function getStorageValue(key: string, defaultValue = "") {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    return saved || defaultValue;
  }
}

export function deleteStorageValue(key: string) {
  // getting stored value
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}
