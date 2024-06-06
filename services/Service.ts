// T is the type of data the service will give to subscribers
export abstract class Service<T> {
  protected callbacks: Map<string | number, Function>;

  constructor() {
    this.callbacks = new Map();
  }

  subscribe(id: string | number, callback: Function) {
    this.callbacks.set(id, callback);
  }

  unsubscribe(id: string | number) {
    this.callbacks.delete(id);
  }

  notify(data: T): void {
    this.callbacks.forEach((callback) => {
      callback(data);
    });
  }
}
