<template>
  <base-navbar v-if="token"/>
  <div class="app" v-if="token">
    <router-view/>
  </div>
  <login-page v-if="!token"/>
  <errors-alert/>
</template>

<script>
import {isAdmin} from "@/utils/resourse";
import LoginPage from "@/pages/LoginPage";

export default {
  data() {
    return {
      token: isAdmin()
    }
  },
  components: {
    LoginPage
  }
}
</script>

<style lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}
body {
  background-color: #f8f9fa;
  overflow-x: hidden;
}
ul,li {
  list-style: none;
}
img {
  width: 100%;
  height: 100%;
  display: block;
}
a,a:hover {
  text-decoration: none;
}
.app {
  padding: 35px 15px 0 15px;
}
</style>