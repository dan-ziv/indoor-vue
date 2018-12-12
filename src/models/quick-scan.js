import { Mission } from "./mission";
import { doWork } from "./utils";
import { MissionState } from "./mission-state";

class QuickScan extends Mission {
  execute() {
    console.log("Start quick scan");
    return doWork()
      .then(() => {
        console.log("Quick Scan ended successfully");
        this.state = MissionState.FINISHED;
      })
      .catch(e => {
        console.log("Quick Scan canceled");
        this.state = MissionState.CANCELED;
      })
      .finally(() => {
        this.onCompleted();
      });
  }

  static getType() {
    return "Quick Scan";
  }
}

export { QuickScan };
