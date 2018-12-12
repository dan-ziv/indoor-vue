class Battery {
  constructor(capacity) {
    this.setCapacity(capacity);
  }

  setCapacity(capacity) {
    this.capacity = capacity;
  }

  getCapacity() {
    return this.capacity;
  }
}

export { Battery };
