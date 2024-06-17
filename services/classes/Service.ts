// T is the type of data the service will give to subscribers
export default abstract class Service {
  protected callbacks: Set<Function>;

  constructor() {
    this.callbacks = new Set();
  }

  subscribe(callback: () => void): () => void {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  notify(): void {
    this.callbacks.forEach(notify => notify());
  }
}
