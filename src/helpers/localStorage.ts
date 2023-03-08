export const storage = {
  get: (key: string) => {
    const res = localStorage.getItem(key);
    if (res) {
      return JSON.parse(res);
    }
  },
  set: (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};
