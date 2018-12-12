<template>
  <div v-loading="!imageUrl">
    <el-card class="box-card">
      <div slot="header" class="clearfix"><span>Image</span></div>
      <el-row><img class="image" :src="imageUrl"/></el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RobotImage",
  props: ["imageUrl"]
};
</script>

<style scoped>
.image {
  max-width: 500px;
  max-height: 500px;
}
</style>
