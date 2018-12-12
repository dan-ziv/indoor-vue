import { Battery } from './battery';
import { Location } from './location';
import { Queue } from './queue';

const SAME_MISSION_DIFF_TIME = 10000; // 10 seconds
const BATTERY_MIN_PERCENTAGE = 20; // 20%

class Robot {
  constructor(id, conf) {
    this.id = id;
    this.battery = new Battery(conf.battery);
    this.location = new Location(conf.location);
    this.missionQueue = new Queue();
    this.missionHistory = [];
    this.currentMission = null;
    this.autoInsertToQueue = false;
  }

  getId() {
    return this.id;
  }

  setBattery(percentage) {
    // In case the battery was lower then 20% and updated with higher value
    // and we have waiting mission in the queue, try to run it
    if (this.getBattery() < 20 && percentage > 20 && !this.missionQueue.isEmpty()) {
      this.battery.setCapacity(percentage);
      this.execute(this.missionQueue.pop());
    } else {
      this.battery.setCapacity(percentage);
    }
  }

  getBattery() {
    return this.battery.getCapacity();
  }

  setLocation(location) {
    this.location.setCoords(location);
  }

  getLocation() {
    return this.location.getCoords();
  }

  getCurrentMission() {
    return this.currentMission;
  }

  getMissionQueue() {
    return this.missionQueue;
  }

  getMissionHistory() {
    return this.missionHistory;
  }

  execute(mission) {
    if (this.currentMission || this.getBattery() < BATTERY_MIN_PERCENTAGE || this.autoInsertToQueue) {
      // Add mission to queue since it cannot be performed at the moment
      this.missionQueue.push(mission);
    } else if (this.isMinTimePassedSincePreviousSameMission(mission)) {
      this.currentMission = mission;
      this.currentMission.execute().then(() => {
        // When mission completed, add it to the history and run the next
        // mission if such exists in the queue
        this.missionHistory.unshift(this.currentMission);
        this.currentMission = null;
        if (!this.missionQueue.isEmpty()) {
          const nextMission = this.missionQueue.pop();
          this.execute(nextMission);
        }
      });
    }
  }

  isMinTimePassedSincePreviousSameMission(mission) {
    const prevSameMission = this.getPreviousSameMission(mission);
    const isValid = !prevSameMission || (prevSameMission && Date.now() - prevSameMission.getEndTime() > SAME_MISSION_DIFF_TIME);
    if (!isValid) {
      this.autoInsertToQueue = true;
      this.missionQueue.push(mission);
      const intervalId = setInterval(() => {
        if (Date.now() - prevSameMission.getEndTime() > SAME_MISSION_DIFF_TIME) {
          clearInterval(intervalId);
          this.autoInsertToQueue = false;
          this.execute(this.missionQueue.pop());
        }
      }, 1000);
      return false;
    }
    return true;
  }

  getPreviousSameMission(mission) {
    return this.missionHistory.find(m => m.constructor === mission.constructor);
  }
}

export { Robot };
