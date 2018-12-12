<template>
  <div v-loading="!robot" v-if="robot">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"><span>Mission Management</span></div>
      <el-row class="container">
        <span v-for="mission in missions">
          <el-button
            :type="missionUIConfig[mission.getType()].type"
            @click="robot.execute(new mission())"> {{ mission.getType() }} </el-button
          >&nbsp;
        </span>
      </el-row>
      <el-row v-if="currentMission"
              class="container">
        <span>Current mission: </span>
        <el-tag :type="missionUIConfig[currentMission.getType()].type"><i class="el-icon-loading"/> {{
          currentMission.getType() }}
        </el-tag>
      </el-row>
      <el-row v-if="queuedMissions.length > 0" class="container">
        <span>Missions queue: </span>
        <span v-for="queuedMission in queuedMissions">
          <el-tag :type="missionUIConfig[queuedMission.getType()].type">{{ queuedMission.getType() }}</el-tag
          >&nbsp;
        </span>
      </el-row>
      <el-row v-if="missionHistory.length > 0" class="container">
        <span>Missions executed: </span>
        <span v-for="mission in missionHistory">
          <el-tag :type="missionUIConfig[mission.getType()].type">{{ mission.getType() }}</el-tag
          >&nbsp;
        </span>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { Patrol } from "../models/patrol";
import { QuickScan } from "../models/quick-scan";
import { Guard } from "../models/guard";
import MissionUIConfig from "./Mission.json";

export default {
  name: "Mission",
  props: ["robot"],
  data() {
    return {
      missionUIConfig: MissionUIConfig,
      missions: [Patrol, QuickScan, Guard]
    };
  },
  computed: {
    currentMission: function() {
      return this.robot.getCurrentMission();
    },
    missionHistory: function() {
      return this.robot.getMissionHistory();
    },
    queuedMissions: function() {
      return this.robot.getMissionQueue().getItems();
    }
  }
};
</script>
