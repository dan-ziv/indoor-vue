class Location {
  constructor(coords) {
    this.setCoords(coords);
  }

  setCoords(coords) {
    this.coords = coords;
  }

  getCoords() {
    return this.coords;
  }
}

export { Location };
