<template>
  <div class="sidebar" :class="{active: active}">
    <div class="sidebar_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-sidebar",
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.7s ease;
  .sidebar_content {
    width: 450px;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #f8f9fa;
    border: 1px solid rgba(221, 221, 221, 0.7);
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: -450px;
    transition: all 0.5s ease;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  &.active {
    .sidebar_content {
      left: 0;
    }
    background-color: rgba(0,0,0,0.4);
    opacity: 1;
    visibility: visible;
  }
}
</style>