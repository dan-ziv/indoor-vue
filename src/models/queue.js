class Queue {
  constructor() {
    this._queue = [];
  }

  pop() {
    return this._queue.shift();
  }

  push(item) {
    this._queue.push(item);
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this._queue.length;
  }

  getItems() {
    return Array.from(this._queue);
  }

  empty() {
    this._queue = [];
  }
}

export { Queue };
