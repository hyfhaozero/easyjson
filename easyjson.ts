// easyjson.ts

type Callback = (error: Error | null, data?: any) => void;

class EasyJson {
  private data: any;
  private callback?: Callback;

  constructor(initialData: any = {}, callback?: Callback) {
    this.data = initialData;
    this.callback = callback;
  }

  // Initialize new instance with optional callback
  static new(initialData: any = {}, callback?: Callback): EasyJson {
    return new EasyJson(initialData, callback);
  }

  // Search for a path in JSON and return data
  search(path: string, callback?: Callback): any {
    const keys = path.split('.');
    let result = this.data;

    try {
      for (let key of keys) {
        result = result[key];
        if (result === undefined) {
          throw new Error('Path not found');
        }
      }

      if (callback) callback(null, result);
      return result;
    } catch (error) {
      if (callback) callback(error);
      return undefined;
    }
  }

  // Delete a node at the specified path
  del(path: string, callback?: Callback): boolean {
    const keys = path.split('.');
    let result = this.data;
    let parent: any = this.data;
    const lastKey = keys.pop();

    try {
      for (let key of keys) {
        parent = result[key];
        if (parent === undefined) throw new Error('Path not found');
        result = parent;
      }

      if (lastKey && result[lastKey] !== undefined) {
        delete result[lastKey];
        if (callback) callback(null, true);
        return true;
      } else {
        throw new Error('Path not found');
      }
    } catch (error) {
      if (callback) callback(error);
      return false;
    }
  }

  // Add a new node at the specified path with optional data
  add(path: string, value: any = null, callback?: Callback): boolean {
    const keys = path.split('.');
    let result = this.data;

    try {
      for (let i = 0; i < keys.length - 1; i++) {
        result = result[keys[i]] = result[keys[i]] || {};
      }

      const lastKey = keys[keys.length - 1];
      result[lastKey] = value;

      if (callback) callback(null, true);
      return true;
    } catch (error) {
      if (callback) callback(error);
      return false;
    }
  }

  // Edit a node at the specified path
  edit(path: string, value: any, callback?: Callback): boolean {
    const keys = path.split('.');
    let result = this.data;

    try {
      for (let i = 0; i < keys.length - 1; i++) {
        result = result[keys[i]] = result[keys[i]] || {};
      }

      const lastKey = keys[keys.length - 1];
      if (result[lastKey] === undefined) {
        throw new Error('Path not found');
      }
      result[lastKey] = value;

      if (callback) callback(null, true);
      return true;
    } catch (error) {
      if (callback) callback(error);
      return false;
    }
  }

  // Check if the node exists at the specified path
  exists(path: string): boolean {
    const keys = path.split('.');
    let result = this.data;

    try {
      for (let key of keys) {
        result = result[key];
        if (result === undefined) {
          return false;
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Export all methods for external use
export const ej = EasyJson;
