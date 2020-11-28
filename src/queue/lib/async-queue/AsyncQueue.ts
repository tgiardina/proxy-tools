export default class AsyncQueue {
  private isEmptying: boolean;
  private queue: (() => unknown)[];

  constructor() {
    this.isEmptying = false;
    this.queue = [];
  }

  public enqueue(...items: (() => unknown)[]): void {
    this.queue.push(...items);
    if (!this.isEmptying) {
      this.isEmptying = true;
      this.emptyQueue();
    }
  }

  private async emptyQueue(): Promise<void> {
    while (this.queue.length) {
      const next = <() => unknown>this.queue.shift();
      await next();
    }
    this.isEmptying = false;
  }
}
