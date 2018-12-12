<template>
  <el-row>
    <el-col :span="5">
      <div class="grid-content"/>
    </el-col>
    <el-col :span="14">
      <el-row class="container">
        <RobotImage :image-url="imageUrl"/>
      </el-row>
      <el-row class="container">
        <Stats :robot="robot"/>
      </el-row>
      <el-row class="container">
        <Mission :robot="robot"/>
      </el-row>
    </el-col>
    <el-col :span="5">
      <div class="grid-content"/>
    </el-col>
  </el-row>
</template>

<script>
import RobotImage from "./Image";
import Stats from "./Stats";
import Mission from "./Mission";
import { Robot } from "../models/robot";
import { fetchImage } from "../services/image";
import { fetchStats, statsListeners } from "../services/stats";

export default {
  name: "Dashboard",
  components: { Mission, Stats, RobotImage },
  data() {
    return {
      imageUrl: "",
      robot: null
    };
  },
  created() {
    this.fetchImage();
    this.createRobot();
  },
  methods: {
    async createRobot() {
      const stats = await fetchStats();
      this.robot = new Robot(1, stats);
      statsListeners(this.robot);
    },
    async fetchImage() {
      this.imageUrl = await fetchImage();
    }
  }
};
</script>
