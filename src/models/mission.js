import { MissionState } from "./mission-state";

class Mission {
  constructor() {
    this.id = Math.random()
      .toString(36)
      .substr(2, 16);
    this.state = MissionState.IDLE;
    this.endTime = null;
  }

  getId() {
    return this.id;
  }

  getState() {
    return this.state;
  }

  getEndTime() {
    return this.endTime;
  }

  getType() {
    return this.constructor.getType();
  }

  onCompleted() {
    this.endTime = new Date();
  }

  static getType() {
    throw new Error("Mission not implemented method: static getType()");
  }

  execute() {
    throw new Error("Mission not implemented method: execute()");
  }
}

export { Mission };
