const LStorage = {
  getItem: (key: string) => {
    let result: unknown;
    try {
      const value = localStorage.getItem(key) ?? '';
      result = JSON.parse(value);
    } catch (err) {
      console.log(err);
      result = '';
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

export { LStorage };
