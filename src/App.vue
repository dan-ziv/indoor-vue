<template>
  <div id="app">
    <el-container>
      <el-header height="150px">
        <Header :user="user"/>
      </el-header>
      <router-view/>
    </el-container>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: { Header },
  data: function() {
    return {
      authenticated: false,
      user: null
    };
  },
  watch: {
    // Everytime the route changes, check for auth status
    $route: "isAuthenticated"
  },
  created() {
    this.isAuthenticated();
  },
  methods: {
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated();
      if (!this.authenticated) {
        this.login();
      } else {
        this.user = await this.$auth.getUser();
        this.$router.push({ path: "/dashboard" });
      }
    },
    login() {
      this.$auth.loginRedirect("/");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.container {
  padding: 5px 5px 5px 5px;
}
</style>
