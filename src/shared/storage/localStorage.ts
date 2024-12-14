const LocalStorage = {
  getItem: (key: string): string | null => {
    let result: string | null;
    try {
      const value = localStorage.getItem(key) ?? '';
      result = JSON.parse(value);
    } catch (err) {
      console.log(err);
      result = null;
    }
    return result;
  },

  setItem: <T>(key: string, value: T) => {
    const data: string = JSON.stringify(value);
    localStorage.setItem(key, data);
  },

  deleteItem: (key: string) => {
    localStorage.removeItem(key);
  },

  deleteAll: () => {
    localStorage.clear();
  },
};

export { LocalStorage };
