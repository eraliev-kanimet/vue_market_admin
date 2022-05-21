<template>
<div class="alert" :class="{visible: active}">
  <ul class="alert-ul">
    <li v-for="error in errors">{{ error }}</li>
  </ul>
</div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "errors-alert",
  computed: {
    ...mapState({
      errors: state => state.errors.errors,
      active: state => state.errors.active
    })
  }
}
</script>

<style scoped lang="scss">
.alert {
  min-width: 370px;
  position: fixed;
  top: 25px;
  left: 50%;
  transform: translate(-50%, 0);
  color: #721c24;
  background-color: #f8d7da;
  border: 2px solid #f5c6cb;
  border-radius: 5px;
  z-index: 9999;
  display: flex;
  text-align: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  transition: top 0.5s ease;
  .alert-ul {
    li {
      margin-bottom: 5px;
    }
  }
  &.visible {
    opacity: 1;
    top: 40px;
  }
}
</style>