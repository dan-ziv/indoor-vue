<template>
  <div v-loading="!robot" v-if="robot">
    <el-card class="box-card">
      <div
        slot="header" class="clearfix"><span>Stats</span></div>
      <el-row>
        <div>
          Remaining battery: <span
          :class="{'valid-battery': battery >= 20, 'low-battery': battery < 20}"> {{ battery }}% </span>
        </div>
        <div>
          Location coordinates: <span class="stats-value"> [{{ location.lat }}, {{ location.lang }}] </span>
        </div>
        <div>
          Last executed mission:
          <span class="stats-value"> {{ lastMission ? lastMission.getType() + ' (ended at: ' + getFormattedTime(lastMission.getEndTime()) + ')' : '-' }} </span>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Stats",
  props: ["robot"],
  data() {
    return {};
  },
  computed: {
    lastMission: function() {
      const missionHistory = this.robot.getMissionHistory();
      return missionHistory && missionHistory[0];
    },
    battery: function() {
      return this.robot.getBattery();
    },
    location: function() {
      return this.robot.getLocation();
    }
  },
  methods: {
    getFormattedTime: function(date) {
      return date.toTimeString().split(" ")[0];
    }
  }
};
</script>

<style>
.valid-battery {
  color: #00d230;
}

.low-battery {
  color: red;
}

.stats-value {
  color: darkgray;
}
</style>
