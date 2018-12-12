<template>
  <el-card v-loading="!user"
           class="box-card header-container">
    <el-row v-if="user"
            class="user-container">
      <span class="user-msg">Hello {{ user.given_name }}!</span>
      <el-button id="logout-button"
                 round @click="logout">Logout
      </el-button>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content"/>
      </el-col>
      <el-col :span="8">
        <center>
          <span class="title">{{ title }}</span>
        </center>
      </el-col>
      <el-col :span="8">
        <div class="grid-content"/>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "Header",
  props: ["user"],
  data() {
    return {
      title: "Dashboard"
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      // Navigate back to home
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped>
#logout-button {
  float: right;
}

.user-container {
  padding-top: 2px;
  padding-left: 2px;
}

.user-msg {
  font-size: 16px;
}

.header-container {
  background-color: #ebeef5;
  border-radius: 12px;
}

.title {
  margin: 5px 5px 5px 5px;
  font-size: 40px;
  color: black;
  font-weight: normal;
}
</style>
