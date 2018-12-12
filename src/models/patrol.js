import { Mission } from "./mission";
import { doWork } from "./utils";
import { MissionState } from "./mission-state";

class Patrol extends Mission {
  execute() {
    console.log("Start patrol");
    return doWork()
      .then(() => {
        console.log("Patrol ended successfully");
        this.state = MissionState.FINISHED;
      })
      .catch(e => {
        console.log("Patrol canceled");
        this.state = MissionState.CANCELED;
      })
      .finally(() => {
        this.onCompleted();
      });
  }

  static getType() {
    return "Patrol";
  }
}

export { Patrol };
