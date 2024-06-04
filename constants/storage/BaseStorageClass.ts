import AsyncStorage from "@react-native-async-storage/async-storage";

export interface baseStorageItem {
  id: string;
};

type Callback<T> = (data: Map<string, T>) => void;

export abstract class BaseStorageClass<T extends baseStorageItem> {
  private key: string;
  private cache: Map<string, T>;
  callbacks: Map<string, (data: Map<string, T>) => void>; 

  constructor(key: string) {
    this.key = key;
    this.cache = new Map();
    this.callbacks = new Map();
  }

  get size(): number {
    return this.cache.size;
  }

  get data(): Map<string, T> {
    return this.cache;
  }

  get dataAsArray(): T[] {
    return Array.from(this.cache.values());
  }

  // add a 'setState' method to the list of callbacks
  // not responsible for non-unique keys
  subscribe(id: string, callback: Callback<T>) {
    this.callbacks.set(id, callback);
  }

  unsubscribe(id: string) {
    this.callbacks.delete(id);
  }

  // call all the callbacks with the current data
  sendDataToSubscribers(): void {
    this.callbacks.forEach((callback) => {
      callback(this.cache);
    });
  }

  // get updated data from device storage
  // make sure you call this on startup
  async syncCache(): Promise<void> {
    const data = await AsyncStorage.getItem("exercises");

    const parsedData = JSON.parse(data || "{}");
    if (!parsedData.size || parsedData.size === 0) {
      return;
    }

    this.cache = new Map(parsedData);
  }

  // update device storage with new data
  private async syncStorage(): Promise<void> {
    await AsyncStorage.setItem(this.key, JSON.stringify(this.cache));
    
    // call all the callbacks with the new data
    this.sendDataToSubscribers();
  }

  protected getData(id: string): T | undefined {
    return this.cache.get(id);
  }

  // TODO: add a check if data already exists
  protected async addData(data: T | T[]): Promise<void> {
    if (Array.isArray(data)) {
      data.forEach((item) => {
        this.cache.set(item.id, item);
      });
    } else {
      this.cache.set(data.id, data);
    }

    // ensure that device storage is updated
    this.syncStorage();
  }

  async deleteData(id: string): Promise<void> {
    this.cache.delete(id);
    this.syncStorage();
  }

  // WARNING: remove this when finished testing
  async clearData(): Promise<void> {
    this.cache.clear();
    await AsyncStorage.removeItem(this.key);
  }
}
