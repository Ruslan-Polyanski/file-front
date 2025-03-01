class LocalStorage {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  get(): string | null {
    let result: string | null;
    try {
      const value = localStorage.getItem(this.key) ?? '';
      result = JSON.parse(value);
    } catch (err) {
      result = null;
    }
    return result;
  }

  set<T>(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  delete() {
    localStorage.removeItem(this.key);
  }

  static clear() {
    localStorage.clear();
  }
}

export const access_token = new LocalStorage('access_token')
export const refresh_token = new LocalStorage('refresh_token')
export { LocalStorage }

