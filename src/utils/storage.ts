function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    console.log("parsing error on", { value });
    return undefined;
  }
}

export const getItem = <T>(key: string, initialValue?: T) => {
  const item = sessionStorage.getItem(key);
  return item ? (parseJSON(item) as T) : initialValue;
};

export const setItem = <T>(key: string, value: T) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key: string) => {
  sessionStorage.removeItem(key);
};
