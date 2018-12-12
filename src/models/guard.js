import { Mission } from "./mission";
import { doWork } from "./utils";
import { MissionState } from "./mission-state";

class Guard extends Mission {
  execute() {
    console.log("Start guard");
    return doWork()
      .then(() => {
        console.log("Guard ended successfully");
        this.state = MissionState.FINISHED;
      })
      .catch(e => {
        console.log("Guard canceled");
        this.state = MissionState.CANCELED;
      })
      .finally(() => {
        this.onCompleted();
      });
  }

  static getType() {
    return "Guard";
  }
}

export { Guard };
